import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware to parse JSON bodies
  app.use(express.json());

  // API route for AI Generation
  app.post("/api/generate-prompt", async (req, res) => {
    try {
      const { formattedData, systemPrompt } = req.body;
      
      const groqKey = process.env.GROQ_API_KEY || process.env.VITE_GROQ_API_KEY;
      if (!groqKey || groqKey.length < 10) {
        return res.status(400).json({ error: "Chave da API do Groq não detectada no backend." });
      }

      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${groqKey}`
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: `DADOS:\n${formattedData}` }
          ],
          temperature: 0.7
        })
      });

      const result = await response.json();
      
      if (result.error) {
        return res.status(400).json({ error: result.error.message || "Erro na API do Groq" });
      }

      if (result.choices && result.choices[0]) {
        return res.json({ prompt: result.choices[0].message.content });
      }
      
      return res.status(500).json({ error: "Resposta inesperada do Groq." });
    } catch (error: any) {
      console.error("Backend Groq Error:", error);
      return res.status(500).json({ error: `ERRO NA GERAÇÃO (GROQ): ${error.message || "Network Error"}` });
    }
  });

  // Serve pre-rendered HTML for Threads Autopilot routes in development and production
  const threadsRoutes = [
    {
      route: "/threads-autopilot",
      title: "Threads Autopilot | Automação interna da KaaGabriell",
      description: "Conheça o Threads Autopilot, ferramenta interna da KaaGabriell para publicar conteúdo e interagir com publicações públicas no Threads.",
      canonical: "https://cantaja.com.br/threads-autopilot",
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
      }
    },
    {
      route: "/threads-autopilot/privacidade",
      title: "Privacidade | Threads Autopilot",
      description: "Saiba quais dados o Threads Autopilot processa, para quais finalidades e como o titular mantém o controle.",
      canonical: "https://cantaja.com.br/threads-autopilot/privacidade"
    },
    {
      route: "/threads-autopilot/exclusao-de-dados",
      title: "Exclusão de dados | Threads Autopilot",
      description: "Instruções para revogar o acesso e solicitar a exclusão de dados do Threads Autopilot.",
      canonical: "https://cantaja.com.br/threads-autopilot/exclusao-de-dados"
    }
  ];

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });

    // Intercept specific routes in dev mode to inject correct HTML metadata for crawlers / curl
    app.get(["/threads-autopilot", "/threads-autopilot/privacidade", "/threads-autopilot/exclusao-de-dados"], async (req, res, next) => {
      try {
        const url = req.originalUrl.split("?")[0].replace(/\/$/, "");
        const matched = threadsRoutes.find(r => r.route === url);
        if (!matched) return next();

        const fs = await import("fs");
        let template = fs.readFileSync(path.resolve(process.cwd(), "index.html"), "utf-8");
        template = await vite.transformIndexHtml(req.originalUrl, template);

        // Inject Portuguese language and specific metadata
        template = template.replace('<html lang="en">', '<html lang="pt-BR">');
        template = template.replace(/<title>.*?<\/title>/, `<title>${matched.title}</title>`);
        
        const metaTags = `
    <meta name="description" content="${matched.description}" />
    <link rel="canonical" href="${matched.canonical}" />
    <meta name="robots" content="index,follow" />
    <meta property="og:title" content="${matched.title}" />
    <meta property="og:description" content="${matched.description}" />
    <meta property="og:url" content="${matched.canonical}" />
    <meta property="og:type" content="website" />
    ${matched.structuredData ? `<script type="application/ld+json">${JSON.stringify(matched.structuredData)}</script>` : ''}`;

        template = template.replace("</head>", `${metaTags}\n  </head>`);
        res.status(200).set({ "Content-Type": "text/html; charset=utf-8" }).end(template);
      } catch (e) {
        next(e);
      }
    });

    app.use(vite.middlewares);
  } else {
    const fs = await import("fs");
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));

    app.get('*', (req, res) => {
      const normalizedPath = req.path.replace(/\/$/, "");
      const specificDirHtml = path.join(distPath, normalizedPath, "index.html");
      const specificFlatHtml = path.join(distPath, `${normalizedPath}.html`);

      if (fs.existsSync(specificDirHtml)) {
        return res.sendFile(specificDirHtml);
      }
      if (fs.existsSync(specificFlatHtml)) {
        return res.sendFile(specificFlatHtml);
      }

      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
