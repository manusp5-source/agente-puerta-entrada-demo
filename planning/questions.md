# Open Questions & Assumptions — Agente Puerta de Entrada Demo

## Open questions
1. Dominio de la landing: axieria.com/demo, demo.axieria.com, u otro?
2. GHL: crear pipeline nuevo "Demo Leads" o usar uno existente?
3. Template email: HTML premium o texto plano simple?
4. Limite diario de creacion de agentes (creditos ElevenLabs)?
5. Integracion WhatsApp para envio de link: incluir en M2 o dejar fuera?
6. Tracking: UTM parameters en el formulario para atribucion?

## Assumptions made
- El voice_id HYlEvvU9GMan5YdjFYpg funciona correctamente con prompts en espanol
- n8n self-hosted en n8n.manusp.site tiene acceso a internet para llamar API ElevenLabs
- GHL ya esta configurado con cuenta de Axieria
- El workaround language: "en" + prompt en espanol sigue funcionando
- No se necesita autenticacion para acceder al formulario (es publico)
- Un archivo HTML estatico es suficiente (no necesita SSR ni framework)

## Decisions deferred
- WhatsApp como canal adicional de envio (posible M3)
- Dashboard custom de metricas de uso de agentes
- Voces personalizadas por sector
- A/B testing de landing page
- Integracion con calendario para CTA a llamada
