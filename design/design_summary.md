# Design Summary — Agente Puerta de Entrada Demo
(50-line compact reference for AI context)

Project: Agente Puerta de Entrada Demo | Stack: HTML+n8n+ElevenLabs+GHL | Phase: planning

## Core entities (compact)
Lead: company_name, website, contact_name, phone, email, appointments_per_week, notes
VoiceAgent: agent_id, demo_link, edit_link, prompt_used, lead_email, status

## Module map (compact)
frontend/: Landing page premium (HTML/CSS/JS) con formulario de 7 campos
n8n/: Workflow exportado — webhook → prompt gen → ElevenLabs → email → GHL
prompts/: Template parametrizado del system prompt para agentes

## Key decisions
HTML standalone over React: un formulario no justifica framework
n8n over FastAPI: ya en stack, visual, zero custom code
GHL as CRM: ya en uso por Axieria, no construir custom
language: "en" in API: workaround obligatorio, prompt en espanol garantiza idioma
voice_id fijo: HYlEvvU9GMan5YdjFYpg (ya probada)

## IT sequence (M0)
IT-001: Repo + estructura de directorios
IT-002: Webhook n8n (POST /webhook/agent-demo)
IT-003: ElevenLabs API test (crear agente de prueba)
IT-004: Template prompt parametrizado por sector/empresa/uso
IT-005: GHL integracion (pipeline + custom fields)

## UJ sequence
M1: UJ-001 Formulario → webhook, UJ-002 Creacion agente, UJ-003 Email con link
M2: UJ-004 Lead en GHL, UJ-005 Nurturing 48h, UJ-006 Dashboard leads

## External dependencies
ElevenLabs API: crear agentes de voz (API key en n8n credentials)
GHL API: crear contactos, pipeline, nurturing sequences
SMTP: envio de emails con link de demo

## Paleta Axieria
#0d1a20 navy base | #c8b88a oro acento | #f5f0e8 crema texto | #4caf82 verde activo
