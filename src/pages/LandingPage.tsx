import { motion, useInView, useScroll, useTransform, useSpring } from "motion/react";
import { Link } from "react-router-dom";
import { 
  Menu, X, Check, Play, Volume2, Settings, Maximize, 
  ShieldCheck, Clock, Music, Youtube, Instagram, Shield,
  SkipBack, SkipForward, Pause
} from "lucide-react";
import React, { useState, useEffect, useRef } from "react";

const TESTIMONIAL_IMAGES = [
  "https://res.cloudinary.com/dxbgfje1t/image/upload/v1777223682/1_5_dep_p2gbls.png",
  "https://res.cloudinary.com/dxbgfje1t/image/upload/v1777223683/2_4_dep_brlygj.png",
  "https://res.cloudinary.com/dxbgfje1t/image/upload/v1777223682/3_7_dep_bdrapr.png",
  "https://res.cloudinary.com/dxbgfje1t/image/upload/v1777223683/4_2_dep_uksao8.png",
  "https://res.cloudinary.com/dxbgfje1t/image/upload/v1777223683/7_6_dep_pbkzor.png",
  "https://res.cloudinary.com/dxbgfje1t/image/upload/v1777223684/5_3_dep_lx5re1.png",
  "https://res.cloudinary.com/dxbgfje1t/image/upload/v1777223684/6_1_dep_rtbokj.png",
];

const SONGS = [
  {
    title: "Farol Aceso",
    style: "SERTANEJO",
    audio: "https://res.cloudinary.com/dxbgfje1t/video/upload/v1777230058/Farol_Aceso_uk4fkx.mp3"
  },
  {
    title: "Quando Ele Fala",
    style: "GOSPEL",
    audio: "https://res.cloudinary.com/dxbgfje1t/video/upload/v1777236387/Quando_Ele_Fala_Masculino_jwghtm.mp3"
  },
  {
    title: "Coração Pediu Você",
    style: "PAGODE",
    audio: "https://res.cloudinary.com/dxbgfje1t/video/upload/v1777287962/Cora%C3%A7%C3%A3o_Pediu_Voc%C3%AA_kz37au.mp3"
  },
  {
    title: "O Vazio Que Ficou",
    style: "FUNK MELÓDICO",
    audio: "https://res.cloudinary.com/dxbgfje1t/video/upload/v1777235475/O_Vazio_que_Ficou_Esfriou_ah7lt3.mp3"
  },
  {
    title: "Fica Estranho Sem Você",
    style: "TRAP",
    audio: "https://res.cloudinary.com/dxbgfje1t/video/upload/v1777287487/Fica_Estranho_Sem_Voc%C3%AA_Vibe_BR_V2_uvqqss.mp3"
  }
];

// Triple the images for a "loop" feel
const INFINITE_IMAGES = [...TESTIMONIAL_IMAGES, ...TESTIMONIAL_IMAGES, ...TESTIMONIAL_IMAGES];

interface TestimonialCardProps {
  src: string;
  containerRef: React.RefObject<HTMLDivElement | null>;
  key?: number | string;
}

function TestimonialCard({ src, containerRef }: TestimonialCardProps) {
  return (
    <div
      className="w-[280px] md:w-[400px] aspect-[4/5] bg-dark-card border border-border-dark rounded-[3rem] overflow-hidden relative flex-none snap-center"
    >
      <img 
        src={src} 
        alt="Depoimento" 
        className="w-full h-full object-cover pointer-events-none"
        referrerPolicy="no-referrer"
      />
    </div>
  );
}

export default function LandingPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const footerRef = useRef(null);
  const carouselContainerRef = useRef<HTMLDivElement>(null);
  const isFooterInView = useInView(footerRef, { margin: "-10% 0px 0px 0px" });

  useEffect(() => {
    const container = carouselContainerRef.current;
    if (!container) return;

    const cardWidth = window.innerWidth < 768 ? 280 : 400;
    const gap = 24; // gap-6
    const totalSetWidth = (cardWidth + gap) * TESTIMONIAL_IMAGES.length;

    // Initial scroll to the middle set
    container.scrollLeft = totalSetWidth;

    const handleScroll = () => {
      const currentScroll = container.scrollLeft;

      // If we scroll past the second set, jump back to the equivalent position in the second set
      if (currentScroll >= totalSetWidth * 2) {
        container.scrollLeft = currentScroll - totalSetWidth;
      } 
      // If we scroll before the second set, jump forward to the equivalent position in the second set
      else if (currentScroll <= totalSetWidth * 0.5) {
        container.scrollLeft = currentScroll + totalSetWidth;
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const nextSong = () => {
    setCurrentSongIndex((prev) => (prev + 1) % SONGS.length);
  };

  const prevSong = () => {
    setCurrentSongIndex((prev) => (prev - 1 + SONGS.length) % SONGS.length);
  };

  useEffect(() => {
    if (audioRef.current) {
      const startPlay = async () => {
        try {
          if (isPlaying) {
            await audioRef.current?.play();
          } else {
            audioRef.current?.pause();
          }
        } catch (err) {
          console.error("Audio playback error:", err);
          setIsPlaying(false);
        }
      };
      startPlay();
    }
  }, [currentSongIndex, isPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const isNavbarVisible = !isFooterInView || isMobileMenuOpen;

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-dark-bg text-white font-sans selection:bg-brand-neon selection:text-black overflow-x-hidden">
      
      {/* Navbar */}
      <motion.nav 
        initial={{ y: 0 }}
        animate={{ y: isNavbarVisible ? 0 : -100 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-0 w-full bg-dark-bg/90 backdrop-blur-md h-20 md:h-24 z-50 border-b border-border-dark"
      >
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 h-full flex items-center justify-between">
          <div className="flex items-center -ml-4 md:-ml-6 lg:-ml-8">
            <img 
              src="https://res.cloudinary.com/dxbgfje1t/image/upload/f_auto,q_auto/logo_-_moreira_1_denxi8" 
              alt="CantaJá Logo" 
              className="w-[180px] md:w-[240px] lg:w-[280px] h-auto object-contain object-left"
              referrerPolicy="no-referrer"
            />
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-text-gray">
            <a href="#problema" className="hover:text-white transition-colors">O Problema</a>
            <a href="#pra-quem" className="hover:text-white transition-colors">Pra Quem</a>
            <a href="#preco" className="hover:text-white transition-colors">Começar</a>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <a href="/f/musica" className="bg-white text-black px-6 py-2.5 rounded-full font-bold text-sm hover:bg-gray-200 transition-colors">
              Criar Música
            </a>
          </div>
          
          <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-dark-bg pt-24 px-6 flex flex-col gap-6 md:hidden">
          <a href="#problema" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-medium border-b border-border-dark pb-4">O Problema</a>
          <a href="#pra-quem" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-medium border-b border-border-dark pb-4">Pra Quem</a>
          <a href="#preco" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-medium border-b border-border-dark pb-4">Começar</a>
          <a href="/f/musica" onClick={() => setIsMobileMenuOpen(false)} className="bg-brand-neon text-black px-6 py-4 rounded-full font-bold text-center mt-4">
            Criar Música
          </a>
        </div>
      )}

      {/* Hero Section */}
      <section className="pt-32 md:pt-48 pb-8 lg:pb-20 px-6 md:px-12 max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center lg:min-h-[90vh]">
        
        {/* Left Content */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="flex flex-col items-start">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-brand-neon/30 bg-brand-neon/5 text-brand-neon text-[10px] md:text-xs font-bold tracking-widest uppercase mb-8">
            <div className="w-1.5 h-1.5 bg-brand-neon rounded-full"></div>
            CANTAJA | MÚSICA ORIGINAL
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-medium leading-[1.05] tracking-tight mb-6">
            Sua história <br className="hidden md:block" />
            transformada em <br className="hidden md:block" />
            <span className="text-brand-neon italic pr-2">música</span>
          </h1>
          
          <p className="text-lg md:text-xl text-text-gray mb-10 max-w-xl leading-relaxed font-light">
            Não importa se é um presente, uma homenagem ou um hit para o seu negócio. Escolha o estilo, conte sua ideia e receba uma música profissional em até 1 dia. <span className="font-medium">Uma obra exclusiva, feita com carinho e totalmente sua.</span>
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-8 lg:mb-16">
            <a href="/f/musica" className="relative overflow-hidden w-full sm:w-auto bg-brand-neon text-black px-6 py-4 rounded-full font-bold text-sm md:text-base whitespace-nowrap hover:bg-brand-neon-hover transition-colors text-center shadow-[0_0_30px_rgba(212,255,0,0.2)] group">
              <span className="relative z-10">Criar Música</span>
              <div className="absolute top-0 h-full w-full z-0 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/90 to-transparent animate-shine" />
            </a>
            <button 
              onClick={() => {
                const el = document.getElementById('mockup-section');
                if (el) {
                  const y = el.getBoundingClientRect().top + window.pageYOffset - 100;
                  window.scrollTo({ top: y, behavior: 'smooth' });
                }
              }}
              className="w-full sm:w-auto px-6 py-4 rounded-full font-bold text-sm md:text-base whitespace-nowrap text-brand-neon transition-colors text-center border border-white/20 hover:bg-white/5 lg:hidden"
            >
              Ver Conteúdo
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 md:gap-8 w-full max-w-lg border-t border-border-dark pt-6 md:pt-8">
            <div>
              <h3 className="text-3xl md:text-4xl font-medium mb-1">1 dia</h3>
              <p className="text-[10px] md:text-xs text-text-gray font-bold tracking-widest uppercase">Prazo de Entrega</p>
            </div>
            <div>
              <h3 className="text-3xl md:text-4xl font-medium mb-1">100%</h3>
              <p className="text-[10px] md:text-xs text-text-gray font-bold tracking-widest uppercase">Direitos Seus</p>
            </div>
            <div>
              <h3 className="text-3xl md:text-4xl font-medium mb-1">Todos</h3>
              <p className="text-[10px] md:text-xs text-text-gray font-bold tracking-widest uppercase">Os Estilos</p>
            </div>
          </div>
        </motion.div>

        {/* Right Content (Mockup) */}
        <motion.div 
          id="mockup-section"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative w-full aspect-[4/3] lg:aspect-square max-h-[600px] flex items-center justify-center"
        >
          {/* Glow effect behind */}
          <div className="absolute inset-0 bg-brand-neon/10 blur-[100px] rounded-full"></div>
          
          {/* Mockup Container */}
          <div className="relative w-full max-w-md bg-dark-card border border-border-dark rounded-3xl overflow-hidden shadow-2xl z-10">
            {/* Browser Header */}
            <div className="bg-[#1A1A1A] px-4 py-3 flex items-center border-b border-border-dark">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-white/20"></div>
                <div className="w-3 h-3 rounded-full bg-white/20"></div>
                <div className="w-3 h-3 rounded-full bg-white/20"></div>
              </div>
              <div className="flex-1 text-right text-[10px] text-text-gray font-mono tracking-widest">{SONGS[currentSongIndex].style}</div>
            </div>
            
            {/* Player Content */}
            <div className="p-6 relative">
              <h4 className="text-xl font-medium mb-2">{SONGS[currentSongIndex].title}</h4>
              <p className="text-sm text-text-gray mb-6">Produzida por CantaJa</p>
              
              {/* Fake Audio Wave */}
              <div className="flex items-center justify-center gap-6 mb-8 mt-2">
                <button onClick={prevSong} className="text-white hover:text-brand-neon transition-colors">
                  <SkipBack className="w-8 h-8" />
                </button>
                <div onClick={togglePlay} className="w-16 h-16 bg-brand-neon rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(212,255,0,0.4)] cursor-pointer hover:scale-105 transition-transform">
                  {isPlaying ? (
                    <Pause className="w-8 h-8 text-black" />
                  ) : (
                    <Play className="w-8 h-8 text-black" />
                  )}
                </div>
                <button onClick={nextSong} className="text-white hover:text-brand-neon transition-colors">
                  <SkipForward className="w-8 h-8" />
                </button>
              </div>
              <audio 
                ref={audioRef} 
                src={SONGS[currentSongIndex].audio} 
                onEnded={() => {
                  nextSong();
                }}
              />

              {/* Fake Audio Wave */}
              <div className="flex items-center gap-1 h-8">
                {[...Array(40)].map((_, i) => (
                  <div 
                    key={i} 
                    className={`flex-1 bg-brand-neon/40 rounded-full h-full ${isPlaying ? 'animate-waveform' : ''}`}
                    style={{ 
                      transformOrigin: 'bottom',
                      animationDelay: `${i * 0.05}s`,
                      animationPlayState: isPlaying ? 'running' : 'paused'
                    }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Section 2: The Grid (O Problema / A Solução) */}
      <section id="problema" className="pt-12 pb-16 md:pt-16 md:pb-20 px-6 md:px-12 max-w-[1400px] mx-auto">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
          className="mb-12 md:mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium leading-tight mb-4 md:mb-6">
            Por que a música certa <br className="hidden md:block" />
            muda tudo?
          </h2>
          <p className="text-lg text-text-gray max-w-2xl leading-relaxed">
            Você já sabe que usar músicas famosas traz riscos jurídicos e bloqueia sua criatividade. Ficar refém de bancos de áudio genéricos ou trilhas sem alma não é o caminho. Sem uma composição original e exclusiva, sua mensagem perde a força e a conexão emocional com quem ouve.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Card 1: O Problema */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="bg-dark-card border border-border-dark rounded-[2rem] p-8 md:p-10 flex flex-col"
          >
            <div className="text-[10px] font-bold tracking-widest uppercase text-brand-neon mb-6">Cenário Atual</div>
            <h3 className="text-2xl md:text-3xl font-medium mb-8">O Risco de não ter algo Próprio</h3>
            <p className="text-text-gray mb-10 text-sm leading-relaxed">
              Usar músicas de outros sem permissão pode gerar processos judiciais sérios. Além disso, se você está cansado de ouvir sempre as mesmas faixas e quer algo que realmente emocione sua família ou alguém especial, o caminho não é o comum.
            </p>
            
            <ul className="space-y-6 mt-auto">
              {[
                "Risco real de processos por direitos autorais",
                "Cansado de ouvir sempre as mesmas músicas",
                "Falta de uma trilha que emocione sua família",
                "Desejo de uma animação musical exclusiva",
                "Sua história merece um som único, não genérico"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <X className="w-3.5 h-3.5 text-text-gray" />
                  </div>
                  <span className="text-text-gray text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Card 2: A Solução */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.1 }}
            className="bg-dark-card border border-border-dark rounded-[2rem] p-8 md:p-10 flex flex-col"
          >
            <div className="text-[10px] font-bold tracking-widest uppercase text-brand-neon mb-6">O Método</div>
            <h3 className="text-2xl md:text-3xl font-medium mb-8">O que você vai receber</h3>
            <p className="text-text-gray mb-10 text-sm leading-relaxed">
              Pegamos a sua ideia e transformamos em uma faixa completa, pronta para uso comercial ou pessoal.
            </p>
            
            <ul className="space-y-6 mt-auto">
              {[
                "Música 100% original e exclusiva",
                "Direitos autorais totalmente seus",
                "Qualidade de estúdio profissional",
                "Qualquer estilo musical (Sertanejo, Pop, etc)",
                "Entrega rápida em até 1 dia útil"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-brand-neon/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-brand-neon" />
                  </div>
                  <span className="text-white text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Stacked Cards */}
          <div className="flex flex-col gap-6">
            
            {/* White Card */}
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.2 }}
              className="bg-white text-zinc-900 rounded-[2rem] p-8 md:p-10 flex-1 flex flex-col justify-between shadow-xl"
            >
              <div>
                <div className="text-[10px] font-bold tracking-widest uppercase text-zinc-400 mb-6">A Proposta</div>
                <h3 className="text-3xl md:text-4xl font-medium mb-4">Liberdade Total</h3>
                <p className="text-zinc-600 text-sm leading-relaxed mb-8">
                  O nome que damos para quem não quer dor de cabeça. Você recebe a obra completa: presenteie alguém, ganhe dinheiro com monetização, YouTube ou Spotify.
                </p>
              </div>
              <a href="/f/musica" className="relative p-[3px] inline-flex items-center justify-center rounded-full overflow-hidden group w-fit shadow-[0_0_20px_rgba(212,255,0,0.15)]">
                <div className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,#D4FF00_25%,#D4FF00_50%,transparent_75%)]" />
                <div className="relative inline-flex items-center gap-2 bg-zinc-900 text-white px-6 py-3 rounded-full text-sm font-bold transition-colors hover:bg-zinc-800">
                  <div className="w-2 h-2 bg-brand-neon rounded-full shadow-[0_0_8px_#D4FF00]"></div>
                  Criar Música
                </div>
              </a>
            </motion.div>

            {/* Dark Small Card */}
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.3 }}
              className="bg-dark-card border border-border-dark rounded-[2rem] p-8 md:p-10"
            >
              <div className="text-[10px] font-bold tracking-widest uppercase text-brand-neon mb-6">Excelência</div>
              <h3 className="text-xl font-medium mb-4 text-white">Produção de Alto Nível</h3>
              <p className="text-text-gray text-sm leading-relaxed mb-6">
                Nossa equipe de especialistas une sensibilidade artística e anos de experiência em estúdio para criar obras únicas. Cada nota é pensada para transmitir sua emoção com qualidade profissional e exclusividade garantida.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-4 py-1.5 rounded-full border border-border-dark text-xs text-text-gray">Som Exclusivo</span>
                <span className="px-4 py-1.5 rounded-full border border-border-dark text-xs text-text-gray">Produção Humana</span>
                <span className="px-4 py-1.5 rounded-full border border-border-dark text-xs text-text-gray">Qualidade Premium</span>
                <span className="px-4 py-1.5 rounded-full border border-border-dark text-xs text-text-gray">Entrega Rápida</span>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Section 3: White Background Section */}
      <section id="pra-quem" className="bg-[#F4F4F5] text-zinc-900 rounded-t-[3rem] md:rounded-t-[4rem] pt-16 md:pt-24 pb-16 md:pb-20 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          
          <div className="mb-20">
            <div className="text-[10px] font-bold tracking-widest uppercase text-zinc-500 mb-6">Para quem é</div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium leading-tight max-w-3xl text-zinc-900">
              Você nos conhece pela qualidade, <br className="hidden md:block" />
              mas também somos <span className="font-bold">rápidos</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            
            {/* Left: Numbered List */}
            <div className="space-y-16">
              
              <div className="flex gap-6 md:gap-8">
                <div className="w-12 h-12 rounded-full bg-zinc-200 flex items-center justify-center font-mono text-sm font-bold flex-shrink-0 text-zinc-900">01</div>
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-zinc-900">Presentes Inesquecíveis</h3>
                  <p className="text-zinc-600 leading-relaxed">
                    Surpreenda seu parceiro(a) no aniversário de namoro ou casamento com a história de vocês cantada. Emocione sua mãe, pai ou filhos com uma letra feita sob medida para momentos únicos.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 md:gap-8">
                <div className="w-12 h-12 rounded-full bg-zinc-200 flex items-center justify-center font-mono text-sm font-bold flex-shrink-0 text-zinc-900">02</div>
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-zinc-900">Momentos e Memórias</h3>
                  <p className="text-zinc-600 leading-relaxed">
                    Para quem quer eternizar uma história de família, um encontro especial ou simplesmente ter uma trilha que seja a sua cara. Transformamos suas memórias em uma composição que você vai querer ouvir para sempre.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 md:gap-8">
                <div className="w-12 h-12 rounded-full bg-zinc-200 flex items-center justify-center font-mono text-sm font-bold flex-shrink-0 text-zinc-900">03</div>
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-zinc-900">Marcas e Empresas</h3>
                  <p className="text-zinc-600 leading-relaxed">
                    Jingles comerciais que grudam na cabeça do seu cliente. Trilhas para anúncios de Facebook/Instagram Ads que convertem mais porque soam profissionais e exclusivas.
                  </p>
                </div>
              </div>

            </div>

            {/* Right: Image & Warning */}
            <div className="flex flex-col gap-8">
              <div className="rounded-3xl overflow-hidden bg-black aspect-[4/3] relative">
                <img src="https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=1000&auto=format&fit=crop" alt="Studio Production" className="w-full h-full object-cover opacity-90" />
                
                {/* Floating Tags over image */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-3rem)] bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-xl h-48">
                  <div className="text-[10px] font-bold tracking-widest uppercase text-zinc-500 mb-4">Estilos mais pedidos</div>
                  <div className="overflow-x-auto no-scrollbar">
                    <div className="flex flex-col gap-2 w-max">
                      <div className="flex gap-2">
                        <span className="px-4 py-2 bg-brand-neon text-black rounded-full text-xs font-bold whitespace-nowrap">Sertanejo</span>
                        <span className="px-4 py-2 bg-black text-white rounded-full text-xs font-bold whitespace-nowrap">Funk</span>
                        <span className="px-4 py-2 bg-black text-white rounded-full text-xs font-bold whitespace-nowrap">Pop</span>
                        <span className="px-4 py-2 bg-black text-white rounded-full text-xs font-bold whitespace-nowrap">Gospel</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="px-4 py-2 bg-black text-white rounded-full text-xs font-bold whitespace-nowrap">Pagode</span>
                        <span className="px-4 py-2 bg-black text-white rounded-full text-xs font-bold whitespace-nowrap">Trap</span>
                        <span className="px-4 py-2 bg-black text-white rounded-full text-xs font-bold whitespace-nowrap">MPB</span>
                        <span className="px-4 py-2 bg-black text-white rounded-full text-xs font-bold whitespace-nowrap">Blues</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="px-4 py-2 bg-black text-white rounded-full text-xs font-bold whitespace-nowrap">Rock</span>
                        <span className="px-4 py-2 bg-black text-white rounded-full text-xs font-bold whitespace-nowrap">Rap</span>
                        <span className="px-4 py-2 bg-black text-white rounded-full text-xs font-bold whitespace-nowrap">Forró</span>
                        <span className="px-4 py-2 bg-black text-white rounded-full text-xs font-bold whitespace-nowrap">Jazz</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Warning Box */}
              <div className="bg-white border border-zinc-200 rounded-3xl p-8 shadow-sm">
                <div className="text-[10px] font-bold tracking-widest uppercase text-zinc-500 mb-4">Atenção</div>
                <p className="text-zinc-700 text-sm leading-relaxed">
                  <strong className="text-zinc-900">Esse serviço NÃO é para você</strong> se busca atalhos de baixa qualidade ou áudios genéricos. Aqui nós entregamos música de verdade, com estrutura profissional, pronta para o mercado.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Section: Testimonials Carousel */}
      <section className="pt-12 pb-8 md:pt-16 md:pb-12 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-12">
          <div className="text-[10px] font-bold tracking-widest uppercase text-brand-neon mb-6">Depoimentos</div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium leading-tight text-white mb-4">
            Histórias que ganharam <br className="hidden md:block" />
            <span className="text-brand-neon font-bold">sua própria trilha</span>
          </h2>
        </div>

        <div className="relative">
          <div 
            ref={carouselContainerRef}
            className="flex gap-6 overflow-x-auto pb-12 px-[calc(50vw-140px)] md:px-[calc(50vw-200px)] snap-x snap-mandatory no-scrollbar"
          >
            {INFINITE_IMAGES.map((src, i) => (
              <TestimonialCard 
                key={i} 
                src={src} 
                containerRef={carouselContainerRef} 
              />
            ))}
          </div>
          
          {/* Hint */}
          <div className="mt-4 flex justify-center items-center gap-4">
            <div className="w-12 h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-brand-neon"
                animate={{ x: [-20, 20, -20] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
            <span className="text-[10px] font-bold tracking-widest uppercase text-text-gray">Arraste para explorar</span>
          </div>
        </div>
      </section>

      {/* Section 4: Form */}
      <section id="preco" className="pt-12 pb-16 md:pt-16 md:pb-24 px-6 md:px-12 max-w-[1400px] mx-auto text-center">
        <div className="mb-16">
          <div className="text-[10px] font-bold tracking-widest uppercase text-brand-neon mb-6">Começar</div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium leading-tight mb-6">
            Preencha do seu gosto, <br className="hidden md:block" />
            <span className="text-brand-neon italic">música sob medida</span>
          </h2>
          <p className="text-text-gray max-w-2xl mx-auto">
            Estamos prontos para transformar sua ideia em realidade. Siga as etapas do formulário para que nossa equipe entenda exatamente o que você busca.
          </p>
        </div>

        {/* Form Card */}
        <div className="max-w-md mx-auto bg-dark-card border border-border-dark rounded-[3rem] p-10 md:p-12 relative overflow-hidden">
          {/* Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-brand-neon/5 blur-[50px] rounded-full pointer-events-none"></div>
          
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-6 text-white">Pronto para começar?</h3>
            <p className="text-text-gray text-sm mb-10">
              Ao clicar abaixo, você será redirecionado para o nosso formulário oficial de pedidos.
            </p>
            
            <a href="/f/musica" className="relative overflow-hidden block w-full bg-brand-neon text-black px-6 py-4 rounded-full font-bold text-sm md:text-base hover:bg-brand-neon-hover transition-colors mb-6 shadow-[0_0_30px_rgba(212,255,0,0.2)] group text-center">
              <span className="relative z-10">Criar Música</span>
              <div className="absolute top-0 h-full w-full z-0 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/90 to-transparent animate-shine" />
            </a>
            
            <div className="flex items-center justify-center gap-3 text-sm text-text-gray">
              <span>Responda todas as etapas <br /> e garanta qualidade para <br /> sua faixa músical.</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer ref={footerRef} className="border-t border-border-dark pt-8 md:pt-10 pb-8 px-6 md:px-12 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-8 md:mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center -ml-4 md:-ml-6 lg:-ml-8 mb-2 md:mb-4">
              <img 
                src="https://res.cloudinary.com/dxbgfje1t/image/upload/f_auto,q_auto/logo_-_moreira_1_denxi8" 
                alt="CantaJá Logo" 
                className="w-[180px] md:w-[240px] lg:w-[280px] h-auto object-contain object-left"
                referrerPolicy="no-referrer"
              />
            </div>
            <p className="text-text-gray text-sm max-w-sm leading-relaxed">
              A plataforma definitiva para quem quer transformar ideias em músicas originais com qualidade de estúdio e 100% dos direitos autorais.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-xs tracking-widest uppercase text-white/50 mb-4 md:mb-6">Links</h4>
            <ul className="space-y-3 text-sm text-text-gray">
              <li><a href="https://www.instagram.com/cantaja/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a></li>
              <li><span className="cursor-default">Comunidade</span></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-xs tracking-widest uppercase text-white/50 mb-4 md:mb-6">Legal</h4>
            <ul className="space-y-3 text-sm text-text-gray">
              <li>
                <button 
                  onClick={() => setIsTermsModalOpen(true)} 
                  className="hover:text-white transition-colors text-left"
                >
                  Termos de Uso
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setIsPrivacyModalOpen(true)} 
                  className="hover:text-white transition-colors text-left"
                >
                  Política de Privacidade
                </button>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-border-dark flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs text-text-gray">
          <div className="space-y-2">
            <p className="font-medium text-white/90">
              © 2026 KaaGabriell. Todos os direitos reservados.
            </p>
            <div className="text-text-gray/80 text-[11px] leading-relaxed">
              <p>Razão social: 56.253.940 KAUA HENRIQUE SOUZA GABRIEL</p>
              <p>CNPJ: 56.253.940/0001-47</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Modal: Política de Privacidade */}
      {isPrivacyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-dark-card border border-border-dark rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-border-dark bg-zinc-900/50">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-brand-neon" />
                Política de Privacidade
              </h3>
              <button 
                onClick={() => setIsPrivacyModalOpen(false)}
                className="text-text-gray hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors"
                aria-label="Fechar"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-6 text-sm text-text-gray leading-relaxed">
              <div className="p-4 bg-zinc-900/80 rounded-xl border border-border-dark text-white/90">
                <p className="font-medium">
                  Este site e seus serviços são operados por 56.253.940 KAUA HENRIQUE SOUZA GABRIEL, inscrita no CNPJ sob o nº 56.253.940/0001-47.
                </p>
              </div>

              <section className="space-y-2">
                <h4 className="text-white font-semibold text-base">1. Informações Gerais</h4>
                <p>
                  A sua privacidade é de extrema importância para nós. Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos os seus dados pessoais ao utilizar nossa plataforma, serviços e formulários online, em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="text-white font-semibold text-base">2. Coleta de Dados</h4>
                <p>
                  Coletamos informações que você nos fornece diretamente ao preencher formulários de briefing, criar pedidos e interagir com nossos serviços, tais como: nome, e-mail, telefone/WhatsApp, preferências musicais, histórias e detalhes fornecidos para a composição das faixas.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="text-white font-semibold text-base">3. Uso das Informações</h4>
                <p>
                  Os dados coletados são utilizados exclusivamente para:
                </p>
                <ul className="list-disc list-inside space-y-1 pl-2">
                  <li>Criação, produção e personalização das músicas solicitadas;</li>
                  <li>Comunicação sobre o status da produção e envio dos arquivos finais;</li>
                  <li>Atendimento ao cliente e suporte técnico;</li>
                  <li>Cumprimento de obrigações legais e regulatórias.</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h4 className="text-white font-semibold text-base">4. Segurança e Armazenamento</h4>
                <p>
                  Adotamos medidas técnicas e organizacionais adequadas para proteger seus dados contra acessos não autorizados, destruição, perda ou alteração acidental. Seus dados não são comercializados ou compartilhados com terceiros para fins publicitários.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="text-white font-semibold text-base">5. Seus Direitos</h4>
                <p>
                  Você tem o direito de solicitar a confirmação da existência de tratamento, o acesso, a correção de dados incompletos ou a exclusão de seus dados pessoais a qualquer momento, entrando em contato conosco através dos nossos canais de atendimento.
                </p>
              </section>

              <div className="pt-4 border-t border-border-dark text-xs text-text-gray/70">
                Última atualização: 2026.
              </div>
            </div>

            <div className="p-4 border-t border-border-dark bg-zinc-900/50 flex justify-end">
              <button 
                onClick={() => setIsPrivacyModalOpen(false)}
                className="bg-white text-black px-6 py-2 rounded-full font-bold text-sm hover:bg-gray-200 transition-colors"
              >
                Entendi e Concordo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Termos de Uso */}
      {isTermsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-dark-card border border-border-dark rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-border-dark bg-zinc-900/50">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Shield className="w-5 h-5 text-brand-neon" />
                Termos de Uso
              </h3>
              <button 
                onClick={() => setIsTermsModalOpen(false)}
                className="text-text-gray hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors"
                aria-label="Fechar"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-6 text-sm text-text-gray leading-relaxed">
              <div className="p-4 bg-zinc-900/80 rounded-xl border border-border-dark text-white/90">
                <p className="font-medium">
                  Estes termos regem o uso dos serviços fornecidos por 56.253.940 KAUA HENRIQUE SOUZA GABRIEL, CNPJ nº 56.253.940/0001-47.
                </p>
              </div>

              <section className="space-y-2">
                <h4 className="text-white font-semibold text-base">1. Aceitação dos Termos</h4>
                <p>
                  Ao acessar nossa plataforma e solicitar a criação de faixas musicais personalizadas, você concorda expressamente com todos os termos e condições aqui estabelecidos.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="text-white font-semibold text-base">2. Serviços e Direitos Autorais</h4>
                <p>
                  Oferecemos produção de músicas personalizadas sob demanda com base nas informações enviadas pelo cliente. As faixas entregues com cessão de direitos conferem ao comprador o direito de uso pessoal e comercial conforme o plano contratado.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="text-white font-semibold text-base">3. Responsabilidades do Usuário</h4>
                <p>
                  O usuário garante que todas as informações e materiais fornecidos para a criação da música não violam direitos de terceiros, marcas registradas ou leis vigentes.
                </p>
              </section>
            </div>

            <div className="p-4 border-t border-border-dark bg-zinc-900/50 flex justify-end">
              <button 
                onClick={() => setIsTermsModalOpen(false)}
                className="bg-white text-black px-6 py-2 rounded-full font-bold text-sm hover:bg-gray-200 transition-colors"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
