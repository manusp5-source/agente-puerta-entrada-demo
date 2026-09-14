# Requirements — Agente Puerta de Entrada Demo
Generated: 2026-04-14 | Clarity: 75%

## What it does
Sistema end-to-end que permite a leads (clinicas, empresas) rellenar un formulario en una landing premium de Axieria, y en minutos recibir un agente de voz personalizado con ElevenLabs que pueden probar inmediatamente. El flujo es 100% automatico: formulario → n8n genera prompt por sector → API ElevenLabs crea agente → lead recibe email con link de demo. Si no convierte en 48h, GHL arranca nurturing.

## What it does NOT do (explicit exclusions)
- No gestiona pagos ni facturacion
- No entrena modelos de voz custom (usa voice_id fijo)
- No incluye panel admin propio (se usa GHL para tracking)
- No soporta multiples idiomas (solo espanol)
- No incluye analytics avanzados del uso del agente

## Integrations
- ElevenLabs Conversational AI API — creacion de agentes de voz
- GoHighLevel (GHL) — CRM, pipeline de leads, nurturing email sequences
- n8n (self-hosted) — orquestacion del flujo completo
- SMTP (via n8n o GHL) — envio de emails con link de demo

## Users
- **Lead/Visitante**: rellena formulario, recibe link de demo, prueba agente
- **Rocio (equipo Axieria)**: supervisa leads en GHL, gestiona seguimiento
- **Sistema automatico**: n8n ejecuta todo sin intervencion humana

## Success criteria
- Lead rellena formulario y recibe link de demo funcional en < 5 minutos
- Agente de voz habla en espanol correctamente
- Lead aparece automaticamente en pipeline de GHL
- Nurturing arranca si no hay contacto en 48h
- Landing se ve premium y alineada con branding Axieria

## Constraints
- ElevenLabs API requiere language: "en" (workaround documentado)
- Creditos ElevenLabs limitados — monitorizar uso
- Voice ID fijo: HYlEvvU9GMan5YdjFYpg
- Landing debe usar paleta Axieria exacta
