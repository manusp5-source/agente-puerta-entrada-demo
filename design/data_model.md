# Data Model — Agente Puerta de Entrada Demo

## Entities

### Lead (form → n8n → GHL)
| Field | Type | Notes |
|-------|------|-------|
| company_name | string | Company name |
| website | string | Website URL |
| contact_name | string | Contact's name (person, not company) |
| phone | string | Contact's personal phone number |
| email | string | Contact's personal email |
| appointments_per_week | number | Number of appointments per week |
| notes | string | Additional notes (optional) |
| created_at | datetime | Form submission timestamp |
| source | string | "landing-demo" (for tracking) |

### VoiceAgent (created by ElevenLabs API)
| Field | Type | Notes |
|-------|------|-------|
| agent_id | string | Returned by the ElevenLabs API |
| agent_name | string | "[Company] - Demo Agent" |
| demo_link | string | https://elevenlabs.io/app/talk-to?agent_id=XXX |
| edit_link | string | https://elevenlabs.io/app/agents/agents/XXX |
| prompt_used | text | Generated system prompt |
| lead_email | string | FK to the lead |
| created_at | datetime | Creation timestamp |
| status | string | created / sent / converted / nurturing |

## Relationships
- A Lead has exactly one VoiceAgent
- VoiceAgent references the Lead via lead_email
- GHL contact stores agent_id as a custom field

## Key indexes
- Not applicable (no dedicated DB — data lives in GHL + ElevenLabs)
- GHL custom field "agent_id" for fast lookups
