# Open Questions & Assumptions — Agente Puerta de Entrada Demo

## Open questions
1. Landing page domain: axieria.com/demo, demo.axieria.com, or other?
2. GHL: create a new "Demo Leads" pipeline or use an existing one?
3. Email template: premium HTML or simple plain text?
4. Daily limit on agent creation (ElevenLabs credits)?
5. WhatsApp integration for sending the link: include in M2 or leave out?
6. Tracking: UTM parameters on the form for attribution?

## Assumptions made
- The voice_id HYlEvvU9GMan5YdjFYpg works correctly with Spanish prompts
- Self-hosted n8n at n8n.manusp.site has internet access to call the ElevenLabs API
- GHL is already configured with the Axieria account
- The language: "en" + Spanish prompt workaround keeps working
- No authentication is needed to access the form (it's public)
- A static HTML file is enough (no SSR or framework needed)

## Decisions deferred
- WhatsApp as an additional delivery channel (possible M3)
- Custom dashboard for agent usage metrics
- Custom voices per sector
- A/B testing of the landing page
- Calendar integration for the call CTA
