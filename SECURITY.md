# Security Policy

## Reporting a vulnerability

Please do not publish exploitable security vulnerabilities, credentials, tokens, personal data, or production configuration in a public issue.

Until a dedicated security contact is published, use GitHub's private vulnerability reporting/security features when available. If private reporting is not available, avoid posting exploit details publicly and contact the maintainer through an established private channel.

## Secrets

Never commit real API keys, OAuth tokens, Supabase service-role credentials, database passwords, signing secrets, or production `.env` files. Use `.env.example` only for placeholder variable names and non-sensitive examples.

## Supported versions

Security fixes currently target the latest version on the default branch while the project is in active development.
