import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');

const pages = [
  {
    route: '/threads-autopilot',
    outputDir: path.join(distDir, 'threads-autopilot'),
    title: 'Threads Autopilot | Automação interna da KaaGabriell',
    description: 'Conheça o Threads Autopilot, ferramenta interna da KaaGabriell para publicar conteúdo e interagir com publicações públicas no Threads.',
    canonical: 'https://cantaja.com.br/threads-autopilot',
    h1: 'Conteúdo e interação no Threads, com controle e contexto.',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Threads Autopilot",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web",
      "url": "https://cantaja.com.br/threads-autopilot",
      "description": "Ferramenta interna da KaaGabriell para publicar conteúdo e interagir com publicações públicas no Threads.",
      "author": {
        "@type": "Organization",
        "name": "56.253.940 KAUA HENRIQUE SOUZA GABRIEL",
        "url": "https://cantaja.com.br"
      }
    },
    bodyHtml: `
      <div class="min-h-screen bg-[#050505] text-white font-sans flex flex-col justify-between">
        <header class="border-b border-white/10 py-4 px-6 md:px-12 max-w-[1400px] mx-auto w-full flex items-center justify-between">
          <a href="/threads-autopilot" class="text-lg font-bold text-white tracking-tight">Threads Autopilot</a>
          <nav class="hidden md:flex items-center gap-6 text-sm text-[#A1A1AA]">
            <a href="#visao-geral" class="hover:text-white">Visão Geral</a>
            <a href="#como-funciona" class="hover:text-white">Como Funciona</a>
            <a href="#permissoes" class="hover:text-white">Permissões da API</a>
            <a href="#seguranca" class="hover:text-white">Dados e Segurança</a>
            <a href="#privacidade" class="hover:text-white">Privacidade</a>
            <a href="#responsavel" class="hover:text-white">Responsável</a>
          </nav>
          <a href="/" class="text-xs bg-white/10 hover:bg-white/15 text-white px-4 py-2 rounded-full border border-white/15">Voltar para CantaJa</a>
        </header>

        <main class="flex-grow max-w-[1400px] mx-auto w-full px-6 md:px-12 py-12 space-y-16">
          <section class="space-y-6 max-w-3xl">
            <div class="inline-block px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-[#D4FF00] uppercase">
              FERRAMENTA INTERNA | THREADS API
            </div>
            <h1 class="text-3xl sm:text-5xl font-medium tracking-tight text-white leading-tight">
              Conteúdo e interação no Threads, com controle e contexto.
            </h1>
            <p class="text-base sm:text-lg text-[#A1A1AA] leading-relaxed">
              O Threads Autopilot é uma ferramenta interna desenvolvida e operada pela KaaGabriell para o próprio perfil da empresa no Threads. Ela organiza publicações, encontra conversas públicas relacionadas ao nosso trabalho e ajuda a produzir respostas curtas e contextuais.
            </p>
            <div class="flex flex-wrap gap-3 text-xs text-[#A1A1AA]">
              <span class="bg-[#111111] border border-white/10 px-3 py-1.5 rounded-full text-white">✓ Uso interno</span>
              <span class="bg-[#111111] border border-white/10 px-3 py-1.5 rounded-full text-white">✓ Apenas perfil próprio</span>
              <span class="bg-[#111111] border border-white/10 px-3 py-1.5 rounded-full text-white">✓ Sem acesso a mensagens privadas</span>
            </div>
            <div class="pt-4 flex gap-4">
              <a href="/threads-autopilot/privacidade" class="bg-white/10 text-white px-6 py-3 rounded-full text-sm font-semibold border border-white/15">Ver privacidade</a>
              <a href="/threads-autopilot/exclusao-de-dados" class="bg-white/10 text-white px-6 py-3 rounded-full text-sm font-semibold border border-white/15">Exclusão de dados</a>
            </div>
          </section>

          <section id="permissoes" class="space-y-6">
            <h2 class="text-2xl font-semibold text-white">Permissões da API Threads</h2>
            <div class="border border-white/10 rounded-2xl overflow-hidden bg-[#111111]">
              <table class="w-full text-left text-sm text-[#A1A1AA]">
                <thead class="bg-white/5 text-xs text-white uppercase border-b border-white/10">
                  <tr>
                    <th class="p-4">Permissão</th>
                    <th class="p-4">Finalidade</th>
                    <th class="p-4">Justificativa de Acesso</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-white/10">
                  <tr>
                    <td class="p-4 font-mono text-[#D4FF00]">threads_basic</td>
                    <td class="p-4 text-white">Identificação básica do perfil conectado (ID, nome de usuário e foto).</td>
                    <td class="p-4">Identificar a conta autorizada, exibir dados no painel e validar permissões da integração.</td>
                  </tr>
                  <tr>
                    <td class="p-4 font-mono text-[#D4FF00]">threads_content_publish</td>
                    <td class="p-4 text-white">Criação e publicação de postagens de texto no perfil próprio.</td>
                    <td class="p-4">Realizar o agendamento e a publicação direta de conteúdos institucionais planejados.</td>
                  </tr>
                  <tr>
                    <td class="p-4 font-mono text-[#D4FF00]">threads_keyword_search</td>
                    <td class="p-4 text-white">Pesquisa de postagens públicas por palavras-chave relevantes.</td>
                    <td class="p-4">Localizar conversas públicas pertinentes sobre desenvolvimento web, apps e negócios digitais.</td>
                  </tr>
                  <tr>
                    <td class="p-4 font-mono text-[#D4FF00]">threads_manage_replies</td>
                    <td class="p-4 text-white">Publicação de respostas a posts e comentários públicos.</td>
                    <td class="p-4">Interagir com conversas públicas selecionadas de forma contextual e objetiva.</td>
                  </tr>
                  <tr>
                    <td class="p-4 font-mono text-[#D4FF00]">threads_read_replies</td>
                    <td class="p-4 text-white">Leitura de respostas e comentários em posts próprios e públicos.</td>
                    <td class="p-4">Avaliar o contexto da conversa antes de responder e evitar interações duplicadas.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section id="responsavel" class="bg-[#111111] border border-white/10 rounded-3xl p-8 space-y-4">
            <h2 class="text-xl font-semibold text-white">Responsável Legal e Controlador</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-[#A1A1AA]">
              <p><strong class="text-white">Nome empresarial:</strong> 56.253.940 KAUA HENRIQUE SOUZA GABRIEL</p>
              <p><strong class="text-white">CNPJ:</strong> 56.253.940/0001-47</p>
              <p><strong class="text-white">País:</strong> Brasil</p>
              <p><strong class="text-white">Site:</strong> <a href="https://cantaja.com.br" class="text-[#D4FF00] underline">https://cantaja.com.br</a></p>
              <p><strong class="text-white">E-mail para privacidade e exclusão:</strong> <a href="mailto:kauabrgamer900@gmail.com" class="text-[#D4FF00] underline">kauabrgamer900@gmail.com</a></p>
              <p><strong class="text-white">Finalidade:</strong> Ferramenta interna para o perfil próprio da empresa no Threads.</p>
            </div>
            <p class="text-xs text-white/40 pt-4 border-t border-white/10">Atualizado para verificação Meta em 23 de agosto de 2026</p>
          </section>
        </main>

        <footer class="border-t border-white/10 py-8 px-6 md:px-12 text-xs text-[#A1A1AA] max-w-[1400px] mx-auto w-full flex flex-col md:flex-row justify-between gap-4">
          <p>© 2026 KaaGabriell. Todos os direitos reservados. CNPJ: 56.253.940/0001-47</p>
          <div class="flex gap-4">
            <a href="/threads-autopilot/privacidade" class="hover:text-white">Privacidade</a>
            <a href="/threads-autopilot/exclusao-de-dados" class="hover:text-white">Exclusão de Dados</a>
          </div>
        </footer>
      </div>
    `
  },
  {
    route: '/threads-autopilot/privacidade',
    outputDir: path.join(distDir, 'threads-autopilot', 'privacidade'),
    title: 'Privacidade | Threads Autopilot',
    description: 'Saiba quais dados o Threads Autopilot processa, para quais finalidades e como o titular mantém o controle.',
    canonical: 'https://cantaja.com.br/threads-autopilot/privacidade',
    h1: 'Política de Privacidade do Threads Autopilot',
    bodyHtml: `
      <div class="min-h-screen bg-[#050505] text-white font-sans flex flex-col justify-between">
        <header class="border-b border-white/10 py-4 px-6 md:px-12 max-w-[1200px] mx-auto w-full flex items-center justify-between">
          <a href="/threads-autopilot" class="text-lg font-bold text-white">Threads Autopilot</a>
          <a href="/" class="text-xs bg-white/10 text-white px-4 py-2 rounded-full border border-white/15">Voltar para CantaJa</a>
        </header>

        <main class="flex-grow max-w-[1200px] mx-auto w-full px-6 md:px-12 py-12 space-y-12">
          <div class="space-y-4 border-b border-white/10 pb-8">
            <div class="inline-block px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-[#D4FF00] uppercase">
              CONFORMIDADE LGPD & META API
            </div>
            <h1 class="text-3xl sm:text-5xl font-medium tracking-tight text-white leading-tight">
              Política de Privacidade do Threads Autopilot
            </h1>
            <p class="text-sm text-[#A1A1AA]">
              Última atualização: 23 de agosto de 2026 | Versão 1.0 (Específica para a integração Threads)
            </p>
          </div>

          <div class="space-y-8 text-sm sm:text-base text-[#A1A1AA] leading-relaxed">
            <section class="space-y-3">
              <h2 class="text-xl font-semibold text-white">1. Identificação do Controlador</h2>
              <div class="bg-[#111111] p-5 rounded-2xl border border-white/10 space-y-1 text-white/90 text-sm">
                <p><strong>Nome empresarial:</strong> 56.253.940 KAUA HENRIQUE SOUZA GABRIEL</p>
                <p><strong>Nome Fantasia:</strong> KaaGabriell / CantaJa</p>
                <p><strong>CNPJ:</strong> 56.253.940/0001-47</p>
                <p><strong>País:</strong> Brasil</p>
                <p><strong>Site:</strong> https://cantaja.com.br</p>
              </div>
            </section>

            <section class="space-y-3">
              <h2 class="text-xl font-semibold text-white">2. Escopo da Integração</h2>
              <p>O Threads Autopilot é uma ferramenta interna para agendamento de posts e respostas contextuais no perfil próprio da empresa no Threads. Não é um serviço SaaS público e não gerencia dados de terceiros.</p>
            </section>

            <section class="space-y-3">
              <h2 class="text-xl font-semibold text-white">3. Dados Processados e Dados Não Coletados</h2>
              <p>Processamos apenas identificadores básicos do perfil autorizado, textos de posts criados e trechos públicos pesquisados. <strong>Nunca coletamos senhas, mensagens privadas (DMs) ou dados de perfis privados.</strong></p>
            </section>

            <section class="space-y-3">
              <h2 class="text-xl font-semibold text-white">4. Finalidades do Tratamento</h2>
              <p>Publicação de conteúdo, pesquisa de tópicos públicos e formulação de respostas concisas e pertinentes a conversas públicas encontradas, com controle de prevenção de spam e duplicidade.</p>
            </section>

            <section class="space-y-3">
              <h2 class="text-xl font-semibold text-white">7. Prazos de Retenção de Dados</h2>
              <p>Trechos públicos e registros operacionais são mantidos por até 30 dias. Tokens de acesso são excluídos imediatamente após revogação.</p>
            </section>

            <section class="space-y-3">
              <h2 class="text-xl font-semibold text-white">11. Canal de Contato</h2>
              <p>Para esclarecimentos, revogação de consentimento ou solicitações relacionadas aos dados processados pelo Threads Autopilot, o titular pode entrar em contato pelo canal oficial abaixo.</p>
              <div class="bg-[#111111] p-5 rounded-2xl border border-white/10 space-y-2 text-white/90 text-sm">
                <p><strong>E-mail:</strong> <a href="mailto:kauabrgamer900@gmail.com" class="text-[#D4FF00] underline">kauabrgamer900@gmail.com</a></p>
                <p><strong>Site:</strong> https://cantaja.com.br</p>
                <p><strong>Responsável pelo tratamento:</strong> Kaua Henrique Souza Gabriel</p>
                <p><strong>Nome empresarial:</strong> 56.253.940 KAUA HENRIQUE SOUZA GABRIEL</p>
                <p><strong>CNPJ:</strong> 56.253.940/0001-47</p>
              </div>
            </section>
          </div>
        </main>

        <footer class="border-t border-white/10 py-8 px-6 md:px-12 text-xs text-[#A1A1AA] max-w-[1200px] mx-auto w-full flex justify-between">
          <p>© 2026 KaaGabriell. CNPJ: 56.253.940/0001-47</p>
          <a href="/threads-autopilot/exclusao-de-dados" class="hover:text-white">Instruções de Exclusão de Dados</a>
        </footer>
      </div>
    `
  },
  {
    route: '/threads-autopilot/exclusao-de-dados',
    outputDir: path.join(distDir, 'threads-autopilot', 'exclusao-de-dados'),
    title: 'Exclusão de dados | Threads Autopilot',
    description: 'Instruções para revogar o acesso e solicitar a exclusão de dados do Threads Autopilot.',
    canonical: 'https://cantaja.com.br/threads-autopilot/exclusao-de-dados',
    h1: 'Revogação e exclusão de dados do Threads Autopilot',
    bodyHtml: `
      <div class="min-h-screen bg-[#050505] text-white font-sans flex flex-col justify-between">
        <header class="border-b border-white/10 py-4 px-6 md:px-12 max-w-[1000px] mx-auto w-full flex items-center justify-between">
          <a href="/threads-autopilot" class="text-lg font-bold text-white">Threads Autopilot</a>
          <a href="/" class="text-xs bg-white/10 text-white px-4 py-2 rounded-full border border-white/15">Voltar para CantaJa</a>
        </header>

        <main class="flex-grow max-w-[1000px] mx-auto w-full px-6 md:px-12 py-12 space-y-12">
          <div class="space-y-4 border-b border-white/10 pb-8">
            <div class="inline-block px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-[#D4FF00] uppercase">
              DIRETRIZES DE EXCLUSÃO E REVOGAÇÃO
            </div>
            <h1 class="text-3xl sm:text-5xl font-medium tracking-tight text-white leading-tight">
              Revogação e exclusão de dados do Threads Autopilot
            </h1>
            <p class="text-sm text-[#A1A1AA]">
              Última atualização: 23 de agosto de 2026 | Versão 1.0
            </p>
          </div>

          <div class="space-y-8 text-sm sm:text-base text-[#A1A1AA] leading-relaxed">
            <section class="bg-[#111111] p-8 rounded-3xl border border-white/10 space-y-4">
              <h2 class="text-xl font-semibold text-white">01. Revogar acesso pelo Threads / Meta</h2>
              <ol class="list-decimal list-inside space-y-2 text-white/90">
                <li>Abrir o aplicativo ou versão web do Threads.</li>
                <li>Acessar o menu de Configurações no seu perfil.</li>
                <li>Abrir Mais configurações e selecionar Permissões do site.</li>
                <li>Abrir a seção Apps e sites.</li>
                <li>Localizar o aplicativo Threads Autopilot e clicar em Remover / Revogar.</li>
              </ol>
            </section>

            <section class="bg-[#111111] p-8 rounded-3xl border border-white/10 space-y-4">
              <h2 class="text-xl font-semibold text-white">02. Solicitar exclusão definitiva de dados</h2>
              <p>Envie uma solicitação para <a href="mailto:kauabrgamer900@gmail.com" class="text-[#D4FF00] font-semibold underline">kauabrgamer900@gmail.com</a> com o assunto “Exclusão de Dados do Threads Autopilot”. Informe o nome de usuário (@username) do perfil do Threads conectado. A titularidade será verificada antes da exclusão para impedir solicitações indevidas.</p>
              <div class="pt-2">
                <a href="mailto:kauabrgamer900@gmail.com?subject=Exclusão%20de%20Dados%20do%20Threads%20Autopilot" class="inline-block bg-[#D4FF00] text-black font-bold px-6 py-3 rounded-full text-sm">
                  Solicitar exclusão por e-mail
                </a>
              </div>
            </section>

            <div class="bg-white/5 p-6 rounded-2xl border border-white/10 text-xs text-[#A1A1AA] space-y-1">
              <p><strong>Controlador dos Dados:</strong> 56.253.940 KAUA HENRIQUE SOUZA GABRIEL</p>
              <p><strong>CNPJ:</strong> 56.253.940/0001-47 | <strong>País:</strong> Brasil</p>
              <p><strong>E-mail oficial:</strong> <a href="mailto:kauabrgamer900@gmail.com" class="text-[#D4FF00] underline">kauabrgamer900@gmail.com</a></p>
            </div>
          </div>
        </main>

        <footer class="border-t border-white/10 py-8 px-6 md:px-12 text-xs text-[#A1A1AA] max-w-[1000px] mx-auto w-full flex justify-between">
          <p>© 2026 KaaGabriell. CNPJ: 56.253.940/0001-47</p>
          <a href="/threads-autopilot/privacidade" class="hover:text-white">Política de Privacidade</a>
        </footer>
      </div>
    `
  }
];

pages.push({
  route: '/threads-autopilot/termos-de-uso',
  outputDir: path.join(distDir, 'threads-autopilot', 'termos-de-uso'),
  title: 'Termos de Uso | Threads Autopilot',
  description: 'Condições de uso do Threads Autopilot, ferramenta interna da KaaGabriell integrada ao Threads.',
  canonical: 'https://cantaja.com.br/threads-autopilot/termos-de-uso',
  h1: 'Termos de Uso do Threads Autopilot',
  bodyHtml: '<div class="min-h-screen bg-[#050505] text-white font-sans flex flex-col justify-between"><header class="border-b border-white/10 py-4 px-6 md:px-12 max-w-[1100px] mx-auto w-full flex items-center justify-between"><a href="/threads-autopilot" class="text-lg font-bold text-white">Threads Autopilot</a><a href="/" class="text-xs bg-white/10 text-white px-4 py-2 rounded-full border border-white/15">Voltar para CantaJa</a></header><main class="flex-grow max-w-[1100px] mx-auto w-full px-6 md:px-12 py-12"><article class="space-y-8 text-sm sm:text-base text-[#A1A1AA] leading-relaxed"><header class="space-y-4 border-b border-white/10 pb-8"><div class="inline-block px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-[#D4FF00] uppercase">TERMOS E CONDIÇÕES</div><h1 class="text-3xl sm:text-5xl font-medium tracking-tight text-white">Termos de Uso do Threads Autopilot</h1><p>Última atualização: 23 de agosto de 2026 | Versão 1.0</p></header><section><h2 class="text-xl font-semibold text-white mb-3">1. Aceitação dos Termos</h2><p>Ao acessar ou utilizar o Threads Autopilot, o administrador declara que leu e concorda com estes Termos, com a Política de Privacidade e com as regras aplicáveis da Meta e do Threads.</p></section><section><h2 class="text-xl font-semibold text-white mb-3">2. Identificação e descrição do serviço</h2><p>O Threads Autopilot é uma ferramenta interna desenvolvida e operada por 56.253.940 KAUA HENRIQUE SOUZA GABRIEL, CNPJ 56.253.940/0001-47, para administrar somente o perfil próprio da empresa no Threads por meio da API oficial e autorização OAuth.</p></section><section><h2 class="text-xl font-semibold text-white mb-3">3. Conta e autorização</h2><p>O uso exige autenticação pela Meta. O administrador deve manter suas credenciais seguras e pode revogar a autorização a qualquer momento nas configurações da Meta ou do Threads.</p></section><section><h2 class="text-xl font-semibold text-white mb-3">4. Uso permitido</h2><p>A ferramenta pode identificar o perfil autorizado, publicar conteúdo no perfil próprio, pesquisar publicações públicas por palavras-chave, ler respostas públicas necessárias ao contexto e publicar respostas públicas selecionadas.</p></section><section><h2 class="text-xl font-semibold text-white mb-3">5. Automação e responsabilidade editorial</h2><p>As sugestões de conteúdo e resposta devem ser usadas com supervisão do administrador. O responsável permanece encarregado pela seleção de temas, revisão, veracidade, adequação e publicação final.</p></section><section><h2 class="text-xl font-semibold text-white mb-3">6. Dados pessoais e privacidade</h2><p>O tratamento de dados segue a Política de Privacidade. Não são acessadas mensagens privadas, senhas ou perfis privados. Os dados são limitados ao perfil autorizado e ao necessário para operar a integração.</p></section><section><h2 class="text-xl font-semibold text-white mb-3">7. Exclusão e revogação</h2><p>O administrador pode revogar o acesso pela Meta ou solicitar exclusão pelo e-mail oficial. Tokens são eliminados após revogação e solicitações verificadas são processadas em até 5 dias úteis.</p></section><section><h2 class="text-xl font-semibold text-white mb-3">8. Serviços de terceiros</h2><p>O funcionamento depende de serviços de terceiros, incluindo Meta, Threads, Supabase e Groq, sujeitos a seus próprios termos, políticas e disponibilidade.</p></section><section><h2 class="text-xl font-semibold text-white mb-3">9. Disponibilidade</h2><p>O serviço pode ser atualizado, suspenso ou ficar temporariamente indisponível por manutenção, segurança, alterações da API ou eventos fora do controle do responsável.</p></section><section><h2 class="text-xl font-semibold text-white mb-3">10. Propriedade intelectual</h2><p>O software, a identidade visual e os materiais próprios permanecem protegidos pela legislação aplicável. Marcas da Meta e do Threads pertencem aos respectivos titulares.</p></section><section><h2 class="text-xl font-semibold text-white mb-3">11. Limitação de responsabilidade</h2><p>Dentro dos limites legais, o responsável não responde por indisponibilidades de terceiros, decisões da Meta ou do Threads, conteúdo configurado pelo administrador ou uso contrário a estes Termos.</p></section><section><h2 class="text-xl font-semibold text-white mb-3">12. Suspensão e encerramento</h2><p>O acesso poderá ser suspenso ou encerrado em caso de uso indevido, risco de segurança, violação destes Termos, descumprimento das políticas da plataforma ou obrigação legal.</p></section><section><h2 class="text-xl font-semibold text-white mb-3">13. Alterações</h2><p>Estes Termos poderão ser atualizados para refletir mudanças legais, técnicas ou operacionais. A versão e a data serão indicadas nesta página.</p></section><section><h2 class="text-xl font-semibold text-white mb-3">14. Legislação aplicável</h2><p>Estes Termos são regidos pela legislação da República Federativa do Brasil.</p></section><section><h2 class="text-xl font-semibold text-white mb-3">15. Contato</h2><div class="bg-[#111111] border border-white/10 rounded-2xl p-6 space-y-2 text-white/90"><p><strong>E-mail:</strong> <a href="mailto:kauabrgamer900@gmail.com" class="text-[#D4FF00] underline">kauabrgamer900@gmail.com</a></p><p><strong>Site:</strong> https://cantaja.com.br</p><p><strong>Responsável:</strong> Kaua Henrique Souza Gabriel</p><p><strong>Nome empresarial:</strong> 56.253.940 KAUA HENRIQUE SOUZA GABRIEL</p><p><strong>CNPJ:</strong> 56.253.940/0001-47</p></div></section><nav class="pt-6 border-t border-white/10 flex flex-wrap gap-4"><a href="/threads-autopilot">Threads Autopilot</a><a href="/threads-autopilot/privacidade">Política de Privacidade</a><a href="/threads-autopilot/exclusao-de-dados">Exclusão de Dados</a></nav></article></main><footer class="border-t border-white/10 py-8 px-6 md:px-12 text-xs text-[#A1A1AA] max-w-[1100px] mx-auto w-full"><p>© 2026 KaaGabriell. CNPJ: 56.253.940/0001-47</p></footer></div>'
});

export function generateStaticHtml(templateHtml, page) {
  let html = templateHtml;

  // 1. Language tag
  html = html.replace('<html lang="en">', '<html lang="pt-BR">');
  html = html.replace(/<html[^>]*>/, '<html lang="pt-BR">');

  // 2. Title
  html = html.replace(/<title>.*?<\/title>/, `<title>${page.title}</title>`);

  // 3. Meta Tags
  const metaTags = `
    <meta name="description" content="${page.description}" />
    <link rel="canonical" href="${page.canonical}" />
    <meta name="robots" content="index,follow" />
    <meta property="og:title" content="${page.title}" />
    <meta property="og:description" content="${page.description}" />
    <meta property="og:url" content="${page.canonical}" />
    <meta property="og:type" content="website" />
    ${page.structuredData ? `<script type="application/ld+json">${JSON.stringify(page.structuredData)}</script>` : ''}
  `;

  html = html.replace('</head>', `${metaTags}\n  </head>`);

  // 4. Pre-render Initial HTML in Root
  if (page.bodyHtml) {
    html = html.replace('<div id="root"></div>', `<div id="root">${page.bodyHtml}</div>`);
  }

  return html;
}

export function runStaticGeneration() {
  const indexHtmlPath = path.join(distDir, 'index.html');
  if (!fs.existsSync(indexHtmlPath)) {
    console.warn(`[prerender] dist/index.html not found. Run vite build first.`);
    return;
  }

  const templateHtml = fs.readFileSync(indexHtmlPath, 'utf-8');

  for (const page of pages) {
    const pageHtml = generateStaticHtml(templateHtml, page);
    
    // Write directory/index.html
    fs.mkdirSync(page.outputDir, { recursive: true });
    fs.writeFileSync(path.join(page.outputDir, 'index.html'), pageHtml, 'utf-8');
    
    // Also write direct .html for servers that route without trailing slash
    const flatHtmlPath = `${path.join(distDir, page.route.slice(1))}.html`;
    fs.mkdirSync(path.dirname(flatHtmlPath), { recursive: true });
    fs.writeFileSync(flatHtmlPath, pageHtml, 'utf-8');

    console.log(`[prerender] Generated static HTML for: ${page.route}`);
  }
}

// Execute if run directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  runStaticGeneration();
}
