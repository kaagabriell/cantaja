import { Link } from "react-router-dom";
import { ArrowLeft, Trash2, ShieldAlert, KeyRound, CheckCircle2, AlertTriangle, FileText, Info } from "lucide-react";
import { MetaHeader } from "../../components/threads-autopilot/MetaHeader";
import { MetaFooter } from "../../components/threads-autopilot/MetaFooter";
import { SEOHead } from "../../components/threads-autopilot/SEOHead";

export default function ThreadsDeletionPage() {
  const revocationSteps = [
    "Abrir o aplicativo ou versão web do Threads.",
    "Acessar o menu de Configurações no seu perfil.",
    "Abrir Mais configurações e depois selecionar Permissões do site.",
    "Abrir a seção Apps e sites.",
    "Localizar o aplicativo Threads Autopilot na aba de aplicativos ativos.",
    "Clicar em Remover ou Revogar o acesso."
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-brand-neon selection:text-black overflow-x-hidden flex flex-col justify-between">
      <SEOHead 
        title="Exclusão de dados | Threads Autopilot"
        description="Instruções para revogar o acesso e solicitar a exclusão de dados do Threads Autopilot."
        canonical="https://cantaja.com.br/threads-autopilot/exclusao-de-dados"
      />

      <MetaHeader showNavLinks={false} />

      <main className="flex-grow py-12 md:py-20 px-6 md:px-12 max-w-[1000px] mx-auto w-full">
        {/* Navigation Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-xs md:text-sm text-[#A1A1AA]">
          <Link to="/threads-autopilot" className="hover:text-white flex items-center gap-1">
            <ArrowLeft className="w-4 h-4 text-brand-neon" aria-hidden="true" />
            Threads Autopilot
          </Link>
          <span>/</span>
          <span className="text-white">Exclusão de Dados</span>
        </div>

        {/* Page Header */}
        <div className="space-y-4 mb-12 pb-8 border-b border-white/10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-semibold tracking-wider text-brand-neon uppercase">
            <Trash2 className="w-4 h-4 text-brand-neon" aria-hidden="true" />
            DIRETRIZES DE EXCLUSÃO E REVOGAÇÃO
          </div>
          <h1 className="text-3xl sm:text-5xl font-medium tracking-tight text-white leading-tight">
            Revogação e exclusão de dados do Threads Autopilot
          </h1>
          <p className="text-sm text-[#A1A1AA]">
            Última atualização: 23 de agosto de 2026 | Versão 1.0
          </p>
          <p className="text-base sm:text-lg text-[#A1A1AA] leading-relaxed max-w-3xl pt-2">
            Em total conformidade com a Lei Geral de Proteção de Dados (LGPD) e com as Políticas de Plataforma e Termos de Desenvolvedor da Meta, disponibilizamos mecanismos simples e diretos para que o titular do perfil conectado possa revogar permissões e solicitar a exclusão integral de seus dados.
          </p>
        </div>

        {/* Content Blocks */}
        <div className="space-y-12 text-[#A1A1AA] leading-relaxed">
          
          {/* Option 1: Direct Meta/Threads Revocation */}
          <section className="bg-[#111111] border border-white/10 rounded-[32px] p-8 md:p-10 space-y-6">
            <div className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-xl bg-brand-neon/15 text-brand-neon flex items-center justify-center font-bold text-sm">
                01
              </span>
              <div>
                <h2 className="text-xl md:text-2xl font-semibold text-white">
                  Revogar acesso pelo Threads / Meta
                </h2>
                <p className="text-xs sm:text-sm text-[#A1A1AA]">Ação imediata executada diretamente no seu painel de controle</p>
              </div>
            </div>

            <p className="text-sm md:text-base">
              Você pode revogar instantaneamente a autorização concedida ao Threads Autopilot a qualquer momento seguindo o passo a passo abaixo:
            </p>

            <div className="space-y-3 pt-2">
              {revocationSteps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3.5 bg-[#1A1A1A] p-4 rounded-2xl border border-white/5 text-sm text-white/90">
                  <span className="w-6 h-6 rounded-full bg-white/10 text-white font-mono text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </div>
              ))}
            </div>

            <div className="bg-white/5 rounded-2xl p-4 flex items-start gap-3 text-xs text-[#A1A1AA]">
              <Info className="w-4 h-4 text-brand-neon flex-shrink-0 mt-0.5" aria-hidden="true" />
              <span>
                Assim que o acesso for revogado, todos os tokens de acesso associados à sua conta deixam de ter validade imediatamente, bloqueando qualquer ação futura da integração.
              </span>
            </div>
          </section>

          {/* Option 2: Request Full Data Deletion */}
          <section className="bg-[#111111] border border-white/10 rounded-[32px] p-8 md:p-10 space-y-6">
            <div className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-xl bg-brand-neon/15 text-brand-neon flex items-center justify-center font-bold text-sm">
                02
              </span>
              <div>
                <h2 className="text-xl md:text-2xl font-semibold text-white">
                  Solicitar exclusão definitiva de dados
                </h2>
                <p className="text-xs sm:text-sm text-[#A1A1AA]">Remoção manual e purgação de registros operacionais</p>
              </div>
            </div>

            <p className="text-sm md:text-base">
              Caso deseje que os registros operacionais, identificadores de postagens e dados associados sejam purgados antes do prazo padrão de retenção de 30 dias, você pode solicitar a exclusão formal:
            </p>

            <div className="space-y-4 bg-[#1A1A1A] p-6 rounded-2xl border border-white/5 text-sm">
              <h3 className="font-semibold text-white text-base">Instruções para o Titular:</h3>
              <p className="text-[#A1A1AA] leading-relaxed">
                Envie uma solicitação para <a href="mailto:kauabrgamer900@gmail.com" className="text-brand-neon font-semibold hover:underline">kauabrgamer900@gmail.com</a> com o assunto <strong>“Exclusão de Dados do Threads Autopilot”</strong>. Informe o <strong>nome de usuário (@username)</strong> do perfil do Threads conectado. A titularidade será verificada antes da exclusão para impedir solicitações indevidas.
              </p>

              <div className="pt-2">
                <a
                  href="mailto:kauabrgamer900@gmail.com?subject=Exclusão%20de%20Dados%20do%20Threads%20Autopilot"
                  className="inline-flex items-center justify-center bg-brand-neon text-black px-6 py-3 rounded-full font-bold text-xs sm:text-sm hover:bg-brand-neon-hover transition-colors shadow-[0_0_20px_rgba(212,255,0,0.15)] min-h-[44px]"
                >
                  Solicitar exclusão por e-mail
                </a>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <h3 className="font-semibold text-white">Como processamos a solicitação:</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-neon flex-shrink-0 mt-1" aria-hidden="true" />
                  <span><strong>Verificação de titularidade:</strong> A solicitação será verificada para evitar qualquer exclusão não autorizada ou indevida.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-neon flex-shrink-0 mt-1" aria-hidden="true" />
                  <span><strong>Exclusão e anonimização:</strong> Após a confirmação, os tokens de acesso, identificadores operacionais e trechos em cache serão excluídos definitivamente ou anonimizados pelo responsável pelo tratamento em até 5 dias úteis, ressalvadas eventuais obrigações legais de guarda.</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
              <span className="text-[#A1A1AA]">
                Canal de contato: <a href="mailto:kauabrgamer900@gmail.com" className="text-white hover:text-brand-neon underline underline-offset-2 font-medium">kauabrgamer900@gmail.com</a>
              </span>
              <Link to="/threads-autopilot/privacidade" className="text-brand-neon hover:underline">
                Ler Política de Privacidade completa →
              </Link>
            </div>
          </section>

          {/* Legal Identity Reminder */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-xs text-[#A1A1AA] space-y-1.5">
            <p><strong>Controlador dos Dados:</strong> 56.253.940 KAUA HENRIQUE SOUZA GABRIEL</p>
            <p><strong>CNPJ:</strong> 56.253.940/0001-47 | <strong>País:</strong> Brasil</p>
            <p><strong>E-mail oficial:</strong> <a href="mailto:kauabrgamer900@gmail.com" className="text-brand-neon hover:underline">kauabrgamer900@gmail.com</a></p>
            <p><strong>Aplicação:</strong> Threads Autopilot (Ferramenta interna de desenvolvimento e operação institucional)</p>
          </div>

        </div>
      </main>

      <MetaFooter />
    </div>
  );
}
