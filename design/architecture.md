# Architecture — Agente Puerta de Entrada Demo

## Overview
Sistema de generacion automatica de agentes de voz para demos comerciales de Axieria. Un formulario web recoge datos del lead, n8n orquesta la creacion del agente via ElevenLabs API, y el lead recibe el link de demo por email. GHL gestiona el pipeline comercial y nurturing.

## Stack
- **Frontend**: HTML5 + CSS3 + Vanilla JS — sin framework, deploy instantaneo, maximo rendimiento
- **Backend**: n8n self-hosted (n8n.manusp.site) — webhooks, HTTP requests, logica de negocio
- **Voice AI**: ElevenLabs Conversational AI API — creacion de agentes programatica
- **CRM**: GoHighLevel — pipeline de leads, email sequences, nurturing
- **Email**: SMTP via n8n o GHL built-in email

## Module structure
```
frontend/          Landing page premium
  index.html       Estructura + formulario
  styles.css       Paleta Axieria (navy/oro/crema)
  script.js        Validacion + POST al webhook

n8n/               Workflows exportados
  workflow-agent-creator.json

prompts/           Templates
  agent_prompt_template.md   Template parametrizado del system prompt
```

## Data flow

```
[Lead] → [Landing Form] → POST → [n8n Webhook]
                                       │
                            ┌──────────┼──────────┐
                            ▼          ▼          ▼
                    [Generate    [Create lead  [Log to
                     Prompt]      in GHL]     spreadsheet]
                        │
                        ▼
               [ElevenLabs API]
               create_agent()
                        │
                        ▼
                [Get agent_id]
                        │
                        ▼
              [Build demo_link +
               edit_link]
                        │
                        ▼
              [Send email to lead
               with demo_link + CTA]
                        │
                        ▼
              [Update GHL contact
               with agent_id]
                        │
                        ▼
              [Wait 48h trigger]
                        │
                        ▼
              [If no call → start
               nurturing sequence]
```

## External integrations

| Service | Purpose | Auth method |
|---------|---------|-------------|
| ElevenLabs API | Create voice agents | API Key (in n8n credentials) |
| GoHighLevel | CRM, leads, nurturing | API Key / OAuth |
| SMTP | Send emails | SMTP credentials in n8n |
