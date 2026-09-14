# Stack Selection — Agente Puerta de Entrada Demo

## Chosen stack
- HTML5 + CSS3 + Vanilla JS (frontend)
- n8n self-hosted v1.x (backend/orchestration)
- ElevenLabs Conversational AI API (voice agents)
- GoHighLevel (CRM + nurturing)
- SMTP via n8n (email delivery)

## Rationale

### HTML/CSS/JS standalone
- Zero build step, zero dependencies
- Deploy anywhere: GitHub Pages, Netlify, any static host
- Maximo rendimiento (no framework overhead)
- Para una landing con un formulario, un framework seria overkill

### n8n self-hosted
- Ya en stack de Manuel (n8n.manusp.site)
- Webhooks nativos para recibir formulario
- HTTP Request nodes para ElevenLabs API
- Code nodes para generar prompts dinamicos
- Error handling built-in
- Visual debugging del flujo

### ElevenLabs API
- Requerimiento del proyecto (no hay alternativa)
- API bien documentada para crear agentes programaticamente
- Voice_id ya testeada para espanol

### GoHighLevel
- Ya en uso por Axieria para gestion comercial
- Pipeline de leads nativo
- Email sequences para nurturing
- Evita construir CRM custom

## Alternatives considered

| Alternative | Why rejected |
|---|---|
| React/Next.js frontend | Overkill para un formulario, mas tiempo de setup |
| FastAPI backend | n8n cubre todo el flujo sin codigo custom |
| Make.com | Manuel ya tiene n8n self-hosted, no anadir otra herramienta |
| Supabase/PostgreSQL | No se necesita DB propia, GHL es el store |
| Twilio para voz | ElevenLabs es el requerimiento especifico |
| Mailchimp nurturing | GHL ya tiene esta funcionalidad integrada |

## Risk factors
- ElevenLabs API puede cambiar (breaking changes)
- Creditos ElevenLabs limitados y ya se agotaron una vez
- GHL API puede tener rate limits no documentados
- n8n self-hosted requiere uptime del VPS
