# Decision Log — Agente Puerta de Entrada Demo

## DEC-001: Stack selection
Date: 2026-04-14
Decision: HTML/CSS/JS + n8n + ElevenLabs API + GHL
Rationale: Minimal overhead, uses tools already in Axieria's stack, no dedicated DB
Alternatives rejected: React (overkill), FastAPI (unnecessary), Make.com (already have n8n)
Impact: Affects all implementation phases

---

## DEC-002: Language workaround
Date: 2026-04-14
Decision: Use language: "en" in the ElevenLabs API, prompt and first_message in Spanish
Rationale: The API rejects voice models with language != "en" for eleven_turbo_v2. The agent speaks Spanish because the prompt and first_message are in Spanish
Alternatives rejected: Use another voice model (worse quality), wait for native Spanish support (unknown timeline)
Impact: All agents created must follow this pattern

---

## DEC-003: No dedicated DB
Date: 2026-04-14
Decision: GHL as the sole data store for leads + ElevenLabs stores the agents
Rationale: Doesn't justify PostgreSQL/Supabase for a flow that GHL already covers. Less infra = less maintenance
Alternatives rejected: Supabase (overhead), Google Sheets (not scalable for a CRM)
Impact: If advanced analytics are needed, a store will have to be added in the future

---

## DEC-004: Fixed voice ID
Date: 2026-04-14
Decision: Use voice_id HYlEvvU9GMan5YdjFYpg for all demo agents
Rationale: Already tested and working in Spanish. Custom voice per company is out of scope (demo)
Alternatives rejected: Custom voice per sector (credits, complexity), random voice (inconsistency)
Impact: All agents sound the same — acceptable for a demo, not for production

---
