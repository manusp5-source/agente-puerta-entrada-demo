# Scope — Agente Puerta de Entrada Demo

## In scope
- Landing page con formulario (HTML/CSS/JS standalone)
- Paleta premium Axieria (navy/oro/crema)
- Validacion frontend de campos
- Webhook n8n para recibir datos del formulario
- Generacion automatica de prompt por sector/empresa/uso
- Creacion de agente via API ElevenLabs
- Envio de email con link de demo + CTA a llamada
- Creacion/actualizacion de lead en GHL
- Secuencia nurturing 48h en GHL
- Template de prompt parametrizado

## Out of scope
- Panel admin custom (se usa GHL)
- Voces custom por empresa (voice_id fijo)
- Multi-idioma (solo espanol)
- Pagos / facturacion
- Analytics de uso del agente de voz
- App movil
- Integracion WhatsApp (fase futura posible)

## Boundaries and interfaces
- ENTRADA: formulario HTML envia POST a webhook n8n
- PROCESO: n8n orquesta todo (prompt gen → ElevenLabs API → email → GHL)
- SALIDA: email al lead con link de demo + lead en GHL
- FRONTEND: archivo estatico, se puede servir desde cualquier hosting

## Open questions
- Dominio/subdominio exacto para la landing (axieria.com/demo?)
- Plantilla de email: usar template HTML o texto plano?
- GHL: pipeline existente o crear uno nuevo?
- Limite de agentes a crear por dia (creditos ElevenLabs)?
