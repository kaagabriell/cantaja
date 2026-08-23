import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { 
  Shield, 
  Lock, 
  KeyRound, 
  Search, 
  Send, 
  MessageSquare, 
  Layers, 
  CheckCircle2, 
  XCircle, 
  Building2, 
  Calendar, 
  FileText, 
  ChevronRight, 
  ExternalLink,
  ShieldCheck,
  AlertTriangle
} from "lucide-react";
import { MetaHeader } from "../../components/threads-autopilot/MetaHeader";
import { MetaFooter } from "../../components/threads-autopilot/MetaFooter";
import { SEOHead } from "../../components/threads-autopilot/SEOHead";

export default function ThreadsAutopilotPage() {
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-brand-neon selection:text-black overflow-x-hidden flex flex-col justify-between">
      <SEOHead 
        title="Threads Autopilot | Automação interna da KaaGabriell"
        description="Conheça o Threads Autopilot, ferramenta interna da KaaGabriell para publicar conteúdo e interagir com publicações públicas no Threads."
        canonical="https://cantaja.com.br/threads-autopilot"
      />

      <MetaHeader showNavLinks={true} />

      <main className="flex-grow">
        {/* 1. HERO SECTION */}
        <section className="relative pt-12 md:pt-20 pb-20 md:pb-28 px-6 md:px-12 max-w-[1400px] mx-auto border-b border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Content */}
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="lg:col-span-7 space-y-6"
            >
              {/* Eyebrow badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-semibold tracking-wider text-brand-neon uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-neon"></span>
                FERRAMENTA INTERNA | THREADS API
              </div>

              {/* H1 Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.1] text-white">
                Conteúdo e interação no Threads, com controle e contexto.
              </h1>

              {/* Description Body */}
              <p className="text-base sm:text-lg text-[#A1A1AA] leading-relaxed max-w-2xl font-normal">
                O Threads Autopilot é uma ferramenta interna desenvolvida e operada pela KaaGabriell para o próprio perfil da empresa no Threads. Ela organiza publicações, encontra conversas públicas relacionadas ao nosso trabalho e ajuda a produzir respostas curtas e contextuais.
              </p>

              {/* Badges Pill list */}
              <div className="flex flex-wrap gap-2.5 pt-2">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#111111] border border-white/10 text-xs sm:text-sm text-white/90 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-brand-neon" aria-hidden="true" />
                  Uso interno
                </span>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#111111] border border-white/10 text-xs sm:text-sm text-white/90 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-brand-neon" aria-hidden="true" />
                  Apenas perfil próprio
                </span>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#111111] border border-white/10 text-xs sm:text-sm text-white/90 font-medium">
                  <ShieldCheck className="w-4 h-4 text-brand-neon" aria-hidden="true" />
                  Sem acesso a mensagens privadas
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
                <a 
                  href="#como-funciona"
                  className="relative overflow-hidden inline-flex items-center justify-center bg-brand-neon text-black px-7 py-3.5 rounded-full font-bold text-sm md:text-base hover:bg-brand-neon-hover transition-colors shadow-[0_0_30px_rgba(212,255,0,0.20)] text-center group"
                >
                  <span className="relative z-10">Entender como funciona</span>
                  <div className="absolute top-0 h-full w-full z-0 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/80 to-transparent animate-shine" />
                </a>

                <Link 
                  to="/threads-autopilot/privacidade"
                  className="inline-flex items-center justify-center bg-white/10 hover:bg-white/15 text-white border border-white/15 px-6 py-3.5 rounded-full font-semibold text-sm transition-colors text-center"
                >
                  Ver privacidade
                </Link>
              </div>

              {/* Microcopy */}
              <p className="text-xs text-[#A1A1AA]/80 pt-1">
                Ferramenta em desenvolvimento e restrita ao administrador autorizado da empresa.
              </p>
            </motion.div>

            {/* Right Abstract Flow Graphic (No AI slop, pure SVG/CSS architecture flow) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-5 bg-[#111111] border border-white/10 rounded-[32px] md:rounded-[40px] p-6 sm:p-8 relative overflow-hidden shadow-2xl"
            >
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-brand-neon"></div>
                  <span className="text-xs font-mono tracking-wider text-white/70 uppercase">Pipeline Operacional</span>
                </div>
                <span className="text-[11px] font-mono text-[#A1A1AA] bg-white/5 px-2.5 py-1 rounded-md border border-white/10">
                  Modo: Autorizado
                </span>
              </div>

              {/* 4 Pipeline Step Cards */}
              <div className="space-y-3 relative">
                <div className="p-4 rounded-2xl bg-[#1A1A1A] border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-brand-neon/15 text-brand-neon flex items-center justify-center text-xs font-bold font-mono">01</span>
                    <div>
                      <h3 className="text-xs sm:text-sm font-semibold text-white">Planejar</h3>
                      <p className="text-[11px] text-[#A1A1AA]">Diretrizes e temas de negócios</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-white/50 uppercase font-mono">Regras</span>
                </div>

                <div className="flex justify-center -my-1">
                  <div className="w-px h-3 bg-brand-neon/30"></div>
                </div>

                <div className="p-4 rounded-2xl bg-[#1A1A1A] border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-brand-neon/15 text-brand-neon flex items-center justify-center text-xs font-bold font-mono">02</span>
                    <div>
                      <h3 className="text-xs sm:text-sm font-semibold text-white">Publicar</h3>
                      <p className="text-[11px] text-[#A1A1AA]">Exclusivo no perfil próprio conectado</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-brand-neon uppercase font-mono font-semibold">Perfil Próprio</span>
                </div>

                <div className="flex justify-center -my-1">
                  <div className="w-px h-3 bg-brand-neon/30"></div>
                </div>

                <div className="p-4 rounded-2xl bg-[#1A1A1A] border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-brand-neon/15 text-brand-neon flex items-center justify-center text-xs font-bold font-mono">03</span>
                    <div>
                      <h3 className="text-xs sm:text-sm font-semibold text-white">Encontrar</h3>
                      <p className="text-[11px] text-[#A1A1AA]">Busca por palavras-chave públicas</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-white/50 uppercase font-mono">Público</span>
                </div>

                <div className="flex justify-center -my-1">
                  <div className="w-px h-3 bg-brand-neon/30"></div>
                </div>

                <div className="p-4 rounded-2xl bg-[#1A1A1A] border border-brand-neon/30 flex items-center justify-between bg-brand-neon/[0.03]">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-brand-neon text-black flex items-center justify-center text-xs font-bold font-mono">04</span>
                    <div>
                      <h3 className="text-xs sm:text-sm font-semibold text-white">Responder</h3>
                      <p className="text-[11px] text-[#A1A1AA]">Respostas contextuais e objetivas</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-brand-neon uppercase font-mono font-semibold">Com Contexto</span>
                </div>
              </div>

              {/* Safety banner at bottom of card */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2 text-[11px] text-[#A1A1AA]">
                <Lock className="w-3.5 h-3.5 text-brand-neon flex-shrink-0" aria-hidden="true" />
                <span>Nenhuma mensagem privada é acessada. Os dados pessoais processados são limitados às informações básicas do perfil autorizado e ao necessário para operar a integração.</span>
              </div>
            </motion.div>

          </div>
        </section>

        {/* 2. VISÃO GERAL SECTION */}
        <section id="visao-geral" className="py-20 md:py-28 px-6 md:px-12 max-w-[1400px] mx-auto border-b border-white/10">
          <div className="space-y-4 max-w-3xl mb-12 md:mb-16">
            <span className="text-xs font-semibold tracking-widest text-brand-neon uppercase">VISÃO GERAL</span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-white leading-tight">
              Uma operação interna, não uma plataforma para terceiros.
            </h2>
            <p className="text-base sm:text-lg text-[#A1A1AA] leading-relaxed">
              O aplicativo não gerencia contas de clientes nem portfólios empresariais de terceiros. A integração é autorizada pelo responsável da KaaGabriell e funciona somente no perfil do Threads conectado por ele.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* Card 1 */}
            <div className="bg-[#111111] border border-white/10 hover:border-brand-neon/40 rounded-[32px] p-8 space-y-4 transition-all duration-200">
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-neon">
                <Send className="w-6 h-6" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-medium text-white">Publicação planejada</h3>
              <p className="text-sm text-[#A1A1AA] leading-relaxed">
                Prepara e publica textos sobre sites, aplicativos, marketing, anúncios e negócios digitais no perfil autorizado.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-[#111111] border border-white/10 hover:border-brand-neon/40 rounded-[32px] p-8 space-y-4 transition-all duration-200">
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-neon">
                <Search className="w-6 h-6" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-medium text-white">Busca pública relevante</h3>
              <p className="text-sm text-[#A1A1AA] leading-relaxed">
                Pesquisa publicações públicas por palavras-chave relacionadas aos serviços da empresa e seleciona somente conversas pertinentes.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-[#111111] border border-white/10 hover:border-brand-neon/40 rounded-[32px] p-8 space-y-4 transition-all duration-200">
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-neon">
                <MessageSquare className="w-6 h-6" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-medium text-white">Resposta com contexto</h3>
              <p className="text-sm text-[#A1A1AA] leading-relaxed">
                Analisa o texto público encontrado antes de sugerir ou publicar uma resposta objetiva, evitando mensagens repetitivas ou fora de contexto.
              </p>
            </div>
          </div>
        </section>

        {/* 3. COMO FUNCIONA (LIGHT SECTION) */}
        <section id="como-funciona" className="bg-[#F4F4F5] text-[#18181B] rounded-t-[48px] md:rounded-t-[64px] py-20 md:py-28 px-6 md:px-12 mt-12">
          <div className="max-w-[1400px] mx-auto">
            <div className="space-y-4 max-w-3xl mb-12 md:mb-16">
              <span className="text-xs font-bold tracking-widest text-black/60 uppercase">COMO FUNCIONA</span>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#18181B] leading-tight">
                Do planejamento à conversa pública.
              </h2>
            </div>

            {/* 4 Steps Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12">
              {/* Step 1 */}
              <div className="bg-white border border-black/10 rounded-3xl p-7 space-y-4 shadow-sm">
                <div className="text-3xl font-mono font-bold text-black">01</div>
                <h3 className="text-xl font-semibold text-[#18181B]">Planejar</h3>
                <p className="text-sm text-zinc-600 leading-relaxed">
                  A ferramenta prepara textos curtos com temas definidos pela empresa e aplica regras de linguagem e frequência.
                </p>
              </div>

              {/* Step 2 */}
              <div className="bg-white border border-black/10 rounded-3xl p-7 space-y-4 shadow-sm">
                <div className="text-3xl font-mono font-bold text-black">02</div>
                <h3 className="text-xl font-semibold text-[#18181B]">Publicar</h3>
                <p className="text-sm text-zinc-600 leading-relaxed">
                  O conteúdo é publicado somente no perfil do Threads que autorizou a integração.
                </p>
              </div>

              {/* Step 3 */}
              <div className="bg-white border border-black/10 rounded-3xl p-7 space-y-4 shadow-sm">
                <div className="text-3xl font-mono font-bold text-black">03</div>
                <h3 className="text-xl font-semibold text-[#18181B]">Encontrar</h3>
                <p className="text-sm text-zinc-600 leading-relaxed">
                  A busca por palavras-chave retorna publicações públicas relacionadas a sites, aplicativos, anúncios, branding e negócios digitais.
                </p>
              </div>

              {/* Step 4 */}
              <div className="bg-white border border-black/10 rounded-3xl p-7 space-y-4 shadow-sm">
                <div className="text-3xl font-mono font-bold text-black">04</div>
                <h3 className="text-xl font-semibold text-[#18181B]">Responder</h3>
                <p className="text-sm text-zinc-600 leading-relaxed">
                  Antes de qualquer resposta, a publicação é avaliada quanto à relevância. A resposta deve ser curta, específica e compatível com o assunto original.
                </p>
              </div>
            </div>

            {/* Highlighted Notice */}
            <div className="bg-black/5 border border-black/10 rounded-2xl p-6 sm:p-8 flex items-start gap-4">
              <Shield className="w-6 h-6 text-black flex-shrink-0 mt-0.5" aria-hidden="true" />
              <p className="text-sm sm:text-base text-zinc-800 font-medium leading-relaxed">
                <strong>Nota de conformidade:</strong> A automação não acessa mensagens privadas, não publica em perfis não autorizados e não promete resolver problemas técnicos sem analisar o contexto.
              </p>
            </div>
          </div>
        </section>

        {/* 4. PERMISSÕES DA API */}
        <section id="permissoes" className="py-20 md:py-28 px-6 md:px-12 max-w-[1400px] mx-auto border-b border-white/10">
          <div className="space-y-4 max-w-3xl mb-12 md:mb-16">
            <span className="text-xs font-semibold tracking-widest text-brand-neon uppercase">PERMISSÕES DA API</span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-white leading-tight">
              Somente o necessário para a operação descrita.
            </h2>
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto bg-[#111111] border border-white/10 rounded-[32px] p-2">
            <table className="w-full text-left border-collapse" aria-label="Tabela de permissões da API do Threads">
              <caption className="sr-only">Relação de permissões solicitadas à API do Threads e suas respectivas finalidades de uso</caption>
              <thead>
                <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-white/50">
                  <th scope="col" className="py-5 px-6 font-semibold">Permissão (Escopo)</th>
                  <th scope="col" className="py-5 px-6 font-semibold">Finalidade e Uso Operacional</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 text-sm">
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-5 px-6 font-mono font-semibold text-brand-neon whitespace-nowrap">
                    threads_basic
                  </td>
                  <td className="py-5 px-6 text-[#A1A1AA] leading-relaxed">
                    Identificar o perfil autorizado e acessar as informações básicas necessárias para operar a integração.
                  </td>
                </tr>
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-5 px-6 font-mono font-semibold text-brand-neon whitespace-nowrap">
                    threads_content_publish
                  </td>
                  <td className="py-5 px-6 text-[#A1A1AA] leading-relaxed">
                    Criar e publicar conteúdo no perfil do Threads conectado pelo responsável da empresa.
                  </td>
                </tr>
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-5 px-6 font-mono font-semibold text-brand-neon whitespace-nowrap">
                    threads_keyword_search
                  </td>
                  <td className="py-5 px-6 text-[#A1A1AA] leading-relaxed">
                    Pesquisar conteúdo público por palavras-chave relacionadas aos assuntos de atuação da empresa.
                  </td>
                </tr>
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-5 px-6 font-mono font-semibold text-brand-neon whitespace-nowrap">
                    threads_manage_replies
                  </td>
                  <td className="py-5 px-6 text-[#A1A1AA] leading-relaxed">
                    Publicar respostas em nome do perfil autorizado em conversas públicas pertinentes.
                  </td>
                </tr>
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-5 px-6 font-mono font-semibold text-brand-neon whitespace-nowrap">
                    threads_read_replies
                  </td>
                  <td className="py-5 px-6 text-[#A1A1AA] leading-relaxed">
                    Ler respostas às publicações do próprio perfil para manter contexto e acompanhar as interações.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Mobile Stacked Cards */}
          <div className="md:hidden space-y-4">
            <div className="bg-[#111111] border border-white/10 rounded-2xl p-5 space-y-2">
              <span className="font-mono font-bold text-brand-neon text-sm">threads_basic</span>
              <p className="text-sm text-[#A1A1AA] leading-relaxed">
                Identificar o perfil autorizado e acessar as informações básicas necessárias para operar a integração.
              </p>
            </div>
            <div className="bg-[#111111] border border-white/10 rounded-2xl p-5 space-y-2">
              <span className="font-mono font-bold text-brand-neon text-sm">threads_content_publish</span>
              <p className="text-sm text-[#A1A1AA] leading-relaxed">
                Criar e publicar conteúdo no perfil do Threads conectado pelo responsável da empresa.
              </p>
            </div>
            <div className="bg-[#111111] border border-white/10 rounded-2xl p-5 space-y-2">
              <span className="font-mono font-bold text-brand-neon text-sm">threads_keyword_search</span>
              <p className="text-sm text-[#A1A1AA] leading-relaxed">
                Pesquisar conteúdo público por palavras-chave relacionadas aos assuntos de atuação da empresa.
              </p>
            </div>
            <div className="bg-[#111111] border border-white/10 rounded-2xl p-5 space-y-2">
              <span className="font-mono font-bold text-brand-neon text-sm">threads_manage_replies</span>
              <p className="text-sm text-[#A1A1AA] leading-relaxed">
                Publicar respostas em nome do perfil autorizado em conversas públicas pertinentes.
              </p>
            </div>
            <div className="bg-[#111111] border border-white/10 rounded-2xl p-5 space-y-2">
              <span className="font-mono font-bold text-brand-neon text-sm">threads_read_replies</span>
              <p className="text-sm text-[#A1A1AA] leading-relaxed">
                Ler respostas às publicações do próprio perfil para manter contexto e acompanhar as interações.
              </p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-[#A1A1AA] mt-6 pt-4 border-t border-white/10">
            As permissões são usadas exclusivamente no perfil próprio conectado. O Threads Autopilot não solicita acesso a contas de clientes.
          </p>
        </section>

        {/* 5. DADOS E SEGURANÇA */}
        <section id="dados-seguranca" className="py-20 md:py-28 px-6 md:px-12 max-w-[1400px] mx-auto border-b border-white/10">
          <div className="space-y-4 max-w-3xl mb-12 md:mb-16">
            <span className="text-xs font-semibold tracking-widest text-brand-neon uppercase">DADOS E SEGURANÇA</span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-white leading-tight">
              Dados mínimos, finalidade definida.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12">
            {/* Category 1 */}
            <div className="bg-[#111111] border border-white/10 rounded-[28px] p-7 space-y-2">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-neon"></span>
                Perfil autorizado
              </h3>
              <p className="text-sm text-[#A1A1AA] leading-relaxed">
                Identificador, nome de usuário e informações básicas do perfil conectado, apenas para identificar a conta correta.
              </p>
            </div>

            {/* Category 2 */}
            <div className="bg-[#111111] border border-white/10 rounded-[28px] p-7 space-y-2">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-neon"></span>
                Conteúdo próprio
              </h3>
              <p className="text-sm text-[#A1A1AA] leading-relaxed">
                Textos, identificadores de publicações e respostas criadas pelo perfil autorizado.
              </p>
            </div>

            {/* Category 3 */}
            <div className="bg-[#111111] border border-white/10 rounded-[28px] p-7 space-y-2">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-neon"></span>
                Conteúdo público encontrado
              </h3>
              <p className="text-sm text-[#A1A1AA] leading-relaxed">
                Identificadores e trechos de publicações públicas retornadas pela busca por palavras-chave, usados para avaliar relevância e evitar duplicidade.
              </p>
            </div>

            {/* Category 4 */}
            <div className="bg-[#111111] border border-white/10 rounded-[28px] p-7 space-y-2">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-neon"></span>
                Registros operacionais
              </h3>
              <p className="text-sm text-[#A1A1AA] leading-relaxed">
                Horário, estado da tarefa e identificadores técnicos necessários para agendamento, auditoria e prevenção de ações repetidas.
              </p>
            </div>
          </div>

          {/* Como protegemos block */}
          <div className="bg-[#161616] border border-white/10 rounded-[32px] p-8 md:p-10 space-y-6">
            <h3 className="text-xl font-semibold text-white flex items-center gap-2.5">
              <ShieldCheck className="w-6 h-6 text-brand-neon" aria-hidden="true" />
              Como protegemos
            </h3>
            <ul className="space-y-3 text-sm text-[#A1A1AA] leading-relaxed">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-brand-neon flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span>Tokens de acesso ficam armazenados como segredos criptografados no ambiente de servidor.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-brand-neon flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span>Senhas do Threads não são coletadas.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-brand-neon flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span>Mensagens privadas e conteúdo privado não são acessados.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-brand-neon flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span>Dados não são vendidos, alugados ou usados para criar perfis publicitários.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-brand-neon flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span>O acesso é limitado ao administrador autorizado e aos serviços técnicos necessários à operação.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* 6. LIMITES DA FERRAMENTA */}
        <section className="py-20 md:py-28 px-6 md:px-12 max-w-[1400px] mx-auto border-b border-white/10">
          <div className="space-y-4 max-w-3xl mb-12 md:mb-16">
            <span className="text-xs font-semibold tracking-widest text-brand-neon uppercase">LIMITES CLAROS</span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-white leading-tight">
              O que o Threads Autopilot não faz.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {[
              "Não gerencia perfis ou portfólios empresariais de clientes.",
              "Não lê nem envia mensagens diretas.",
              "Não acessa publicações privadas.",
              "Não compra seguidores, não cria engajamento falso e não envia respostas em massa sem relação com o assunto.",
              "Não compartilha dados do Threads com anunciantes ou corretores de dados.",
              "Não substitui o controle do responsável, que pode revogar a autorização a qualquer momento."
            ].map((item, idx) => (
              <div key={idx} className="bg-[#111111] border border-white/10 rounded-2xl p-5 flex items-start gap-3.5">
                <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span className="text-sm text-[#A1A1AA] leading-relaxed font-medium">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 7. PRIVACIDADE, RETENÇÃO E EXCLUSÃO */}
        <section id="privacidade" className="py-20 md:py-28 px-6 md:px-12 max-w-[1400px] mx-auto border-b border-white/10">
          <div className="space-y-4 max-w-3xl mb-12">
            <span className="text-xs font-semibold tracking-widest text-brand-neon uppercase">PRIVACIDADE</span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-white leading-tight">
              Controle permanece com o titular.
            </h2>
            <p className="text-base text-[#A1A1AA] leading-relaxed">
              Trechos de conteúdo público e registros operacionais usados para evitar duplicidade são mantidos por até 30 dias. Identificadores de conteúdo próprio podem ser mantidos enquanto a integração estiver ativa para possibilitar operação e auditoria. O token de acesso permanece armazenado somente enquanto for válido e necessário, sendo removido quando a conexão é revogada ou quando a exclusão é concluída.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-10">
            <div className="bg-[#111111] border border-white/10 rounded-[32px] p-8 space-y-4">
              <h3 className="text-xl font-medium text-white">Revogar acesso</h3>
              <p className="text-sm text-[#A1A1AA] leading-relaxed">
                O responsável pode remover o Threads Autopilot em Threads/Meta, na área de aplicativos e sites conectados. A revogação impede novas ações da integração.
              </p>
            </div>

            <div className="bg-[#111111] border border-white/10 rounded-[32px] p-8 space-y-4">
              <h3 className="text-xl font-medium text-white">Solicitar exclusão</h3>
              <p className="text-sm text-[#A1A1AA] leading-relaxed">
                O responsável pode consultar as instruções públicas de exclusão e solicitar a remoção dos dados associados à integração.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Link 
              to="/threads-autopilot/privacidade"
              className="inline-flex items-center justify-center bg-white text-black px-7 py-3.5 rounded-full font-bold text-sm hover:bg-zinc-200 transition-colors text-center"
            >
              Ler política de privacidade
            </Link>
            <Link 
              to="/threads-autopilot/exclusao-de-dados"
              className="inline-flex items-center justify-center bg-white/10 hover:bg-white/15 text-white border border-white/15 px-6 py-3.5 rounded-full font-semibold text-sm transition-colors text-center"
            >
              Ver exclusão de dados
            </Link>
          </div>
        </section>

        {/* 8. RESPONSÁVEL */}
        <section id="responsavel" className="py-20 md:py-28 px-6 md:px-12 max-w-[1400px] mx-auto">
          <div className="space-y-4 max-w-3xl mb-12">
            <span className="text-xs font-semibold tracking-widest text-brand-neon uppercase">RESPONSÁVEL</span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-white leading-tight">
              Desenvolvido e operado pela KaaGabriell.
            </h2>
          </div>

          <div className="bg-[#111111] border border-white/10 rounded-[32px] p-8 md:p-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              <div>
                <span className="text-xs uppercase tracking-wider text-white/50 block mb-1">Nome empresarial</span>
                <span className="text-sm sm:text-base font-semibold text-white">56.253.940 KAUA HENRIQUE SOUZA GABRIEL</span>
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider text-white/50 block mb-1">CNPJ</span>
                <span className="text-sm sm:text-base font-semibold text-white">56.253.940/0001-47</span>
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider text-white/50 block mb-1">País</span>
                <span className="text-sm sm:text-base font-semibold text-white">Brasil</span>
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider text-white/50 block mb-1">Site</span>
                <a href="https://cantaja.com.br" className="text-sm sm:text-base font-semibold text-brand-neon hover:underline">
                  https://cantaja.com.br
                </a>
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider text-white/50 block mb-1">E-mail para privacidade e exclusão</span>
                <a href="mailto:kauabrgamer900@gmail.com" className="text-sm sm:text-base font-semibold text-brand-neon hover:underline">
                  kauabrgamer900@gmail.com
                </a>
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider text-white/50 block mb-1">Finalidade</span>
                <span className="text-sm text-[#A1A1AA]">Ferramenta interna para o perfil próprio da empresa no Threads.</span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#A1A1AA]">
              <p>
                Canal de contato e suporte:{" "}
                <a href="mailto:kauabrgamer900@gmail.com" className="text-white hover:text-brand-neon font-medium underline underline-offset-2">
                  kauabrgamer900@gmail.com
                </a>
              </p>
              <span className="text-white/40">Atualizado para verificação Meta em 23 de agosto de 2026</span>
            </div>
          </div>
        </section>
      </main>

      <MetaFooter />
    </div>
  );
}
