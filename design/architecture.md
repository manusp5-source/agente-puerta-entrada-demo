# Architecture — Agente Puerta de Entrada Demo

## Overview
Automatic voice agent generation system for Axieria's sales demos. A web form collects lead data, n8n orchestrates agent creation via the ElevenLabs API, and the lead receives the demo link by email. GHL manages the sales pipeline and nurturing.

## Stack
- **Frontend**: HTML5 + CSS3 + Vanilla JS — no framework, instant deploy, maximum performance
- **Backend**: n8n self-hosted (n8n.manusp.site) — webhooks, HTTP requests, business logic
- **Voice AI**: ElevenLabs Conversational AI API — programmatic agent creation
- **CRM**: GoHighLevel — lead pipeline, email sequences, nurturing
- **Email**: SMTP via n8n or GHL built-in email

## Module structure
```
frontend/          Premium landing page
  index.html       Structure + form
  styles.css       Axieria palette (navy/gold/cream)
  script.js        Validation + POST to the webhook

n8n/               Exported workflows
  workflow-agent-creator.json

prompts/           Templates
  agent_prompt_template.md   Parameterized system prompt template
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
