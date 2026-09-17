# Task Tracker — Agente Puerta de Entrada Demo

Legend: [ ] pending | [x] complete | [~] in progress | [!] blocked

## Infrastructure Tasks (complete before any UJ)

| ID | Name | Milestone | Status | Notes |
|----|------|-----------|--------|-------|
| IT-001 | Repo + structure | M0 | [x] | Git init, feat/execution branch, frontend scaffolded |
| IT-002 | n8n webhook | M0 | [~] | Workflow JSON ready with GHL, pending import + credentials |
| IT-003 | ElevenLabs API test | M0 | [~] | Included in the workflow, pending test with a real API key |
| IT-004 | Prompt template | M0 | [x] | 8 auto-detected sectors, full prompt in the Code node |
| IT-005 | GHL integration | M0 | [~] | Workflow JSON + GHL-SETUP.md ready, pending creation of pipeline+fields+campaign in GHL |

## User Journeys

| ID | Name | Milestone | Status | Notes |
|----|------|-----------|--------|-------|
| UJ-001 | Lead fills out the form | M1 | [x] | Landing HTML/CSS/JS complete with validation |
| UJ-002 | Automatic agent creation | M1 | [~] | Workflow ready, pending real test |
| UJ-003 | Lead receives demo link | M1 | [~] | Premium HTML email in workflow, pending SMTP config |
| UJ-004 | Lead in GHL | M2 | [~] | GHL Upsert node in workflow, pending real IDs |
| UJ-005 | 48h nurturing | M2 | [~] | Schedule node + 3 emails defined in GHL-SETUP.md |
| UJ-006 | Leads dashboard | M2 | [~] | 5-stage pipeline defined in GHL-SETUP.md |
