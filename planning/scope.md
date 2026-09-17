# Scope — Agente Puerta de Entrada Demo

## In scope
- Landing page with form (standalone HTML/CSS/JS)
- Premium Axieria palette (navy/gold/cream)
- Frontend field validation
- n8n webhook to receive form data
- Automatic prompt generation by sector/company/use case
- Agent creation via ElevenLabs API
- Email with demo link + call CTA
- Lead creation/update in GHL
- 48h nurturing sequence in GHL
- Parameterized prompt template

## Out of scope
- Custom admin panel (GHL is used)
- Custom voices per company (fixed voice_id)
- Multi-language (Spanish only)
- Payments / billing
- Voice agent usage analytics
- Mobile app
- WhatsApp integration (possible future phase)

## Boundaries and interfaces
- INPUT: HTML form sends POST to n8n webhook
- PROCESS: n8n orchestrates everything (prompt gen → ElevenLabs API → email → GHL)
- OUTPUT: email to the lead with demo link + lead in GHL
- FRONTEND: static file, can be served from any hosting

## Open questions
- Exact domain/subdomain for the landing page (axieria.com/demo?)
- Email template: use an HTML template or plain text?
- GHL: existing pipeline or create a new one?
- Daily limit on agents to create (ElevenLabs credits)?
