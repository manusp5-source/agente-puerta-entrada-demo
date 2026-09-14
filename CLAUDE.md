# Agente Puerta de Entrada Demo — Claude Code Governance

## Project context
Sistema automatizado para Axieria: landing premium recoge datos de leads, n8n orquesta la creacion de agentes de voz ElevenLabs personalizados por sector, el lead recibe link de demo por email, y GHL gestiona nurturing si no convierte en 48h.

## Stack
- Frontend: HTML + CSS + JS (standalone, paleta Axieria premium)
- Backend: n8n (self-hosted en n8n.manusp.site)
- Voice agents: ElevenLabs Conversational AI API
- CRM/Nurturing: GoHighLevel (GHL)
- Email: n8n SMTP o GHL email

## Directory map
- planning/ — requirements, scope, open questions
- design/ — architecture, data model, API contracts, stack decisions
- implementation/ — task tracker, user journey definitions
- docs/ — project memory, decision log
- frontend/ — landing page + formulario (HTML/CSS/JS)
- n8n/ — workflow exportado
- prompts/ — template de prompt para agentes ElevenLabs

## Rules for this project
1. Read design/design_summary.md at the start of every session
2. Read docs/project_memory.md to resume from last state
3. Update implementation/task_tracker.md after every task completes
4. Update docs/project_memory.md before ending each session
5. Add to docs/decision_log.md whenever an architectural decision is made
6. Never work on UJs until all ITs are complete
7. Never commit directly to main
8. ElevenLabs API: SIEMPRE language: "en", prompt en espanol
9. Voice ID fijo: HYlEvvU9GMan5YdjFYpg
10. Credenciales ElevenLabs: contacto@axieria.com (NUNCA hardcodear password)

## Execution order
M0 (IT-001 a IT-005) → M1 (UJ-001 a UJ-003) → M2 (UJ-004 a UJ-006)

## Commands to use
- /start-execution — begin IT phase
- /iterate — post-delivery changes
- /verify — final verification before marking complete
- /handoff — generate handoff doc when leaving a session mid-task
- /n8n-validate — validate n8n workflow before activating
