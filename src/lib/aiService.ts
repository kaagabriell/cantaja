import { formSteps } from "@/constants";

export async function generateDynamicPrompt(data: Record<string, any>) {
  // Pre-process data (ignoring personal info)
  const formattedData = Object.entries(data)
    .filter(([key]) => !['name', 'email', 'whatsapp', 'phone'].includes(key.toLowerCase()))
    .map(([key, value]) => {
      const step = formSteps.find(s => s.id === key);
      const questionText = step ? step.question : key;
      
      let displayValue = value;
      if (Array.isArray(value)) {
        displayValue = value.join(', ');
      } else if (key === 'q32_target') {
        displayValue = `Destinatário específico: ${value}`;
      } else if (key === 'q59_title') {
        displayValue = `Título sugerido pelo cliente: ${value}`;
      } else if (key === 'q60_ref') {
        displayValue = `Referência adicional: ${value}`;
      } else if (key === 'q7_names') {
        displayValue = `Nomes para a letra: ${Array.isArray(value) ? value.join(', ') : value}`;
      }

      return `${questionText}\nRESPOSTA: ${displayValue}`;
    }).join('\n\n');

  const systemPrompt = `
    Você é um produtor musical de elite e compositor experiente.
    Sua tarefa é atuar como um tradutor: você vai pegar as respostas brutas de um formulário de briefing musical e transformá-las em um PROMPT DE PRODUÇÃO PROFISSIONAL.

    REGRAS ABSOLUTAS:
    1. CAPTURE TUDO: O cliente selecionou várias opções e escreveu textos específicos. Você DEVE ler e incorporar absolutamente TODAS as escolhas, seleções e textos abertos. NADA deve ser ignorado.
    2. TEXTOS ESCRITOS SÃO LEI: Se o cliente digitou nomes específicos, referências de artistas, histórias, frases ou detalhes únicos, isso DEVE constar obrigatoriamente no resultado final (especialmente na Letra e na História).
    3. NÃO INVENTE DADOS: Use apenas as informações e o contexto fornecidos nas respostas.
    4. FORMATO ESTRITO: Você deve retornar EXATAMENTE a estrutura abaixo. Não adicione introduções (como "Aqui está o prompt") nem conclusões. Entregue APENAS o prompt final preenchido.

    ESTRUTURA OBRIGATÓRIA (Siga exatamente este modelo):
    
    TÍTULO: [Crie um título impactante baseado no tema]

    ESTILO MUSICAL:
    [Gênero, sub-gênero, ritmo e referências de artistas citados nas respostas]

    DIREÇÃO GERAL:
    [Resumo do tema da música, sensação que deve passar, foco da narrativa]

    ENERGIA E DURAÇÃO:
    [Nível de energia da música e estimativa de duração]

    VOZES E IDIOMA:
    [Descreva quem canta, estilo vocal, idioma e divisão de vozes se houver dueto]

    LETRA E HISTÓRIA (CRÍTICO):
    [Descreva detalhadamente a história. INCLUA TODOS OS NOMES PRÓPRIOS CITADOS NAS RESPOSTAS. Inclua detalhes específicos, piadas internas ou mensagens exatas que o cliente pediu]

    ESTÉTICA E BEAT:
    [Elementos visuais, instrumentos específicos, estilo do beat, acústico ou eletrônico, pausas, etc]

    FRASE-CHAVE DA MÚSICA:
    [A ideia central ou frase de impacto baseada na história do cliente]

    ESTRUTURA DA MÚSICA:
    [Divisão das partes da música: Intro, Versos, Refrão, etc]

    MAPA DE INTERPRETAÇÃO:
    [Como a emoção e as vozes evoluem ao longo da estrutura]

    LETRA COMPLETA:
    [Escreva a letra completa aqui, dividida pelas tags da estrutura (ex: [Intro], [Verso 1], [Refrão]). A letra DEVE refletir a história, os nomes e os detalhes exatos que o cliente pediu nas respostas escritas.]

    ADLIBS E EFEITOS VOCAIS:
    [Instruções sobre adlibs, ecos, texturas vocais]

    ORIENTAÇÃO FINAL DE PRODUÇÃO:
    [Resumo final de como a música deve soar e qual o impacto desejado]
  `;

  try {
    const response = await fetch('/api/generate-prompt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        formattedData,
        systemPrompt
      })
    });

    const result = await response.json();
    
    if (result.error) {
      throw new Error(result.error);
    }

    if (result.prompt) {
      return result.prompt;
    }
    
    throw new Error("Resposta inesperada do servidor.");
  } catch (error: any) {
    console.error("API Call Error:", error);
    return `ERRO NA GERAÇÃO: ${error.message || 'Erro desconhecido'}. 
    
    DADOS PARA REVISÃO MANUAL:
    ${JSON.stringify(data, null, 2)}`;
  }
}
