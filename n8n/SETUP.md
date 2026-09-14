# Setup — Workflow n8n "Axieria Agent Demo Creator"

## 1. Importar workflow

1. Abrir n8n.manusp.site
2. Ir a **Workflows** > **Import from file**
3. Seleccionar `workflow-agent-creator.json`

## 2. Configurar credenciales

### ElevenLabs API Key
1. En n8n: **Settings** > **Credentials** > **Add credential**
2. Tipo: **Header Auth**
3. Name: `ElevenLabs API`
4. Header Name: `xi-api-key`
5. Header Value: tu API key de ElevenLabs (cuenta contacto@axieria.com)
6. Guardar

### Asignar credencial al nodo
1. Abrir nodo **"ElevenLabs - Create Agent"**
2. En Authentication: **Generic Credential Type** > **Header Auth**
3. Seleccionar la credencial "ElevenLabs API" que acabas de crear

### SMTP (para enviar email)
1. En n8n: **Settings** > **Credentials** > **Add credential**
2. Tipo: **SMTP**
3. Configurar con tu servidor SMTP (o el de GHL)
4. Asignar al nodo **"Send Demo Email"**

## 3. Activar workflow

1. Abrir el workflow importado
2. Toggle **Active** (arriba a la derecha)
3. El webhook queda en: `https://n8n.manusp.site/webhook/agent-demo`

## 4. Testear

### Test rapido con curl
```bash
curl -X POST https://n8n.manusp.site/webhook/agent-demo \
  -H "Content-Type: application/json" \
  -d '{
    "company_name": "Clinica Dental Test",
    "website": "https://clinicatest.com",
    "contact_name": "Test User",
    "phone": "+34600000000",
    "email": "TU_EMAIL_REAL@gmail.com",
    "appointments_per_week": 30,
    "notes": "clinica dental, ortodoncia",
    "source": "landing-demo"
  }'
```

### Respuesta esperada
```json
{"status": "ok", "message": "Recibido. Recibiras tu agente demo en minutos."}
```

### Verificar
1. Revisar ejecucion en n8n (deberia mostrar todos los nodos verdes)
2. Comprobar que el agente se creo en ElevenLabs (panel > Agents)
3. Comprobar que llego el email con el link de demo
4. Abrir el demo_link y hablar con el agente — debe hablar en espanol

## 5. Conectar landing

El formulario en `frontend/index.html` ya apunta a:
```
https://n8n.manusp.site/webhook/agent-demo
```

Para servir la landing:
- **Opcion A**: Abrir `frontend/index.html` directamente en el navegador (test local)
- **Opcion B**: Subir carpeta `frontend/` a Netlify/Vercel/GitHub Pages
- **Opcion C**: Servir desde tu VPS con nginx

## 6. Sectores soportados (auto-deteccion)

El Code node detecta sector automaticamente por keywords en web+notes+nombre:

| Keywords | Sector | Uso | Nombre agente |
|----------|--------|-----|--------------|
| dental, dentist, ortodoncia | Salud dental | Citas | Laura |
| inmobil, vivienda, piso | Inmobiliaria | Captacion | Carlos |
| gym, fitness, deport | Fitness | Captacion | Alex |
| abogad, legal, despacho | Legal | Captacion | Asistente del despacho |
| estetic, belleza, spa | Estetica | Citas | Sofia |
| restauran, comida, bar | Hosteleria | Citas | Maria |
| tech, software, saas | Tecnologia | Captacion | Asistente de [empresa] |
| (otros) | Servicios profesionales | Captacion | Ana |

## 7. Nodo de error (ElevenLabs falla)

Si ElevenLabs API falla despues de 2 reintentos, el workflow para.
Para añadir notificacion a Rocio:
1. Conectar un **Error Trigger** al workflow
2. Añadir nodo de email/Telegram que notifique el fallo
