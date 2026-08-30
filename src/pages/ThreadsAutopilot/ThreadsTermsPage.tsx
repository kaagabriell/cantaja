import { Link } from "react-router-dom";
import { ArrowLeft, FileText, ShieldCheck, UserCheck, Ban, Settings, Database, ExternalLink, Clock, Scale, Mail } from "lucide-react";
import { MetaHeader } from "../../components/threads-autopilot/MetaHeader";
import { MetaFooter } from "../../components/threads-autopilot/MetaFooter";
import { SEOHead } from "../../components/threads-autopilot/SEOHead";

const sections = [
  { id: "aceitacao", title: "1. Aceitação dos Termos" },
  { id: "servico", title: "2. Descrição do Serviço" },
  { id: "autorizacao", title: "3. Autorização da Conta" },
  { id: "uso", title: "4. Uso Permitido" },
  { id: "automacao", title: "5. Automação e Responsabilidade" },
  { id: "privacidade", title: "6. Dados e Privacidade" },
  { id: "exclusao", title: "7. Exclusão e Revogação" },
  { id: "terceiros", title: "8. Serviços de Terceiros" },
  { id: "disponibilidade", title: "9. Disponibilidade e Alterações" },
  { id: "propriedade", title: "10. Propriedade Intelectual" },
  { id: "responsabilidade", title: "11. Limitação de Responsabilidade" },
  { id: "suspensao", title: "12. Suspensão e Encerramento" },
  { id: "alteracoes", title: "13. Alterações destes Termos" },
  { id: "legislacao", title: "14. Legislação Aplicável" },
  { id: "contato", title: "15. Contato" },
];

export default function ThreadsTermsPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-brand-neon selection:text-black overflow-x-hidden flex flex-col justify-between">
      <SEOHead
        title="Termos de Uso | Threads Autopilot"
        description="Condições para utilização da ferramenta interna de automação e gerenciamento do perfil autorizado no Threads."
        canonical="https://cantaja.com.br/threads-autopilot/termos-de-uso"
      />

      <MetaHeader showNavLinks={false} />

      <main className="flex-grow py-12 md:py-20 px-6 md:px-12 max-w-[1200px] mx-auto w-full">
        <div className="mb-8 flex items-center gap-2 text-xs md:text-sm text-[#A1A1AA]">
          <Link to="/threads-autopilot" className="hover:text-white flex items-center gap-1">
            <ArrowLeft className="w-4 h-4 text-brand-neon" aria-hidden="true" />
            Threads Autopilot
          </Link>
          <span>/</span>
          <span className="text-white">Termos de Uso</span>
        </div>

        <header className="mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-brand-neon/30 bg-brand-neon/5 text-brand-neon text-xs font-medium mb-6">
            <FileText className="w-3.5 h-3.5" aria-hidden="true" />
            DOCUMENTO JURÍDICO
          </div>
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight mb-5">Termos de Uso do Threads Autopilot</h1>
          <p className="text-[#A1A1AA] text-base md:text-lg max-w-3xl leading-relaxed">
            Condições para utilização da ferramenta interna de automação e gerenciamento do perfil autorizado no Threads.
          </p>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs text-[#71717A]">
            <span>Versão 1.0</span>
            <span>Última atualização: 23 de agosto de 2026</span>
          </div>
        </header>

        <div className="grid lg:grid-cols-[280px_1fr] gap-10 lg:gap-16">
          <aside className="hidden lg:block">
            <nav aria-label="Índice dos Termos de Uso" className="sticky top-8 border border-white/10 rounded-2xl bg-[#0A0A0A] p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#71717A] mb-4">Neste documento</p>
              <ul className="space-y-2">
                {sections.map((section) => (
                  <li key={section.id}>
                    <a href={"#" + section.id} className="text-xs text-[#A1A1AA] hover:text-brand-neon transition-colors">
                      {section.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <article className="space-y-10 text-[#D4D4D8] leading-relaxed">
            <section className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 md:p-8">
              <div className="flex items-start gap-4">
                <ShieldCheck className="w-6 h-6 text-brand-neon shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <h2 className="text-lg font-semibold text-white mb-3">Identificação do responsável</h2>
                  <div className="grid sm:grid-cols-2 gap-2 text-sm">
                    <p><strong className="text-white">Razão social:</strong> 56.253.940 KAUA HENRIQUE SOUZA GABRIEL</p>
                    <p><strong className="text-white">Nome fantasia:</strong> KaaGabriell / CantaJa</p>
                    <p><strong className="text-white">CNPJ:</strong> 56.253.940/0001-47</p>
                    <p><strong className="text-white">País:</strong> Brasil</p>
                    <p><strong className="text-white">Responsável:</strong> Kaua Henrique Souza Gabriel</p>
                    <p><strong className="text-white">Site:</strong> <a href="https://cantaja.com.br" className="text-brand-neon hover:underline">cantaja.com.br</a></p>
                  </div>
                </div>
              </div>
            </section>

            <section id="aceitacao" className="scroll-mt-8">
              <h2 className="text-2xl font-semibold text-white mb-4">1. Aceitação dos Termos</h2>
              <p>Ao conectar um perfil do Threads ou utilizar o Threads Autopilot, o administrador declara que leu e concorda com estes Termos de Uso, com a Política de Privacidade e com as regras aplicáveis da Meta e do Threads. Caso não concorde, não deverá autorizar nem utilizar a integração.</p>
            </section>

            <section id="servico" className="scroll-mt-8">
              <h2 className="text-2xl font-semibold text-white mb-4">2. Descrição do Serviço</h2>
              <p className="mb-4">O Threads Autopilot é uma ferramenta interna que conecta, por meio do fluxo oficial de autorização OAuth, um perfil do Threads controlado pelo administrador. Conforme as permissões concedidas, a ferramenta poderá:</p>
              <ul className="space-y-3">
                {[
                  "identificar o perfil autorizado e exibir seus próprios conteúdos no painel;",
                  "publicar conteúdos no próprio perfil conectado;",
                  "pesquisar publicações públicas por palavras-chave relacionadas aos temas configurados;",
                  "ler respostas públicas relacionadas às publicações do perfil autorizado;",
                  "publicar respostas contextuais em conversas públicas relevantes."
                ].map((item) => <li key={item} className="flex gap-3"><span className="text-brand-neon">•</span><span>{item}</span></li>)}
              </ul>
              <p className="mt-4">A ferramenta não acessa mensagens privadas e não deve ser utilizada para administrar perfis sem autorização.</p>
            </section>

            <section id="autorizacao" className="scroll-mt-8">
              <div className="flex items-center gap-3 mb-4"><UserCheck className="w-6 h-6 text-brand-neon" /><h2 className="text-2xl font-semibold text-white">3. Autorização da Conta</h2></div>
              <p>Somente o titular ou uma pessoa devidamente autorizada pode conectar o perfil. O acesso é concedido diretamente no ambiente oficial do Threads. A autorização poderá ser revogada pelo titular, e essa revogação poderá interromper total ou parcialmente as funções dependentes da API.</p>
            </section>

            <section id="uso" className="scroll-mt-8">
              <div className="flex items-center gap-3 mb-4"><Ban className="w-6 h-6 text-brand-neon" /><h2 className="text-2xl font-semibold text-white">4. Uso Permitido</h2></div>
              <p>É proibido utilizar o Threads Autopilot para spam, assédio, fraude, conteúdo ilegal, violação de direitos de terceiros, manipulação enganosa, contorno de limites técnicos, coleta indevida de dados ou operação de contas sem autorização. Também não é permitido usar a ferramenta de maneira incompatível com as políticas da Meta e do Threads.</p>
            </section>

            <section id="automacao" className="scroll-mt-8">
              <div className="flex items-center gap-3 mb-4"><Settings className="w-6 h-6 text-brand-neon" /><h2 className="text-2xl font-semibold text-white">5. Automação e Responsabilidade</h2></div>
              <p>O administrador controla a ativação das funções, os temas e a frequência de execução. O sistema aplica limites de frequência e mecanismos para evitar duplicidades, mas o administrador continua responsável pelos conteúdos publicados, pelas configurações adotadas e pela conformidade de seu uso com a legislação e com as regras das plataformas.</p>
            </section>

            <section id="privacidade" className="scroll-mt-8">
              <div className="flex items-center gap-3 mb-4"><Database className="w-6 h-6 text-brand-neon" /><h2 className="text-2xl font-semibold text-white">6. Dados e Privacidade</h2></div>
              <p>Nenhuma mensagem privada é acessada. Os dados pessoais processados são limitados às informações básicas do perfil autorizado e ao necessário para operar a integração. Consulte a <Link to="/threads-autopilot/privacidade" className="text-brand-neon hover:underline">Política de Privacidade</Link>.</p>
            </section>

            <section id="exclusao" className="scroll-mt-8">
              <h2 className="text-2xl font-semibold text-white mb-4">7. Exclusão e Revogação</h2>
              <p>O titular pode solicitar a exclusão dos dados conforme as <Link to="/threads-autopilot/exclusao-de-dados" className="text-brand-neon hover:underline">Instruções de Exclusão de Dados</Link>. A revogação poderá impedir novas publicações, buscas, leituras ou respostas automatizadas.</p>
            </section>

            <section id="terceiros" className="scroll-mt-8">
              <div className="flex items-center gap-3 mb-4"><ExternalLink className="w-6 h-6 text-brand-neon" /><h2 className="text-2xl font-semibold text-white">8. Serviços de Terceiros</h2></div>
              <p>O funcionamento depende de serviços de terceiros, incluindo Meta/Threads para autorização e API, Supabase para infraestrutura e processamento, e Groq para geração de conteúdo. Esses provedores possuem termos e políticas próprios. O Threads Autopilot não controla a disponibilidade, as decisões ou as alterações realizadas por esses serviços.</p>
            </section>

            <section id="disponibilidade" className="scroll-mt-8">
              <div className="flex items-center gap-3 mb-4"><Clock className="w-6 h-6 text-brand-neon" /><h2 className="text-2xl font-semibold text-white">9. Disponibilidade e Alterações</h2></div>
              <p>A ferramenta poderá passar por manutenção, atualização, limitação ou interrupção temporária. Não há garantia de funcionamento contínuo ou sem falhas, especialmente quando houver alterações, indisponibilidade ou restrições nas plataformas e serviços de terceiros.</p>
            </section>

            <section id="propriedade" className="scroll-mt-8">
              <h2 className="text-2xl font-semibold text-white mb-4">10. Propriedade Intelectual</h2>
              <p>O software, a identidade visual, os componentes e os materiais próprios do Threads Autopilot pertencem ao responsável indicado neste documento ou são utilizados sob licença. Estes Termos não transferem propriedade intelectual ao usuário.</p>
            </section>

            <section id="responsabilidade" className="scroll-mt-8">
              <h2 className="text-2xl font-semibold text-white mb-4">11. Limitação de Responsabilidade</h2>
              <p>Dentro dos limites permitidos pela legislação brasileira, o responsável não responderá por indisponibilidades de terceiros, decisões da Meta ou do Threads, conteúdos configurados pelo administrador, uso contrário a estes Termos ou danos decorrentes de informações incorretas fornecidas pelo usuário. Nenhuma disposição limita direitos que não possam ser afastados por lei.</p>
            </section>

            <section id="suspensao" className="scroll-mt-8">
              <h2 className="text-2xl font-semibold text-white mb-4">12. Suspensão e Encerramento</h2>
              <p>O acesso poderá ser suspenso ou encerrado em caso de uso indevido, risco de segurança, violação destes Termos, descumprimento das políticas da plataforma ou obrigação legal. O administrador também poderá interromper o uso revogando a autorização do perfil.</p>
            </section>

            <section id="alteracoes" className="scroll-mt-8">
              <h2 className="text-2xl font-semibold text-white mb-4">13. Alterações destes Termos</h2>
              <p>Estes Termos poderão ser atualizados para refletir mudanças legais, técnicas ou operacionais. A versão e a data de atualização serão indicadas nesta página. A continuidade do uso após uma atualização representa ciência das novas condições.</p>
            </section>

            <section id="legislacao" className="scroll-mt-8">
              <div className="flex items-center gap-3 mb-4"><Scale className="w-6 h-6 text-brand-neon" /><h2 className="text-2xl font-semibold text-white">14. Legislação Aplicável</h2></div>
              <p>Estes Termos são regidos pela legislação da República Federativa do Brasil. Eventuais controvérsias serão tratadas conforme as regras de competência previstas na legislação aplicável.</p>
            </section>

            <section id="contato" className="scroll-mt-8">
              <div className="flex items-center gap-3 mb-4"><Mail className="w-6 h-6 text-brand-neon" /><h2 className="text-2xl font-semibold text-white">15. Contato</h2></div>
              <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 text-sm space-y-2.5 text-white/90">
                <p><strong>E-mail:</strong> <a href="mailto:kauabrgamer900@gmail.com" className="text-brand-neon hover:underline">kauabrgamer900@gmail.com</a></p>
                <p><strong>Site:</strong> <a href="https://cantaja.com.br" className="text-brand-neon hover:underline">https://cantaja.com.br</a></p>
                <p><strong>Responsável:</strong> Kaua Henrique Souza Gabriel</p>
                <p><strong>Nome empresarial:</strong> 56.253.940 KAUA HENRIQUE SOUZA GABRIEL</p>
                <p><strong>CNPJ:</strong> 56.253.940/0001-47</p>
              </div>
            </section>

            <div className="pt-6 border-t border-white/10 flex flex-wrap gap-4 text-sm">
              <Link to="/threads-autopilot" className="text-brand-neon hover:underline">Threads Autopilot</Link>
              <Link to="/threads-autopilot/privacidade" className="text-brand-neon hover:underline">Política de Privacidade</Link>
              <Link to="/threads-autopilot/exclusao-de-dados" className="text-brand-neon hover:underline">Exclusão de Dados</Link>
            </div>
          </article>
        </div>
      </main>

      <MetaFooter />
    </div>
  );
}
