import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ArrowLeft } from "lucide-react";

interface MetaHeaderProps {
  showNavLinks?: boolean;
}

export function MetaHeader({ showNavLinks = true }: MetaHeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isMainPage = location.pathname === "/threads-autopilot";

  const navLinks = [
    { label: "Visão geral", href: "#visao-geral" },
    { label: "Como funciona", href: "#como-funciona" },
    { label: "Permissões", href: "#permissoes" },
    { label: "Privacidade", href: "#privacidade" },
    { label: "Responsável", href: "#responsavel" }
  ];

  return (
    <header className="sticky top-0 w-full bg-[#050505]/90 backdrop-blur-md h-20 md:h-24 z-50 border-b border-white/10">
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 h-full flex items-center justify-between">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <Link 
            to="/threads-autopilot" 
            className="flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-neon rounded-lg"
            aria-label="Threads Autopilot - Início"
          >
            <img 
              src="https://res.cloudinary.com/dxbgfje1t/image/upload/f_auto,q_auto/logo_-_moreira_1_denxi8" 
              alt="CantaJá Logo" 
              className="w-[140px] md:w-[180px] h-auto object-contain object-left"
              referrerPolicy="no-referrer"
            />
            <span className="hidden sm:inline-block text-xs font-semibold px-2.5 py-1 rounded-full bg-white/10 text-white/80 border border-white/10 tracking-wide uppercase">
              Threads Autopilot
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        {showNavLinks && isMainPage && (
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-[#A1A1AA]" aria-label="Navegação da página">
            {navLinks.map((link) => (
              <a 
                key={link.label}
                href={link.href} 
                className="hover:text-white transition-colors duration-200 focus:outline-none focus-visible:text-brand-neon"
              >
                {link.label}
              </a>
            ))}
          </nav>
        )}

        {/* Desktop CTA */}
        <div className="hidden sm:flex items-center gap-4">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white border border-white/15 px-5 py-2.5 rounded-full font-semibold text-xs md:text-sm transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-neon"
          >
            <ArrowLeft className="w-4 h-4 text-brand-neon" aria-hidden="true" />
            Voltar para CantaJa
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 text-[#A1A1AA] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-neon rounded-lg min-w-[44px] min-h-[44px] flex items-center justify-center"
          aria-label={isMobileMenuOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#0a0a0a] border-b border-white/10 px-6 py-6 space-y-4 shadow-2xl animate-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-brand-neon/10 text-brand-neon border border-brand-neon/20 uppercase tracking-wide">
              Ferramenta Interna
            </span>
          </div>

          {showNavLinks && isMainPage && (
            <nav className="flex flex-col space-y-3 pt-1" aria-label="Navegação móvel">
              {navLinks.map((link) => (
                <a 
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-base font-medium text-[#A1A1AA] hover:text-white py-2 transition-colors duration-200 focus:outline-none focus-visible:text-brand-neon"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          )}

          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            <Link 
              to="/threads-autopilot/privacidade"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-sm font-medium text-[#A1A1AA] hover:text-white py-1.5"
            >
              Política de Privacidade
            </Link>
            <Link 
              to="/threads-autopilot/exclusao-de-dados"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-sm font-medium text-[#A1A1AA] hover:text-white py-1.5"
            >
              Exclusão de Dados
            </Link>
            <Link 
              to="/" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-2 w-full inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white border border-white/15 px-5 py-3 rounded-full font-semibold text-sm transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4 text-brand-neon" aria-hidden="true" />
              Voltar para CantaJa
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
