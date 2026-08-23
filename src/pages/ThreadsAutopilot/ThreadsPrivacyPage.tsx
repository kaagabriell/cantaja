import { Link } from "react-router-dom";
import { ArrowLeft, Shield, ShieldCheck, Lock, Clock, FileText, CheckCircle2, AlertCircle } from "lucide-react";
import { MetaHeader } from "../../components/threads-autopilot/MetaHeader";
import { MetaFooter } from "../../components/threads-autopilot/MetaFooter";
import { SEOHead } from "../../components/threads-autopilot/SEOHead";

export default function ThreadsPrivacyPage() {
  const sections = [
    { id: "controlador", title: "1. Identificação do Controlador" },
    { id: "escopo", title: "2. Escopo da Integração" },
    { id: "dados", title: "3. Dados Processados e Dados Não Coletados" },
    { id: "finalidades", title: "4. Finalidades do Tratamento" },
    { id: "base-legal", title: "5. Base e Autorização do Titular" },
    { id: "seguranca", title: "6. Armazenamento e Segurança" },
    { id: "retencao", title: "7. Prazos de Retenção de Dados" },
    { id: "compartilhamento", title: "8. Compartilhamento e Não Comercialização" },
    { id: "direitos", title: "9. Revogação, Exclusão e Direitos do Titular" },
    { id: "alteracoes", title: "10. Alterações desta Política" },
    { id: "contato", title: "11. Canal de Contato" },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-brand-neon selection:text-black overflow-x-hidden flex flex-col justify-between">
      <SEOHead 
        title="Privacidade | Threads Autopilot"
        description="Saiba quais dados o Threads Autopilot processa, para quais finalidades e como o titular mantém o controle."
        canonical="https://cantaja.com.br/threads-autopilot/privacidade"
      />

      <MetaHeader showNavLinks={false} />

      <main className="flex-grow py-12 md:py-20 px-6 md:px-12 max-w-[1200px] mx-auto w-full">
        {/* Navigation Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-xs md:text-sm text-[#A1A1AA]">
          <Link to="/threads-autopilot" className="hover:text-white flex items-center gap-1">
            <ArrowLeft className="w-4 h-4 text-brand-neon" aria-hidden="true" />
            Threads Autopilot
          </Link>
          <span>/</span>
          <span className="text-white">Política de Privacidade</span>
        </div>

        {/* Page Header */}
        <div className="space-y-4 mb-12 pb-8 border-b border-white/10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-semibold tracking-wider text-brand-neon uppercase">
            <ShieldCheck className="w-4 h-4 text-brand-neon" aria-hidden="true" />
            CONFORMIDADE LGPD & META API
          </div>
          <h1 className="text-3xl sm:text-5xl font-medium tracking-tight text-white leading-tight">
            Política de Privacidade do Threads Autopilot
          </h1>
          <p className="text-sm text-[#A1A1AA]">
            Última atualização: 2026 | Versão 1.0 (Específica para a integração Threads)
          </p>
        </div>

        {/* Layout with Index / Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Sticky Table of Contents (Desktop) */}
          <aside className="lg:col-span-4 hidden lg:block">
            <div className="sticky top-28 bg-[#111111] border border-white/10 rounded-3xl p-6 space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-white/60">Índice da Política</h2>
              <nav className="space-y-1.5 text-xs">
                {sections.map((sec) => (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    className="block py-1.5 px-3 rounded-lg text-[#A1A1AA] hover:text-white hover:bg-white/5 transition-colors leading-snug"
                  >
                    {sec.title}
                  </a>
                ))}
              </nav>
              <div className="pt-4 border-t border-white/10 text-[11px] text-[#A1A1AA]">
                <Link to="/threads-autopilot/exclusao-de-dados" className="text-brand-neon hover:underline flex items-center gap-1">
                  Ver instruções de exclusão de dados →
                </Link>
              </div>
            </div>
          </aside>

          {/* Main Legal Content */}
          <div className="lg:col-span-8 space-y-12 text-[#A1A1AA] leading-relaxed text-sm md:text-base">
            
            {/* Sec 1 */}
            <section id="controlador" className="space-y-4 scroll-mt-28">
              <h2 className="text-xl md:text-2xl font-semibold text-white">1. Identificação do Controlador</h2>
              <p>
                Esta Política de Privacidade aplica-se exclusivamente ao aplicativo interno <strong>Threads Autopilot</strong>, desenvolvido e operado pela pessoa jurídica:
              </p>
              <div className="bg-[#111111] border border-white/10 rounded-2xl p-5 space-y-1 text-sm text-white/90">
                <p><strong>Razão Social / Nome Empresarial:</strong> 56.253.940 KAUA HENRIQUE SOUZA GABRIEL</p>
                <p><strong>Nome Fantasia / Marca:</strong> KaaGabriell / CantaJa</p>
                <p><strong>CNPJ:</strong> 56.253.940/0001-47</p>
                <p><strong>País:</strong> Brasil</p>
                <p><strong>Site Oficial:</strong> <a href="https://cantaja.com.br" className="text-brand-neon hover:underline">https://cantaja.com.br</a></p>
              </div>
            </section>

            {/* Sec 2 */}
            <section id="escopo" className="space-y-4 scroll-mt-28">
              <h2 className="text-xl md:text-2xl font-semibold text-white">2. Escopo da Integração</h2>
              <p>
                O Threads Autopilot é uma ferramenta de automação e auxílio operacional de uso <strong>estritamente interno</strong>, projetada para otimizar o planejamento de publicações, a localização de conversas públicas e o envio de respostas contextuais no perfil próprio da empresa no Threads.
              </p>
              <p>
                O aplicativo <strong>não é comercializado como SaaS público</strong>, não gerencia contas de terceiros, nem oferece recursos para gestão de perfis de clientes.
              </p>
            </section>

            {/* Sec 3 */}
            <section id="dados" className="space-y-4 scroll-mt-28">
              <h2 className="text-xl md:text-2xl font-semibold text-white">3. Dados Processados e Dados Não Coletados</h2>
              <p>
                Em estrita observância ao princípio da necessidade e da minimização de dados (LGPD, Art. 6º, III), a integração processa apenas:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-2">
                <li><strong>Identificação do perfil autorizado:</strong> identificador único (ID), nome de usuário e foto pública do perfil conectado.</li>
                <li><strong>Conteúdo próprio gerado:</strong> identificadores e textos das publicações e respostas agendadas ou publicadas pelo próprio perfil.</li>
                <li><strong>Conteúdo público encontrado:</strong> identificadores e trechos de textos de publicações públicas no Threads retornadas por busca de palavras-chave públicas, utilizados exclusivamente para avaliar relevância de tema.</li>
                <li><strong>Registros operacionais:</strong> carimbo de data/hora (timestamp), status de execução de postagens e identificadores de tarefas para auditoria e controle de duplicidade.</li>
              </ul>

              <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-5 space-y-2 mt-4 text-white/90 text-sm">
                <h3 className="font-semibold text-white flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-400" aria-hidden="true" />
                  O que NUNCA é coletado ou acessado:
                </h3>
                <ul className="list-disc list-inside space-y-1 text-[#A1A1AA]">
                  <li>Senhas ou credenciais de login do Threads.</li>
                  <li>Mensagens privadas, diretas (DMs) ou caixas de entrada.</li>
                  <li>Conteúdo de perfis privados ou publicações não públicas.</li>
                  <li>Contas ou dados pessoais de clientes da empresa.</li>
                </ul>
              </div>
            </section>

            {/* Sec 4 */}
            <section id="finalidades" className="space-y-4 scroll-mt-28">
              <h2 className="text-xl md:text-2xl font-semibold text-white">4. Finalidades do Tratamento</h2>
              <p>Os dados tratados possuem as seguintes finalidades exclusivas e legítimas:</p>
              <ul className="list-disc list-inside space-y-2 pl-2">
                <li><strong>Publicação de conteúdo:</strong> viabilizar o agendamento e a publicação de textos no perfil autorizado da KaaGabriell.</li>
                <li><strong>Pesquisa de palavras-chave:</strong> monitorar menções e tópicos públicos relevantes relacionados aos serviços de desenvolvimento web, aplicativos, marketing, tráfego pago e negócios digitais.</li>
                <li><strong>Interação contextual:</strong> formular e publicar respostas concisas e pertinentes a conversas públicas públicas encontradas.</li>
                <li><strong>Prevenção de spam e duplicidade:</strong> manter histórico temporário para garantir que respostas não sejam repetidas para o mesmo post público.</li>
              </ul>
            </section>

            {/* Sec 5 */}
            <section id="base-legal" className="space-y-4 scroll-mt-28">
              <h2 className="text-xl md:text-2xl font-semibold text-white">5. Base e Autorização do Titular</h2>
              <p>
                O tratamento de dados é fundamentado no <strong>consentimento expresso e autorização</strong> concedida pelo administrador do perfil no momento da autenticação via Meta OAuth, bem como no <strong>legítimo interesse</strong> da empresa para gerenciar sua presença digital institucional (Art. 7º, I e IX da Lei Geral de Proteção de Dados - Lei 13.709/2018).
              </p>
            </section>

            {/* Sec 6 */}
            <section id="seguranca" className="space-y-4 scroll-mt-28">
              <h2 className="text-xl md:text-2xl font-semibold text-white">6. Armazenamento e Segurança</h2>
              <p>
                A segurança dos dados é assegurada por padrões rigorosos da indústria:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-2">
                <li>Tokens de acesso OAuth são armazenados exclusivamente como segredos criptografados em variáveis de ambiente e cofres seguros no lado do servidor.</li>
                <li>Nenhuma credencial ou token é trafegado ou exposto ao navegador do usuário ou no código front-end público.</li>
                <li>Comunicação segura exclusivamente através de HTTPS com TLS moderno.</li>
                <li>Acesso aos sistemas restrito unicamente ao administrador autorizado.</li>
              </ul>
            </section>

            {/* Sec 7 */}
            <section id="retencao" className="space-y-4 scroll-mt-28">
              <h2 className="text-xl md:text-2xl font-semibold text-white">7. Prazos de Retenção de Dados</h2>
              <p>
                Estabelecemos períodos curtos e bem definidos de retenção de dados:
              </p>
              <div className="bg-[#111111] border border-white/10 rounded-2xl overflow-hidden mt-3">
                <table className="w-full text-left text-sm" aria-label="Tabela de prazos de retenção">
                  <thead>
                    <tr className="border-b border-white/10 text-xs text-white/50 uppercase">
                      <th className="p-4">Tipo de Dado</th>
                      <th className="p-4">Prazo Máximo de Retenção</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10 text-xs sm:text-sm">
                    <tr>
                      <td className="p-4 text-white font-medium">Trechos públicos de posts pesquisados e logs de tarefas</td>
                      <td className="p-4 text-brand-neon font-semibold">Até 30 dias</td>
                    </tr>
                    <tr>
                      <td className="p-4 text-white font-medium">Identificadores de posts e respostas criadas</td>
                      <td className="p-4 text-[#A1A1AA]">Enquanto a integração estiver ativa para auditoria</td>
                    </tr>
                    <tr>
                      <td className="p-4 text-white font-medium">Tokens de acesso OAuth</td>
                      <td className="p-4 text-[#A1A1AA]">Removidos imediatamente na revogação ou expiração</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Sec 8 */}
            <section id="compartilhamento" className="space-y-4 scroll-mt-28">
              <h2 className="text-xl md:text-2xl font-semibold text-white">8. Compartilhamento e Não Comercialização</h2>
              <p>
                <strong>Seus dados não são vendidos, alugados ou comercializados com anunciantes ou corretores de dados sob nenhuma hipótese.</strong>
              </p>
              <p>
                Os dados são transmitidos unicamente entre os servidores da Meta (Threads API) e a infraestrutura segura de hospedagem em nuvem estritamente necessária para executar o agendamento automatizado.
              </p>
            </section>

            {/* Sec 9 */}
            <section id="direitos" className="space-y-4 scroll-mt-28">
              <h2 className="text-xl md:text-2xl font-semibold text-white">9. Revogação, Exclusão e Direitos do Titular</h2>
              <p>
                Em conformidade com a LGPD e as Políticas de Plataforma da Meta, o titular do perfil conectado possui total controle sobre seus dados e pode exercer seus direitos:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-2">
                <li><strong>Revogação imediata de acesso:</strong> a qualquer momento, diretamente no aplicativo Threads / Meta (Configurações &gt; Mais configurações &gt; Permissões do site &gt; Apps e sites).</li>
                <li><strong>Exclusão definitiva de dados:</strong> mediante solicitação formal via canal de atendimento ou acionamento do fluxo documentado em nossa página de exclusão.</li>
              </ul>
              <div className="pt-2">
                <Link 
                  to="/threads-autopilot/exclusao-de-dados"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white border border-white/15 px-5 py-2.5 rounded-full font-semibold text-xs md:text-sm transition-colors"
                >
                  Consultar página de Exclusão de Dados →
                </Link>
              </div>
            </section>

            {/* Sec 10 */}
            <section id="alteracoes" className="space-y-4 scroll-mt-28">
              <h2 className="text-xl md:text-2xl font-semibold text-white">10. Alterações desta Política</h2>
              <p>
                Esta política poderá ser atualizada periodicamente para refletir aprimoramentos técnicos ou novas exigências regulatórias. Quaisquer alterações substanciais serão registradas nesta página com a respectiva data de atualização.
              </p>
            </section>

            {/* Sec 11 */}
            <section id="contato" className="space-y-4 scroll-mt-28">
              <h2 className="text-xl md:text-2xl font-semibold text-white">11. Canal de Contato</h2>
              <p>
                Para esclarecimentos sobre a privacidade do Threads Autopilot, o responsável pode entrar em contato através do canal oficial:
              </p>
              <div className="bg-[#111111] border border-white/10 rounded-2xl p-5 text-sm space-y-2">
                {/* TODO: confirmar canal público antes da análise da Meta */}
                <p><strong>Canal Oficial:</strong> Disponível no site oficial da CantaJa</p>
                <p><strong>Site:</strong> <a href="https://cantaja.com.br" className="text-brand-neon hover:underline">https://cantaja.com.br</a></p>
                <p><strong>Responsável pelo Tratamento:</strong> Kaua Henrique Souza Gabriel (KaaGabriell)</p>
              </div>
            </section>

          </div>
        </div>
      </main>

      <MetaFooter />
    </div>
  );
}
