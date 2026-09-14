# User Journeys — Agente Puerta de Entrada Demo

## UJ-001: Lead completa formulario

**Milestone:** M1
**Actor:** Lead (visitante web / asistente a evento)
**Trigger:** Lead accede a la landing y rellena el formulario
**Preconditions:** Landing desplegada, webhook n8n activo

### Happy path
1. Lead accede a la landing page
2. Ve branding premium Axieria, entiende la propuesta de valor
3. Rellena formulario: empresa, web, contacto, telefono, email, citas/semana, notas
4. Pulsa "Crear mi agente demo"
5. Ve mensaje de confirmacion: "Recibiras tu agente demo en minutos"
6. Datos llegan a n8n via webhook POST

### Error paths
- Campos obligatorios vacios: validacion frontend muestra error inline
- Email invalido: validacion frontend rechaza formato
- Webhook n8n caido: frontend muestra "Error temporal, intentalo de nuevo"
- Formulario duplicado (mismo email): n8n detecta y actualiza en vez de crear

### Acceptance criteria
- [ ] Formulario recoge los 7 campos definidos
- [ ] Validacion frontend funciona sin JS externo
- [ ] POST al webhook llega correctamente a n8n
- [ ] Mensaje de confirmacion se muestra al enviar
- [ ] Landing se ve premium en mobile y desktop
- [ ] Paleta Axieria aplicada correctamente

### Security checklist
- [ ] No se almacenan datos en frontend (solo envio)
- [ ] HTTPS obligatorio para el webhook
- [ ] Input sanitizado antes de enviar
- [ ] No hay secrets en el codigo frontend
- [ ] Rate limiting en webhook (n8n side)

---

## UJ-002: Creacion automatica agente

**Milestone:** M1
**Actor:** Sistema (n8n automatico)
**Trigger:** Webhook recibe datos del formulario
**Preconditions:** IT-003 (API test) y IT-004 (template prompt) completados

### Happy path
1. n8n recibe datos via webhook
2. Code node infiere sector y uso a partir de website + notes
3. Code node genera system prompt usando template + datos del lead
4. HTTP Request crea agente en ElevenLabs API (language: "en", prompt en espanol)
5. API devuelve agent_id
6. n8n construye demo_link y edit_link
7. Datos del agente se pasan al siguiente paso (email)

### Error paths
- API ElevenLabs devuelve error: n8n reintenta 1 vez, si falla → notifica a Rocio por email
- API devuelve rate limit (429): esperar 60s y reintentar
- Creditos agotados: notificar a Rocio inmediatamente
- Prompt demasiado largo: truncar FAQs simuladas

### Acceptance criteria
- [ ] Agente se crea en < 30 segundos
- [ ] Prompt generado es coherente con sector de la empresa
- [ ] Agent habla en espanol a pesar de language: "en"
- [ ] demo_link y edit_link son correctos y funcionales
- [ ] Error handling notifica a Rocio si falla

### Security checklist
- [ ] API key de ElevenLabs en n8n credentials (no hardcoded)
- [ ] No se loguea la API key en ningun output
- [ ] Datos del lead sanitizados antes de inyectar en prompt

---

## UJ-003: Lead recibe demo link

**Milestone:** M1
**Actor:** Sistema (n8n) → Lead (recibe email)
**Trigger:** Agente creado exitosamente (UJ-002 completado)
**Preconditions:** Agent creado, email del lead disponible

### Happy path
1. n8n recibe agent_id del paso anterior
2. Construye email con: saludo personalizado, link de demo, CTA a agendar llamada
3. Envia email via SMTP
4. Lead recibe email en < 2 minutos
5. Lead hace clic en link de demo
6. Lead prueba el agente de voz en ElevenLabs

### Error paths
- Email no se envia (SMTP error): reintentar 1 vez, notificar a Rocio
- Email va a spam: usar dominio verificado, SPF/DKIM configurados
- Link de demo no funciona: verificar agent_id antes de enviar

### Acceptance criteria
- [ ] Email llega en < 2 minutos despues de crear agente
- [ ] Email tiene branding Axieria (o al menos es profesional)
- [ ] Link de demo funciona y abre el agente directamente
- [ ] CTA a llamada es claro y natural
- [ ] Email se ve bien en mobile y desktop

### Security checklist
- [ ] No incluir credenciales en el email
- [ ] Link de demo es HTTPS
- [ ] No incluir edit_link en el email al lead (solo demo_link)

---

## UJ-004: Lead en GHL

**Milestone:** M2
**Actor:** Sistema (n8n → GHL)
**Trigger:** Formulario recibido (paralelo a UJ-002)
**Preconditions:** IT-005 (GHL integracion) completada

### Happy path
1. n8n recibe datos del formulario
2. Busca contacto existente en GHL por email
3. Si no existe: crea contacto nuevo con todos los campos
4. Si existe: actualiza datos
5. Asigna al pipeline "Demo Leads" en etapa "Demo Enviada"
6. Despues de UJ-002: actualiza custom fields con agent_id y demo_link

### Error paths
- GHL API error: reintentar, notificar a Rocio
- Contacto duplicado: merge o update

### Acceptance criteria
- [ ] Lead aparece en GHL en < 1 minuto
- [ ] Custom fields agent_id y demo_link estan poblados
- [ ] Pipeline "Demo Leads" muestra el lead en etapa correcta
- [ ] Datos del formulario completos en el contacto

### Security checklist
- [ ] GHL API key en n8n credentials
- [ ] No exponer GHL IDs al frontend

---

## UJ-005: Nurturing 48h

**Milestone:** M2
**Actor:** GHL automatico
**Trigger:** 48h sin llamada agendada despues de enviar demo
**Preconditions:** UJ-004 completado, secuencia de nurturing configurada en GHL

### Happy path
1. GHL detecta que han pasado 48h desde "Demo Enviada"
2. No hay actividad de llamada registrada
3. Mueve lead a etapa "Nurturing"
4. Arranca secuencia de emails:
   - Email 1 (48h): "Has probado tu agente? Aqui tienes el link de nuevo"
   - Email 2 (96h): "Mira lo que otras clinicas estan logrando con IA"
   - Email 3 (168h): "Ultima oportunidad: agenda una llamada gratuita"
5. Si el lead agenda llamada en cualquier momento: para la secuencia

### Error paths
- Lead ya convirtio: verificar estado antes de enviar
- Email bounce: marcar lead como "email invalido"

### Acceptance criteria
- [ ] Secuencia arranca exactamente a las 48h
- [ ] Se detiene si lead agenda llamada
- [ ] Emails son profesionales y con branding Axieria
- [ ] Maximo 3 emails de nurturing

### Security checklist
- [ ] Opcion de unsubscribe en cada email
- [ ] Cumplimiento RGPD (consentimiento en formulario)

---

## UJ-006: Dashboard de leads

**Milestone:** M2
**Actor:** Rocio (equipo Axieria)
**Trigger:** Quiere ver estado de los leads de demo
**Preconditions:** UJ-004 y UJ-005 funcionando

### Happy path
1. Rocio abre GHL
2. Va al pipeline "Demo Leads"
3. Ve leads en columnas: Demo Enviada / Nurturing / Llamada Agendada / Convertido
4. Puede hacer clic en un lead para ver: datos, link de demo, link de edicion del agente
5. Puede mover leads manualmente entre etapas

### Error paths
- Pipeline vacio: verificar que webhook esta activo
- Custom fields no visibles: configurar vista en GHL

### Acceptance criteria
- [ ] Pipeline visible con 4 etapas
- [ ] Custom fields agent_id y demo_link visibles en contacto
- [ ] Filtros por fecha y etapa funcionan
- [ ] Rocio puede mover leads entre etapas

### Security checklist
- [ ] Solo usuarios autorizados de Axieria acceden al pipeline
- [ ] edit_link visible solo en GHL, nunca al lead
