# CantaJá

CantaJá is an AI-assisted platform for managing the creation and sale of personalized music. The project also contains the Threads Autopilot integration, including public transparency and compliance pages.

## Overview

The repository combines a React/TypeScript frontend with server-side services and integrations used by the CantaJá platform. Current areas include personalized-music workflows, AI-assisted functionality, Supabase integration, and Threads Autopilot.

## Tech stack

- React 19 and TypeScript
- Vite
- Tailwind CSS
- Express
- Supabase
- Google Gemini APIs
- Cloudflare Workers / Wrangler

## Local development

### Prerequisites

- Node.js
- npm

### Setup

1. Clone the repository.
2. Install dependencies with `npm install`.
3. Copy `.env.example` to `.env.local`.
4. Fill only the environment variables required for the features you are developing. Never commit real credentials.
5. Start the development server with `npm run dev`.

### Useful commands

```bash
npm run dev
npm run build
npm run lint
```

## Security

Do not commit API keys, access tokens, service-role credentials, private user data, or production secrets. See `SECURITY.md` for vulnerability reporting guidance.

## Contributing

Contributions, bug reports, documentation improvements, and feature proposals are welcome. Read `CONTRIBUTING.md` before submitting a pull request.

## License

A formal open-source license will be added after the repository's pre-publication legal and security review is complete.
