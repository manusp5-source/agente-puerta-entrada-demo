# Task Tracker — Agente Puerta de Entrada Demo

Legend: [ ] pending | [x] complete | [~] in progress | [!] blocked

## Infrastructure Tasks (complete before any UJ)

| ID | Name | Milestone | Status | Notes |
|----|------|-----------|--------|-------|
| IT-001 | Repo + estructura | M0 | [x] | Git init, feat/execution branch, frontend scaffolded |
| IT-002 | Webhook n8n | M0 | [~] | Workflow JSON listo con GHL, pendiente importar + credentials |
| IT-003 | ElevenLabs API test | M0 | [~] | Incluido en workflow, pendiente test con API key real |
| IT-004 | Template prompt | M0 | [x] | 8 sectores auto-detectados, prompt completo en Code node |
| IT-005 | GHL integracion | M0 | [~] | Workflow JSON + GHL-SETUP.md listos, pendiente crear pipeline+fields+campaign en GHL |

## User Journeys

| ID | Name | Milestone | Status | Notes |
|----|------|-----------|--------|-------|
| UJ-001 | Lead completa formulario | M1 | [x] | Landing HTML/CSS/JS completa con validacion |
| UJ-002 | Creacion automatica agente | M1 | [~] | Workflow listo, pendiente test real |
| UJ-003 | Lead recibe demo link | M1 | [~] | Email HTML premium en workflow, pendiente SMTP config |
| UJ-004 | Lead en GHL | M2 | [~] | Nodo GHL Upsert en workflow, pendiente IDs reales |
| UJ-005 | Nurturing 48h | M2 | [~] | Nodo Schedule + 3 emails definidos en GHL-SETUP.md |
| UJ-006 | Dashboard de leads | M2 | [~] | Pipeline 5 stages definido en GHL-SETUP.md |
