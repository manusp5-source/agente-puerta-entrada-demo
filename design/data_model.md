# Data Model — Agente Puerta de Entrada Demo

## Entities

### Lead (formulario → n8n → GHL)
| Field | Type | Notes |
|-------|------|-------|
| company_name | string | Nombre de la empresa |
| website | string | URL de la web |
| contact_name | string | Nombre del contacto (persona, no empresa) |
| phone | string | Telefono personal del contacto |
| email | string | Email personal del contacto |
| appointments_per_week | number | Numero de citas por semana |
| notes | string | Notas adicionales (opcional) |
| created_at | datetime | Timestamp de envio del formulario |
| source | string | "landing-demo" (para tracking) |

### VoiceAgent (creado por ElevenLabs API)
| Field | Type | Notes |
|-------|------|-------|
| agent_id | string | Devuelto por API ElevenLabs |
| agent_name | string | "[Empresa] - Agente Demo" |
| demo_link | string | https://elevenlabs.io/app/talk-to?agent_id=XXX |
| edit_link | string | https://elevenlabs.io/app/agents/agents/XXX |
| prompt_used | text | System prompt generado |
| lead_email | string | FK al lead |
| created_at | datetime | Timestamp de creacion |
| status | string | created / sent / converted / nurturing |

## Relationships
- Un Lead tiene exactamente un VoiceAgent
- VoiceAgent referencia al Lead via lead_email
- GHL contact almacena agent_id como custom field

## Key indexes
- No aplica (sin DB propia — datos en GHL + ElevenLabs)
- GHL custom field "agent_id" para busquedas rapidas
