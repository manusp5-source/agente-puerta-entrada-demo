# Stack Selection — Agente Puerta de Entrada Demo

## Chosen stack
- HTML5 + CSS3 + Vanilla JS (frontend)
- n8n self-hosted v1.x (backend/orchestration)
- ElevenLabs Conversational AI API (voice agents)
- GoHighLevel (CRM + nurturing)
- SMTP via n8n (email delivery)

## Rationale

### Standalone HTML/CSS/JS
- Zero build step, zero dependencies
- Deploy anywhere: GitHub Pages, Netlify, any static host
- Maximum performance (no framework overhead)
- For a landing page with a single form, a framework would be overkill

### n8n self-hosted
- Already in Manuel's stack (n8n.manusp.site)
- Native webhooks to receive the form
- HTTP Request nodes for the ElevenLabs API
- Code nodes to generate dynamic prompts
- Built-in error handling
- Visual debugging of the flow

### ElevenLabs API
- Project requirement (no alternative)
- Well-documented API for creating agents programmatically
- Voice_id already tested for Spanish

### GoHighLevel
- Already in use by Axieria for sales management
- Native lead pipeline
- Email sequences for nurturing
- Avoids building a custom CRM

## Alternatives considered

| Alternative | Why rejected |
|---|---|
| React/Next.js frontend | Overkill for a single form, more setup time |
| FastAPI backend | n8n covers the whole flow without custom code |
| Make.com | Manuel already has n8n self-hosted, no need to add another tool |
| Supabase/PostgreSQL | No dedicated DB needed, GHL is the store |
| Twilio for voice | ElevenLabs is the specific requirement |
| Mailchimp nurturing | GHL already has this functionality built in |

## Risk factors
- The ElevenLabs API may change (breaking changes)
- ElevenLabs credits are limited and have already run out once
- The GHL API may have undocumented rate limits
- n8n self-hosted requires VPS uptime
