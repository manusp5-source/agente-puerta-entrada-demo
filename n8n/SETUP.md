# Setup — n8n Workflow "Axieria Agent Demo Creator"

## 1. Import the workflow

1. Open n8n.manusp.site
2. Go to **Workflows** > **Import from file**
3. Select `workflow-agent-creator.json`

## 2. Configure credentials

### ElevenLabs API Key
1. In n8n: **Settings** > **Credentials** > **Add credential**
2. Type: **Header Auth**
3. Name: `ElevenLabs API`
4. Header Name: `xi-api-key`
5. Header Value: your ElevenLabs API key (contacto@axieria.com account)
6. Save

### Assign the credential to the node
1. Open the **"ElevenLabs - Create Agent"** node
2. Under Authentication: **Generic Credential Type** > **Header Auth**
3. Select the "ElevenLabs API" credential you just created

### SMTP (to send email)
1. In n8n: **Settings** > **Credentials** > **Add credential**
2. Type: **SMTP**
3. Configure with your SMTP server (or GHL's)
4. Assign to the **"Send Demo Email"** node

## 3. Activate the workflow

1. Open the imported workflow
2. Toggle **Active** (top right)
3. The webhook will be available at: `https://n8n.manusp.site/webhook/agent-demo`

## 4. Test it

### Quick test with curl
```bash
curl -X POST https://n8n.manusp.site/webhook/agent-demo \
  -H "Content-Type: application/json" \
  -d '{
    "company_name": "Clinica Dental Test",
    "website": "https://clinicatest.com",
    "contact_name": "Test User",
    "phone": "+34600000000",
    "email": "YOUR_REAL_EMAIL@gmail.com",
    "appointments_per_week": 30,
    "notes": "clinica dental, ortodoncia",
    "source": "landing-demo"
  }'
```

### Expected response
```json
{"status": "ok", "message": "Recibido. Recibiras tu agente demo en minutos."}
```

### Verify
1. Check the execution in n8n (all nodes should show green)
2. Confirm the agent was created in ElevenLabs (panel > Agents)
3. Confirm the email with the demo link arrived
4. Open the demo_link and talk to the agent — it should speak Spanish

## 5. Connect the landing page

The form in `frontend/index.html` already points to:
```
https://n8n.manusp.site/webhook/agent-demo
```

To serve the landing page:
- **Option A**: Open `frontend/index.html` directly in the browser (local test)
- **Option B**: Upload the `frontend/` folder to Netlify/Vercel/GitHub Pages
- **Option C**: Serve it from your VPS with nginx

## 6. Supported sectors (auto-detection)

The Code node automatically detects the sector via keywords in website+notes+name:

| Keywords | Sector | Use case | Agent name |
|----------|--------|-----|--------------|
| dental, dentist, ortodoncia | Dental health | Appointments | Laura |
| inmobil, vivienda, piso | Real estate | Lead capture | Carlos |
| gym, fitness, deport | Fitness | Lead capture | Alex |
| abogad, legal, despacho | Legal | Lead capture | Firm assistant |
| estetic, belleza, spa | Aesthetics | Appointments | Sofia |
| restauran, comida, bar | Hospitality | Appointments | Maria |
| tech, software, saas | Technology | Lead capture | [Company]'s assistant |
| (other) | Professional services | Lead capture | Ana |

## 7. Error node (ElevenLabs fails)

If the ElevenLabs API fails after 2 retries, the workflow stops.
To add a notification to Rocio:
1. Connect an **Error Trigger** to the workflow
2. Add an email/Telegram node to notify the failure
