# Requirements — Agente Puerta de Entrada Demo
Generated: 2026-04-14 | Clarity: 75%

## What it does
End-to-end system that lets leads (clinics, businesses) fill out a form on a premium Axieria landing page and, within minutes, receive a personalized ElevenLabs voice agent they can try immediately. The flow is 100% automatic: form → n8n generates a prompt by sector → ElevenLabs API creates the agent → lead receives an email with the demo link. If they don't convert within 48h, GHL starts nurturing.

## What it does NOT do (explicit exclusions)
- Does not handle payments or billing
- Does not train custom voice models (uses a fixed voice_id)
- Does not include its own admin panel (GHL is used for tracking)
- Does not support multiple languages (Spanish only)
- Does not include advanced agent usage analytics

## Integrations
- ElevenLabs Conversational AI API — voice agent creation
- GoHighLevel (GHL) — CRM, lead pipeline, nurturing email sequences
- n8n (self-hosted) — orchestration of the full flow
- SMTP (via n8n or GHL) — sending emails with the demo link

## Users
- **Lead/Visitor**: fills out the form, receives the demo link, tries the agent
- **Rocio (Axieria team)**: monitors leads in GHL, manages follow-up
- **Automated system**: n8n runs everything without human intervention

## Success criteria
- Lead fills out the form and receives a working demo link in < 5 minutes
- Voice agent speaks Spanish correctly
- Lead automatically appears in the GHL pipeline
- Nurturing starts if there's no contact within 48h
- Landing page looks premium and aligned with Axieria branding

## Constraints
- ElevenLabs API requires language: "en" (documented workaround)
- Limited ElevenLabs credits — monitor usage
- Fixed voice ID: HYlEvvU9GMan5YdjFYpg
- Landing page must use the exact Axieria palette
