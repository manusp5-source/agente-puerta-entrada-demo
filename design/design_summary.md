# Design Summary — Agente Puerta de Entrada Demo
(50-line compact reference for AI context)

Project: Agente Puerta de Entrada Demo | Stack: HTML+n8n+ElevenLabs+GHL | Phase: planning

## Core entities (compact)
Lead: company_name, website, contact_name, phone, email, appointments_per_week, notes
VoiceAgent: agent_id, demo_link, edit_link, prompt_used, lead_email, status

## Module map (compact)
frontend/: Premium landing page (HTML/CSS/JS) with a 7-field form
n8n/: Exported workflow — webhook → prompt gen → ElevenLabs → email → GHL
prompts/: Parameterized system prompt template for agents

## Key decisions
Standalone HTML over React: a single form doesn't justify a framework
n8n over FastAPI: already in the stack, visual, zero custom code
GHL as CRM: already in use by Axieria, no need to build custom
language: "en" in the API: mandatory workaround, Spanish prompt guarantees the language
Fixed voice_id: HYlEvvU9GMan5YdjFYpg (already tested)

## IT sequence (M0)
IT-001: Repo + directory structure
IT-002: n8n webhook (POST /webhook/agent-demo)
IT-003: ElevenLabs API test (create a test agent)
IT-004: Parameterized prompt template by sector/company/use case
IT-005: GHL integration (pipeline + custom fields)

## UJ sequence
M1: UJ-001 Form → webhook, UJ-002 Agent creation, UJ-003 Email with link
M2: UJ-004 Lead in GHL, UJ-005 48h nurturing, UJ-006 Leads dashboard

## External dependencies
ElevenLabs API: create voice agents (API key in n8n credentials)
GHL API: create contacts, pipeline, nurturing sequences
SMTP: send emails with the demo link

## Axieria palette
#0d1a20 base navy | #c8b88a accent gold | #f5f0e8 cream text | #4caf82 active green
