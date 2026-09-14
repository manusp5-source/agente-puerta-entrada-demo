# Setup GHL — Agente Puerta de Entrada Demo

## 1. Custom Fields en GHL

Crear estos custom fields en **Settings > Custom Fields > Contacts**:

| Field Name | Field Key | Type |
|---|---|---|
| Agent ID | agent_id | Single Line |
| Demo Link | demo_link | Single Line |
| Edit Link | edit_link | Single Line |
| Agent Status | agent_status | Single Line |
| Appointments/Week | appointments_per_week | Number |
| Sector | sector | Single Line |
| Notes | notes | Multi Line |

## 2. Pipeline "Demo Leads"

Crear pipeline en **Opportunities > Pipelines**:

**Nombre:** Demo Leads

**Stages (en orden):**
1. **Demo Enviada** — lead recibio link del agente
2. **Nurturing** — 48h sin respuesta, secuencia activa
3. **Llamada Agendada** — lead agendo llamada
4. **Convertido** — lead se convirtio en cliente
5. **Perdido** — lead no convirtio

## 3. Campana de Nurturing

Crear en **Marketing > Campaigns** una campana nueva:

**Nombre:** Demo Agent - Nurturing 48h

### Email 1 — (se envia a las 48h)
**Subject:** ¿Has probado tu agente de voz, {{contact.firstName}}?
```
Hola {{contact.firstName}},

Hace un par de dias creamos un agente de voz personalizado para {{contact.companyName}}.

Si aun no lo has probado, aqui tienes el enlace directo:
[Probar mi agente]({{customField.demo_link}})

Solo tienes que hacer clic y hablar. Tu agente ya sabe sobre tu negocio.

¿Tienes preguntas? Responde a este email o agenda una llamada:
https://axieria.com/contacto

Un saludo,
Equipo Axieria
```

### Email 2 — (48h despues del Email 1 = dia 4)
**Subject:** Lo que otras empresas estan logrando con IA
```
Hola {{contact.firstName}},

Empresas como la tuya estan usando agentes de voz para:
- Atender llamadas 24/7 sin contratar personal
- Cualificar leads automaticamente
- Reducir tiempos de espera a cero

Tu agente demo sigue activo:
[Probar ahora]({{customField.demo_link}})

¿Quieres ver como funcionaria en produccion para {{contact.companyName}}?

Agenda 15 minutos con nosotros:
https://axieria.com/contacto

Un saludo,
Equipo Axieria
```

### Email 3 — (72h despues del Email 2 = dia 7)
**Subject:** Ultima oportunidad: tu agente demo de {{contact.companyName}}
```
Hola {{contact.firstName}},

Es la ultima vez que te escribimos sobre tu agente demo.

El enlace seguira activo unos dias mas:
[Probar por ultima vez]({{customField.demo_link}})

Si quieres implementarlo de verdad en tu negocio, agenda una llamada gratuita:
https://axieria.com/contacto

Si no te interesa, no te molestaremos mas.

Un saludo,
Equipo Axieria
```

### Configuracion de la campana
- **Trigger:** Manual (n8n lo programa via API)
- **Stop on reply:** Si
- **Stop on booking:** Si
- **Unsubscribe link:** Obligatorio (RGPD)

## 4. API Key de GHL

1. En GHL: **Settings > Business Profile > API Keys**
2. Crear API key con permisos:
   - contacts.write
   - contacts.read
   - opportunities.write
   - opportunities.read
   - campaigns.read
3. Copiar la API key

## 5. Credencial en n8n

1. En n8n: **Settings > Credentials > Add credential**
2. Tipo: **Header Auth**
3. Name: `GHL API`
4. Header Name: `Authorization`
5. Header Value: `Bearer TU_API_KEY_DE_GHL`
6. Guardar
7. Asignar a los 3 nodos GHL del workflow:
   - GHL - Upsert Contact
   - GHL - Schedule Nurturing 48h
   - GHL - Create Opportunity

## 6. IDs a reemplazar en el workflow

Abrir cada nodo GHL y reemplazar estos placeholders:

| Placeholder | Donde encontrarlo |
|---|---|
| `{{YOUR_GHL_LOCATION_ID}}` | GHL > Settings > Business Profile > Location ID |
| `{{YOUR_GHL_PIPELINE_ID}}` | GHL > Opportunities > Pipelines > click en "Demo Leads" > URL contiene el ID |
| `{{YOUR_GHL_STAGE_DEMO_SENT_ID}}` | GHL API: `GET /opportunities/pipelines` devuelve stages con IDs |
| `{{YOUR_GHL_NURTURING_CAMPAIGN_ID}}` | GHL > Marketing > Campaigns > click en campana > URL contiene el ID |

### Obtener IDs via API (rapido)
```bash
# Pipelines + stages
curl -H "Authorization: Bearer TU_API_KEY" \
  "https://services.leadconnectorhq.com/opportunities/pipelines?locationId=TU_LOCATION_ID"

# Campaigns
curl -H "Authorization: Bearer TU_API_KEY" \
  "https://services.leadconnectorhq.com/campaigns/?locationId=TU_LOCATION_ID"
```

## 7. Flujo completo GHL

```
Form submit → n8n webhook
  → ElevenLabs crea agente
  → En paralelo:
      1. Email al lead con demo_link
      2. GHL: upsert contact con custom fields
          → GHL: create opportunity en "Demo Enviada"
          → GHL: schedule nurturing a 48h

  48h despues (si no hay actividad):
      → GHL envia Email 1
      → +48h: Email 2
      → +72h: Email 3 (ultimo)
      → Si responde o agenda → para secuencia
```
