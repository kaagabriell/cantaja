import { Link } from "react-router-dom";

export function MetaFooter() {
  return (
    <footer className="border-t border-white/10 pt-12 pb-10 px-6 md:px-12 max-w-[1400px] mx-auto bg-[#050505] text-white">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-10">
        {/* Brand Col */}
        <div className="md:col-span-2 space-y-4">
          <Link to="/threads-autopilot" className="inline-block" aria-label="Página inicial do Threads Autopilot">
            <img 
              src="https://res.cloudinary.com/dxbgfje1t/image/upload/f_auto,q_auto/logo_-_moreira_1_denxi8" 
              alt="CantaJá Logo" 
              className="w-[160px] md:w-[200px] h-auto object-contain object-left"
              referrerPolicy="no-referrer"
            />
          </Link>
          <p className="text-[#A1A1AA] text-sm max-w-md leading-relaxed">
            Threads Autopilot é uma ferramenta interna de automação e resposta contextual desenvolvida e operada pela KaaGabriell exclusivamente para seu perfil próprio no Threads.
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-[#A1A1AA]">
            <span className="w-2 h-2 rounded-full bg-brand-neon inline-block"></span>
            Operação e desenvolvimento interno
          </div>
        </div>

        {/* Links Navigation */}
        <div>
          <h4 className="font-bold text-xs tracking-widest uppercase text-white/50 mb-4">Navegação</h4>
          <ul className="space-y-2.5 text-sm text-[#A1A1AA]">
            <li>
              <Link to="/" className="hover:text-white transition-colors duration-200">
                CantaJa (Site Oficial)
              </Link>
            </li>
            <li>
              <Link to="/threads-autopilot" className="hover:text-white transition-colors duration-200">
                Threads Autopilot
              </Link>
            </li>
            <li>
              <a href="https://www.instagram.com/cantaja/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200">
                Instagram Oficial
              </a>
            </li>
          </ul>
        </div>

        {/* Legal & Compliance */}
        <div>
          <h4 className="font-bold text-xs tracking-widest uppercase text-white/50 mb-4">Conformidade & Legal</h4>
          <ul className="space-y-2.5 text-sm text-[#A1A1AA]">
            <li>
              <Link to="/threads-autopilot/privacidade" className="hover:text-white transition-colors duration-200">
                Privacidade do Threads Autopilot
              </Link>
            </li>
            <li>
              <Link to="/threads-autopilot/termos-de-uso" className="hover:text-white transition-colors duration-200">
                Termos de Uso
              </Link>
            </li>
            <li>
              <Link to="/threads-autopilot/exclusao-de-dados" className="hover:text-white transition-colors duration-200">
                Exclusão de Dados & Revogação
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Legal Identification */}
      <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs text-[#A1A1AA]">
        <div className="space-y-1.5">
          <p className="font-medium text-white/90">
            © 2026 KaaGabriell. Todos os direitos reservados.
          </p>
          <div className="text-[#A1A1AA]/80 text-[11px] leading-relaxed space-y-0.5">
            <p><strong>Nome empresarial:</strong> 56.253.940 KAUA HENRIQUE SOUZA GABRIEL</p>
            <p><strong>CNPJ:</strong> 56.253.940/0001-47 | <strong>País:</strong> Brasil</p>
          </div>
        </div>
        
        <div className="text-left md:text-right text-[11px] text-[#A1A1AA]/70">
          <p>Aplicação em conformidade com as Políticas de Plataforma da Meta</p>
          <p>Uso estritamente interno e autorizado</p>
        </div>
      </div>
    </footer>
  );
}
