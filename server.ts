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

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    // Since Express v4 is used in package.json
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
