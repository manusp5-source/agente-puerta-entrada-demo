# Decision Log — Agente Puerta de Entrada Demo

## DEC-001: Stack selection
Date: 2026-04-14
Decision: HTML/CSS/JS + n8n + ElevenLabs API + GHL
Rationale: Minimo overhead, usa herramientas ya en stack de Axieria, sin DB propia
Alternatives rejected: React (overkill), FastAPI (innecesario), Make.com (ya tiene n8n)
Impact: Affects all implementation phases

---

## DEC-002: Language workaround
Date: 2026-04-14
Decision: Usar language: "en" en API ElevenLabs, prompt y first_message en espanol
Rationale: API rechaza modelos de voz con idioma != "en" para eleven_turbo_v2. El agente habla espanol porque prompt y first_message estan en espanol
Alternatives rejected: Usar otro modelo de voz (peor calidad), esperar soporte nativo espanol (timeline desconocido)
Impact: Todos los agentes creados deben seguir este patron

---

## DEC-003: No DB propia
Date: 2026-04-14
Decision: GHL como unico store de datos de leads + ElevenLabs almacena agentes
Rationale: No justifica PostgreSQL/Supabase para un flujo que GHL ya cubre. Menos infra = menos mantenimiento
Alternatives rejected: Supabase (overhead), Google Sheets (no escalable para CRM)
Impact: Si se necesita analytics avanzados, habra que anadir store en futuro

---

## DEC-004: Voice ID fijo
Date: 2026-04-14
Decision: Usar voice_id HYlEvvU9GMan5YdjFYpg para todos los agentes demo
Rationale: Ya probada y funcional en espanol. Voz custom por empresa queda fuera de scope (demo)
Alternatives rejected: Voz custom por sector (creditos, complejidad), voz random (inconsistencia)
Impact: Todos los agentes suenan igual — aceptable para demo, no para produccion

---
