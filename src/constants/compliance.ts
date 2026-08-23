/**
 * Dados cadastrais e de contato institucional da KaaGabriell / CantaJa
 * Utilizados para conformidade LGPD e verificação da Meta (Threads API)
 */

export const COMPLIANCE_CONFIG = {
  appName: "Threads Autopilot",
  companyLegalName: "56.253.940 KAUA HENRIQUE SOUZA GABRIEL",
  brandName: "KaaGabriell / CantaJa",
  cnpj: "56.253.940/0001-47",
  country: "Brasil",
  siteUrl: "https://cantaja.com.br",
  contactEmail: "kauabrgamer900@gmail.com",
  responsiblePerson: "Kaua Henrique Souza Gabriel",
  lastUpdatedDate: "23 de agosto de 2026",
  metaVerificationDate: "23 de agosto de 2026",
  permissions: [
    {
      scope: "threads_basic",
      description: "Acessar informações básicas do perfil do Threads conectado (ID, nome de usuário e foto pública).",
      justification: "Identificar a conta autorizada, exibir dados no painel e validar permissões da integração."
    },
    {
      scope: "threads_content_publish",
      description: "Criar e publicar posts de texto no perfil do Threads da empresa.",
      justification: "Realizar o agendamento e a publicação direta de conteúdos institucionais planejados."
    },
    {
      scope: "threads_keyword_search",
      description: "Pesquisar publicações públicas por palavras-chave relevantes no Threads.",
      justification: "Localizar conversas públicas pertinentes sobre desenvolvimento web, apps e negócios digitais."
    },
    {
      scope: "threads_manage_replies",
      description: "Publicar respostas a publicações e comentários públicos encontrados.",
      justification: "Interagir com conversas públicas selecionadas de forma contextual e objetiva."
    },
    {
      scope: "threads_read_replies",
      description: "Ler respostas e comentários nas publicações próprias e públicas.",
      justification: "Avaliar o contexto da conversa antes de responder e evitar interações duplicadas."
    }
  ]
};
