import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, ArrowLeft, CheckCircle2, Loader2, AtSign, ChevronDown, X, Plus } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { generateDynamicPrompt } from '@/lib/aiService';
const logoUrl = "https://res.cloudinary.com/dxbgfje1t/image/upload/f_auto,q_auto/logo_-_moreira_1_denxi8";

import { EMAIL_DOMAINS, QUESTIONS_PER_STEP, formSteps } from '@/constants';

export default function PublicForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const currentStepRef = useRef(currentStep); // To avoid dependency cycle
  const [targetAudience, setTargetAudience] = useState<string | null>(null); // NEW STATE
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [isFinished, setIsFinished] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [leadId, setLeadId] = useState<string | null>(null);
  const [pedidoId, setPedidoId] = useState<string | null>(null);
  const [emailSuggestions, setEmailSuggestions] = useState<string[]>([]);
  const [showEmailSuggestions, setShowEmailSuggestions] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const emailInputRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    currentStepRef.current = currentStep;
  }, [currentStep]);

  // Sync currentStep with URL hash to support native Browser Back Navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      const match = hash.match(/#step-(\d+)/);
      if (match) {
        const step = parseInt(match[1], 10);
        if (!isNaN(step) && step >= 0) {
          if (step !== currentStepRef.current) {
            setCurrentStep(step);
          }
        }
      } else {
        if (currentStepRef.current !== 0) {
          setCurrentStep(0);
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    
    // Initial sync
    const hash = window.location.hash;
    if (!hash && currentStepRef.current === 0) {
      window.history.replaceState(null, '', '#step-0');
    } else if (hash) {
      handleHashChange();
    }

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []); // Dependence on currentStep is avoided by using ref

  useEffect(() => {
    if (window.location.hash !== `#step-${currentStep}`) {
      window.history.pushState(null, '', `#step-${currentStep}`);
    }
  }, [currentStep]); // This dependency is fine now because it's only updating the URL based on state, not reading URL and updating state in the same flow.

  useEffect(() => {
    // Scroll to top whenever currentStep changes
    const scrollToTop = () => {
      window.scrollTo(0, 0);
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      if (mainRef.current) {
        mainRef.current.scrollTop = 0;
      }
    };

    // Execute immediately and also after short delays to ensure DOM updates
    scrollToTop();
    const t1 = setTimeout(scrollToTop, 50);
    const t2 = setTimeout(scrollToTop, 150);
    const t3 = setTimeout(scrollToTop, 300);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [currentStep]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (emailInputRef.current && !emailInputRef.current.contains(event.target as Node)) {
        setShowEmailSuggestions(false);
      }
      // Close dropdown when clicking outside
      if (activeDropdown && !(event.target as HTMLElement).closest('.dropdown-container')) {
        setActiveDropdown(null);
      }
    };

    if (activeDropdown || showEmailSuggestions) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [activeDropdown, showEmailSuggestions]);

  const formatName = (value: string) => {
    return value
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  const formatSentence = (value: string) => {
    if (!value) return '';
    return value.charAt(0).toUpperCase() + value.slice(1);
  };

  const formatWhatsApp = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
  };

  const handleEmailChange = (value: string) => {
    const cleanValue = value.replace(/\s/g, '');
    setFormData(prev => ({ ...prev, email: cleanValue }));

    if (cleanValue.includes('@')) {
      const [local, domain] = cleanValue.split('@');
      let show = false;
      if (local && !domain) {
        setEmailSuggestions(EMAIL_DOMAINS);
        show = true;
      } else if (local && domain) {
        const filtered = EMAIL_DOMAINS.filter(d => d.startsWith(domain));
        setEmailSuggestions(filtered);
        show = filtered.length > 0;
      } else {
        show = false;
      }
      
      setShowEmailSuggestions(show);
      
      // Force keyboard to close on mobile when suggestions appear
      if (show) {
        setTimeout(() => {
          const activeElement = document.activeElement as HTMLElement;
          if (activeElement) activeElement.blur();
        }, 10);
      }
    } else {
      setShowEmailSuggestions(false);
    }
  };

  const selectEmailSuggestion = (domain: string) => {
    setFormData(prev => {
      const currentEmail = prev.email || '';
      const localPart = currentEmail.split('@')[0];
      return { ...prev, email: `${localPart}@${domain}` };
    });
    setShowEmailSuggestions(false);
  };

  const handleNext = async () => {
    if (currentStep === 0) {
      // Save Lead immediately after personal info step
      setIsSubmitting(true);
      try {
        const { data: leadData, error: leadError } = await supabase
          .from('leads')
          .insert([
            {
              name: formData.name,
              email: formData.email,
              whatsapp: formData.whatsapp
            }
          ])
          .select()
          .single();

        if (leadError) throw leadError;
        if (!leadData) throw new Error('Falha ao criar lead no banco de dados.');
        setLeadId(leadData.id);

        // Create initial Pedido so it appears in CRM immediately
        const { data: pedidoData, error: pedidoError } = await supabase
          .from('pedidos')
          .insert([
            {
              lead_id: leadData.id,
              status: 'Aguardando Contato',
              generated_prompt: '',
              form_data: {
                name: formData.name,
                email: formData.email,
                whatsapp: formData.whatsapp
              }
            }
          ])
          .select()
          .single();

        if (pedidoError) throw pedidoError;
        if (!pedidoData) throw new Error('Falha ao criar pedido no banco de dados.');
        setPedidoId(pedidoData.id);

        setCurrentStep(1); // Proceed to Target Audience step
      } catch (error) {
        console.error('Error saving lead:', error);
        alert('Ocorreu um erro ao salvar seus dados. Por favor, tente novamente.');
      } finally {
        setIsSubmitting(false);
      }
    } else if (currentStep === 1) {
      if (!targetAudience) return; // Must select audience
      setCurrentStep(2); // Proceed to first questionnaire step
    } else {
      const totalPages = 5; // Reduced to 5 steps
      if (currentStep < totalPages + 1) {
        setCurrentStep(prev => prev + 1);
      } else {
        setIsSubmitting(true);
        
        try {
          // 2. Generate Dynamic Prompt using Gemini
          const prompt = await generateDynamicPrompt({ ...formData, targetAudience });

          // 3. Update existing Pedido using the previously saved pedidoId
          if (!pedidoId) throw new Error('ID do Pedido não encontrado. Por favor, recarregue a página.');

          const { error: pedidoError } = await supabase
            .from('pedidos')
            .update({
              form_data: { ...formData, targetAudience },
              generated_prompt: prompt
            })
            .eq('id', pedidoId);

          if (pedidoError) throw pedidoError;

          setIsFinished(true);
        } catch (error: any) {
          console.error('Error saving data:', error);
          const errorMessage = error.message || 'Erro desconhecido';
          alert(`Ocorreu um erro ao enviar suas respostas: ${errorMessage}. Por favor, verifique sua conexão ou tente novamente.`);
        } finally {
          setIsSubmitting(false);
        }
      }
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const totalPages = 5; // Reduced to 5 steps
  const getDynamicQuestions = (audience: string | null) => {
    let baseSteps = [...formSteps]; // Assuming base steps are 60

    // Modificando texto com base na audiencia ANTES de renumerar
    const q4Index = baseSteps.findIndex(s => s.id === 'q4');
    if (q4Index !== -1) {
        baseSteps[q4Index] = {
            ...baseSteps[q4Index],
            question: audience === 'Eu Mesmo' ? 'Você quer seu nome incluído?' : 'O nome da pessoa deve ser incluído?'
        };
    }

    // Logic to insert/modify questions
    const isGenderNeutral = ['Eu Mesmo', 'Namorada(o)', 'Filho(a)', 'Amigo(a)', 'Outro'].includes(audience || '');
    
    // Add gender if needed
    if (isGenderNeutral) {
        // Insert Gender question at step 1
        const genderQuestion = audience === 'Eu Mesmo' ? 'Você é?' : 'A pessoa é?';
        baseSteps.splice(1, 0, { id: 'gender', question: genderQuestion, type: 'choice', options: ['Homem', 'Mulher'] });
    }

    // Ensure name question is prominent. It's already q7 in original steps.
    
    // Re-numbering based on the current list
    const renumberedSteps = baseSteps.map((step, index) => {
        // Remove existing number prefix if present, then add new one
        const questionText = step.question.replace(/^\d+\.\s+/, '');
        return {
            ...step,
            question: `${index + 1}. ${questionText}`
        };
    });


    // Keep 25 total
    return renumberedSteps.slice(0, 25);
  };

  const currentQuestions = currentStep >= 2
    ? getDynamicQuestions(targetAudience).slice((currentStep - 2) * QUESTIONS_PER_STEP, (currentStep - 2) * QUESTIONS_PER_STEP + QUESTIONS_PER_STEP)
    : [];
  
  const totalStepsCount = totalPages + 2; // Data + Audience + 5 questionnaire
  const progress = (currentStep / (totalStepsCount - 1)) * 100;

  const isNameValid = (name: string) => {
    if (!name) return false;
    const parts = name.trim().split(/\s+/);
    return parts.length >= 2 && parts.every(p => p.length >= 2);
  };

  const isEmailValid = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isPageValid = () => {
    if (currentStep === 0) {
      const nameValid = isNameValid(formData.name || '');
      const emailValid = isEmailValid(formData.email || '');
      const whatsappValid = formData.whatsapp && formData.whatsapp.length >= 15;
      return nameValid && emailValid && whatsappValid;
    }
    return currentQuestions.every(q => {
      if (q.id === 'q4' && formData[q.id] === 'Sim') {
        const names = formData.q4_names || [];
        return names.length > 0 && names.some((name: string) => name.trim().length > 0);
      }
      if (q.id === 'q59' && formData[q.id] === 'Produtor cria') {
        return formData.q59_title && formData.q59_title.trim().length > 0;
      }
      if (q.id === 'q60' && formData[q.id] === 'Eu tenho') {
        return formData.q60_ref && formData.q60_ref.trim().length > 0;
      }
      return formData[q.id];
    });
  };

  const isNextDisabled = !isPageValid();

  const toggleDropdown = (questionId: string) => {
    setActiveDropdown(prev => prev === questionId ? null : questionId);
  };

  if (isFinished) {
    return (
      <div className="min-h-screen bg-brand-beige-100 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center"
        >
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="text-green-600 w-8 h-8" />
          </div>
          <h2 className="text-2xl font-sans font-bold text-brand-brown-900 mb-2">Tudo certo!</h2>
          <p className="text-brand-brown-600 mb-8">
            Recebemos suas informações. Nossa equipe vai analisar sua história e entrar em contato pelo WhatsApp muito em breve.
          </p>
          <Button variant="gold" className="w-full" onClick={() => {
            setFormData({});
            setCurrentStep(0);
            setIsFinished(false);
            setLeadId(null);
            setPedidoId(null);
          }}>
            Voltar para o Início
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-beige-100 flex flex-col overscroll-none selection:bg-brand-gold-100">
      {/* Header */}
      <header className="px-4 text-center shrink-0 flex justify-center -mt-12 md:-mt-20">
        <img 
          src={logoUrl} 
          alt="CantaJa Logo" 
          className="w-full max-w-[180px] md:max-w-[240px] h-auto object-contain invert"
          referrerPolicy="no-referrer"
        />
      </header>

      {/* Progress Bar */}
      <div className="w-full max-w-xl mx-auto px-4 -mt-8 mb-2 shrink-0">
        <div className="h-1.5 bg-brand-brown-100 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-brand-gold-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <div className="text-right text-[10px] text-brand-brown-400 mt-1 font-medium">
          {currentStep === 0 ? 'Informações Pessoais' : currentStep === 1 ? 'Quem é para?' : `Etapa ${currentStep - 1}/${totalPages}`}
        </div>
      </div>

      {/* Form Area */}
      <main ref={mainRef} className="flex-1 flex flex-col items-center px-4 pt-4 pb-32 overflow-y-auto">
        <div className="w-full max-w-xl relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              {currentStep === 0 ? (
                <div className="w-full space-y-6 text-left">
                  <h2 className="text-2xl md:text-3xl font-sans font-bold text-brand-brown-900 mb-8 leading-tight text-center">
                    Vamos começar com seus dados
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-brand-brown-700 mb-1">Qual o seu nome completo?</label>
                      <Input 
                        type="text"
                        name="full-name-field"
                        id="full-name-field"
                        placeholder="Ex: João da Silva"
                        className="h-14 text-lg bg-white border-brand-brown-200 shadow-sm focus-visible:ring-brand-gold-400"
                        value={formData.name || ''}
                        onChange={(e) => setFormData({ ...formData, name: formatName(e.target.value) })}
                        autoComplete="new-password"
                      />
                      {formData.name && !isNameValid(formData.name) && (
                        <p className="text-xs text-red-500 mt-1">Por favor, insira seu nome e sobrenome.</p>
                      )}
                    </div>
                    <div className="relative" ref={emailInputRef}>
                      <label className="block text-sm font-medium text-brand-brown-700 mb-1">Qual o seu melhor e-mail?</label>
                      <Input 
                        type="email"
                        name="email-field-unique"
                        id="email-field-unique"
                        placeholder="Ex: joao@email.com"
                        className="h-14 text-lg bg-white border-brand-brown-200 shadow-sm focus-visible:ring-brand-gold-400"
                        value={formData.email || ''}
                        onChange={(e) => handleEmailChange(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === ' ') {
                            e.preventDefault();
                          }
                        }}
                        autoComplete="new-password"
                      />
                      {formData.email && !isEmailValid(formData.email) && (
                        <p className="text-xs text-red-500 mt-1">Por favor, insira um e-mail válido.</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-brand-brown-700 mb-1">Qual o seu melhor WhatsApp?</label>
                      <Input 
                        type="tel"
                        name="phone-field-unique"
                        id="phone-field-unique"
                        inputMode="numeric"
                        placeholder="(11) 99999-9999"
                        className="h-14 text-lg bg-white border-brand-brown-200 shadow-sm focus-visible:ring-brand-gold-400"
                        value={formData.whatsapp || ''}
                        onChange={(e) => setFormData({ ...formData, whatsapp: formatWhatsApp(e.target.value) })}
                        maxLength={15}
                        autoComplete="new-password"
                      />
                      {formData.whatsapp && formData.whatsapp.length > 0 && formData.whatsapp.length < 15 && (
                        <p className="text-xs text-red-500 mt-1">Por favor, insira o número completo com DDD.</p>
                      )}
                    </div>
                  </div>
                </div>
              ) : currentStep === 1 ? (
                <div className="w-full space-y-6 text-center">
                  <h2 className="text-2xl md:text-3xl font-sans font-bold text-brand-brown-900 mb-8 leading-tight">
                    Para quem é a música?
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    {['Eu Mesmo', 'Namorada(o)', 'Filho(a)', 'Pai', 'Mae', 'Família', 'Amigo(a)', 'Outro'].map((option) => (
                      option === 'Outro' ? (
                        <div key={option} className="relative dropdown-container h-full">
                          <button
                            onClick={() => {
                              if (!targetAudience?.startsWith('Outro')) {
                                setTargetAudience('Outro');
                              }
                              setActiveDropdown(activeDropdown === 'outro-options' ? null : 'outro-options');
                            }}
                            className={`w-full h-full px-4 py-6 rounded-xl border flex justify-center items-center gap-2 transition-all ${
                              targetAudience?.startsWith('Outro')
                                ? 'border-brand-gold-500 bg-brand-gold-50 text-brand-brown-900 ring-1 ring-brand-gold-500'
                                : 'border-brand-brown-200 bg-white text-brand-brown-700 hover:border-brand-gold-300'
                            }`}
                          >
                            <span className="truncate">{targetAudience?.includes(' - ') ? targetAudience.split(' - ')[1] : 'Outro'}</span>
                            <ChevronDown size={18} className="text-brand-brown-400 flex-shrink-0" />
                          </button>
                          
                          {activeDropdown === 'outro-options' && (
                            <div className="absolute bottom-full left-0 w-full mb-2 bg-white rounded-xl shadow-xl border border-brand-brown-100 z-50 py-2">
                              {['Avós', 'Pet', 'Professor', 'Professora'].map((sub) => (
                                <button
                                  key={sub}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setTargetAudience(`Outro - ${sub}`);
                                    setActiveDropdown(null);
                                  }}
                                  className="w-full px-4 py-3 text-left hover:bg-brand-gold-50 text-brand-brown-700 transition-colors"
                                >
                                  {sub}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        <button
                          key={option}
                          onClick={() => setTargetAudience(option)}
                          className={`px-4 py-6 rounded-xl border transition-all ${
                            targetAudience === option
                              ? 'border-brand-gold-500 bg-brand-gold-50 text-brand-brown-900 ring-1 ring-brand-gold-500'
                              : 'border-brand-brown-200 bg-white text-brand-brown-700 hover:border-brand-gold-300'
                          }`}
                        >
                          {option}
                        </button>
                      )
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-12">
                  {currentQuestions.map((q, index) => (
                    <div key={q.id} className="space-y-6">
                      <h2 className="text-xl md:text-2xl font-sans font-bold text-brand-brown-900 leading-tight">
                        {(() => {
                          // Handle gender voice specific overrides (if any exist still)
                          if (q.id === 'q7') { 
                            const v = formData['q5'];
                            if (v === 'Feminina' || v === 'Dueto') return q.question.replace('A voz da música', 'A voz feminina');
                          }
                          if (q.id === 'q30') {
                            const v = formData['q5'];
                            if (v === 'Masculina' || v === 'Dueto') return q.question.replace('A voz da música', 'A voz masculina');
                          }
                          return q.question;
                        })()}
                      </h2>

                      {q.type === 'choice' && (
                        <div className="grid grid-cols-3 gap-2">
                          {(() => {
                            const options = q.options || [];
                            // Specific questions that must have 2 buttons + 1 "Outros" dropdown
                            const forceOutros = q.id !== 'q4' && ['q13', 'q17', 'q18', 'q19', 'q28', 'q29', 'q30', 'q32', 'q36', 'q37', 'q49', 'q50', 'q51', 'q55'].includes(q.id);
                            
                            const showOutros = q.id !== 'q4' && (forceOutros || options.length > 3);
                            const visibleOptions = showOutros ? options.slice(0, 2) : options;
                            const openUp = index >= 2; 

                            return (
                              <>
                                {visibleOptions.map((option) => (
                                  <button
                                    key={option}
                                    onClick={() => {
                                      setFormData({ ...formData, [q.id]: option });
                                      setActiveDropdown(null);
                                    }}
                                    className={`px-1 text-center rounded-xl border transition-all duration-200 text-base flex items-center justify-center h-[60px] w-full ${
                                      formData[q.id] === option 
                                        ? 'border-brand-gold-500 bg-brand-gold-50 text-brand-brown-900 ring-1 ring-brand-gold-500 shadow-sm' 
                                        : 'border-brand-brown-200 bg-white text-brand-brown-700 hover:border-brand-gold-300 hover:bg-brand-brown-50'
                                    }`}
                                  >
                                    <span className="leading-tight break-words hyphens-auto w-full px-1">{option}</span>
                                  </button>
                                ))}
                                {showOutros && (
                                  <div className="relative dropdown-container w-full">
                                    <button
                                      onClick={() => toggleDropdown(q.id)}
                                      className={`w-full px-2 text-center rounded-xl border transition-all duration-200 text-base flex items-center justify-center h-[60px] font-medium ${
                                        activeDropdown === q.id || options.slice(2).includes(formData[q.id])
                                          ? 'border-brand-gold-500 bg-brand-gold-50 text-brand-brown-900'
                                          : 'border-brand-brown-200 bg-white text-brand-brown-700 hover:border-brand-gold-300 hover:bg-brand-brown-50'
                                      }`}
                                    >
                                      <span className="leading-tight break-words hyphens-auto w-full px-1 text-base">
                                        {options.slice(2).includes(formData[q.id]) ? formData[q.id] : 'Outros'}
                                      </span>
                                      <ChevronDown size={14} className={`ml-1 shrink-0 transition-transform ${activeDropdown === q.id ? 'rotate-180' : ''}`} />
                                    </button>
                                    
                                    <AnimatePresence>
                                      {activeDropdown === q.id && (
                                        <motion.div
                                          initial={{ opacity: 0, y: openUp ? -5 : 5, scale: 0.95 }}
                                          animate={{ opacity: 1, y: 0, scale: 1 }}
                                          exit={{ opacity: 0, y: openUp ? -5 : 5, scale: 0.95 }}
                                          className={`absolute right-0 ${openUp ? 'bottom-full mb-2' : 'top-full mt-2'} w-48 bg-white rounded-xl shadow-2xl border border-brand-brown-100 z-[60] overflow-hidden py-1 max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-brand-gold-200`}
                                        >
                                          {options.slice(2).map((option) => (
                                            <button
                                              key={option}
                                              onClick={() => {
                                                setFormData({ ...formData, [q.id]: option });
                                                setActiveDropdown(null);
                                              }}
                                              className={`w-full px-4 py-3 text-left text-base transition-colors ${
                                                formData[q.id] === option
                                                  ? 'bg-brand-gold-500 text-white font-bold'
                                                  : 'text-brand-brown-700 hover:bg-brand-gold-50'
                                              }`}
                                            >
                                              {option}
                                            </button>
                                          ))}
                                        </motion.div>
                                      )}
                                    </AnimatePresence>
                                  </div>
                                )}
                              </>
                            );
                          })()}
                        </div>
                      )}

                      {q.id === 'q20' && formData[q.id] === 'Sugerir' && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="mt-4"
                        >
                          <label className="block text-sm font-medium text-brand-brown-700 mb-2">
                            Qual a sua sugestão?
                          </label>
                          <Input
                            placeholder="Escreva sua sugestão aqui..."
                            className="h-14 text-lg bg-white border-brand-brown-200 shadow-sm focus-visible:ring-brand-gold-400"
                            value={formData.q20_suggestion || ''}
                            onChange={(e) => setFormData({ ...formData, q20_suggestion: formatSentence(e.target.value) })}
                          />
                        </motion.div>
                      )}
                      
                      {q.id === 'q4' && formData[q.id] === 'Sim' && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="mt-4 space-y-4"
                        >
                          <label className="block text-sm font-medium text-brand-brown-700 mb-2">
                            {targetAudience === 'Eu Mesmo' ? 'Qual o seu nome?' : 
                             ['Família', 'Filho(a)'].includes(targetAudience) ? 'Quais os nomes?' : 
                             'Qual o nome da pessoa?'}
                          </label>
                          <div className="space-y-3">
                            {(formData.q4_names || ['']).map((name: string, idx: number) => (
                              <div key={idx} className="flex gap-2">
                                <Input
                                  placeholder={targetAudience === 'Eu Mesmo' ? 'Escreva seu nome aqui...' : `Nome ${idx + 1}`}
                                  className="h-14 text-lg bg-white border-brand-brown-200 shadow-sm focus-visible:ring-brand-gold-400"
                                  value={name}
                                  onChange={(e) => {
                                    const newNames = [...(formData.q4_names || [''])];
                                    newNames[idx] = formatName(e.target.value);
                                    setFormData({ ...formData, q4_names: newNames });
                                  }}
                                />
                                {(formData.q4_names || []).length > 1 && (
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-14 w-14 shrink-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                                    onClick={() => {
                                      const newNames = (formData.q4_names || []).filter((_: any, i: number) => i !== idx);
                                      setFormData({ ...formData, q4_names: newNames });
                                    }}
                                  >
                                    <X size={20} />
                                  </Button>
                                )}
                              </div>
                            ))}
                          </div>

                          {(formData.q4_names || ['']).length < (['Família', 'Família '].includes(targetAudience) ? 10 : ['Filho(a)', 'Amigo(a)'].includes(targetAudience) ? 7 : targetAudience?.startsWith('Outro') ? 5 : 2) && (
                            <Button
                              type="button"
                              className="w-full h-12 border-dashed border-brand-gold-400 bg-brand-gold-50 text-brand-brown-900 hover:bg-brand-gold-100 hover:border-brand-gold-500 transition-all font-medium"
                              onClick={() => {
                                const currentNames = formData.q4_names || [''];
                                setFormData({ ...formData, q4_names: [...currentNames, ''] });
                              }}
                            >
                              <Plus className="mr-2 h-4 w-4" /> Adicione +1 nome
                            </Button>
                          )}
                          
                          <p className="text-xs text-brand-brown-500 italic">
                              * Você pode adicionar até {['Família', 'Família '].includes(targetAudience) ? 10 : ['Filho(a)', 'Amigo(a)'].includes(targetAudience) ? 7 : targetAudience?.startsWith('Outro') ? 5 : 2} nomes.
                            </p>
                        </motion.div>
                      )}

                      {q.id === 'q32' && formData[q.id] === 'Específica' && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="mt-4"
                        >
                          <label className="block text-sm font-medium text-brand-brown-700 mb-2">
                            Para quem é a música? (Opcional)
                          </label>
                          <Input
                            placeholder="Ex: Para minha mãe, Para meu ex..."
                            className="h-14 text-lg bg-white border-brand-brown-200 shadow-sm focus-visible:ring-brand-gold-400"
                            value={formData.q32_target || ''}
                            onChange={(e) => setFormData({ ...formData, q32_target: formatSentence(e.target.value) })}
                          />
                        </motion.div>
                      )}

                      {q.id === 'q59' && formData[q.id] === 'Produtor cria' && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="mt-4"
                        >
                          <label className="block text-sm font-medium text-brand-brown-700 mb-2">
                            Qual o título da música?
                          </label>
                          <Input
                            placeholder="Escreva o título aqui..."
                            className="h-14 text-lg bg-white border-brand-brown-200 shadow-sm focus-visible:ring-brand-gold-400"
                            value={formData.q59_title || ''}
                            onChange={(e) => setFormData({ ...formData, q59_title: formatSentence(e.target.value) })}
                          />
                        </motion.div>
                      )}

                      {q.id === 'q60' && formData[q.id] === 'Eu tenho' && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="mt-4"
                        >
                          <label className="block text-sm font-medium text-brand-brown-700 mb-2">
                            Qual a sua referência?
                          </label>
                          <Input
                            placeholder="Escreva sua referência aqui..."
                            className="h-14 text-lg bg-white border-brand-brown-200 shadow-sm focus-visible:ring-brand-gold-400"
                            value={formData.q60_ref || ''}
                            onChange={(e) => setFormData({ ...formData, q60_ref: formatSentence(e.target.value) })}
                          />
                        </motion.div>
                      )}

                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Navigation Footer */}
      <footer className="fixed bottom-0 left-0 right-0 p-4 bg-brand-beige-100/80 backdrop-blur-md border-t border-brand-brown-100 z-50">
        <div className="max-w-xl mx-auto flex justify-between items-center">
          <Button 
            variant="ghost" 
            onClick={handlePrev}
            disabled={currentStep === 0}
            className={currentStep === 0 ? 'invisible' : ''}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
          </Button>
          
          <Button 
            variant="gold" 
            size="lg"
            onClick={handleNext}
            disabled={isNextDisabled || isSubmitting}
            className="px-8 shadow-md"
          >
            {isSubmitting ? (
              <>Enviando... <Loader2 className="ml-2 h-4 w-4 animate-spin" /></>
            ) : currentStep === totalPages ? (
              <>Finalizar <ArrowRight className="ml-2 h-4 w-4" /></>
            ) : (
              <>Avançar <ArrowRight className="ml-2 h-4 w-4" /></>
            )}
          </Button>
        </div>
      </footer>

      {/* Email Suggestions Modal */}
      <AnimatePresence>
        {showEmailSuggestions && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowEmailSuggestions(false)}
              className="fixed inset-0 bg-brand-brown-900/60 backdrop-blur-sm z-[100]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-[90%] max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-brand-brown-100 flex flex-col max-h-[80vh]"
            >
              <div className="p-4 bg-brand-brown-50 border-b border-brand-brown-100 shrink-0">
                <h3 className="text-sm font-bold text-brand-brown-800 flex items-center gap-2">
                  <AtSign size={16} className="text-brand-gold-500" />
                  Selecione o provedor
                </h3>
              </div>
              <div className="overflow-y-auto overscroll-contain flex-1">
                {emailSuggestions.map((domain) => (
                    <button
                      key={domain}
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        selectEmailSuggestion(domain);
                      }}
                      className="w-full px-5 py-4 text-left hover:bg-brand-gold-50 text-brand-brown-700 text-base flex items-center gap-3 border-b border-brand-brown-50 last:border-0 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-full bg-brand-gold-100 flex items-center justify-center text-brand-gold-600 shrink-0">
                        <AtSign size={14} />
                      </div>
                      <span className="truncate text-base">
                        {(formData.email || '').split('@')[0]}@<strong>{domain}</strong>
                      </span>
                    </button>
                ))}
              </div>
              <button 
                onClick={() => setShowEmailSuggestions(false)}
                className="w-full p-4 text-sm font-medium text-brand-brown-500 hover:text-brand-brown-800 bg-brand-brown-50 shrink-0 transition-colors"
              >
                Cancelar
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
