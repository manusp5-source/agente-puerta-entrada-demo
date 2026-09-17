# GHL Setup — Agente Puerta de Entrada Demo

## 1. Custom Fields in GHL

Create these custom fields under **Settings > Custom Fields > Contacts**:

| Field Name | Field Key | Type |
|---|---|---|
| Agent ID | agent_id | Single Line |
| Demo Link | demo_link | Single Line |
| Edit Link | edit_link | Single Line |
| Agent Status | agent_status | Single Line |
| Appointments/Week | appointments_per_week | Number |
| Sector | sector | Single Line |
| Notes | notes | Multi Line |

## 2. "Demo Leads" Pipeline

Create a pipeline under **Opportunities > Pipelines**:

**Name:** Demo Leads

**Stages (in order):**
1. **Demo Sent** — lead received the agent link
2. **Nurturing** — 48h with no response, sequence active
3. **Call Booked** — lead booked a call
4. **Converted** — lead became a customer
5. **Lost** — lead did not convert

## 3. Nurturing Campaign

Create a new campaign under **Marketing > Campaigns**:

**Name:** Demo Agent - Nurturing 48h

### Email 1 — (sent at 48h)
**Subject:** Have you tried your voice agent, {{contact.firstName}}?
```
Hi {{contact.firstName}},

A couple of days ago we created a personalized voice agent for {{contact.companyName}}.

If you haven't tried it yet, here's the direct link:
[Try my agent]({{customField.demo_link}})

Just click and start talking. Your agent already knows about your business.

Have questions? Reply to this email or book a call:
https://axieria.com/contacto

Best regards,
The Axieria Team
```

### Email 2 — (48h after Email 1 = day 4)
**Subject:** What other companies are achieving with AI
```
Hi {{contact.firstName}},

Companies like yours are using voice agents to:
- Handle calls 24/7 without hiring staff
- Qualify leads automatically
- Cut wait times to zero

Your demo agent is still active:
[Try it now]({{customField.demo_link}})

Want to see how this would work in production for {{contact.companyName}}?

Book 15 minutes with us:
https://axieria.com/contacto

Best regards,
The Axieria Team
```

### Email 3 — (72h after Email 2 = day 7)
**Subject:** Last chance: your {{contact.companyName}} demo agent
```
Hi {{contact.firstName}},

This is the last time we'll write to you about your demo agent.

The link will stay active for a few more days:
[Try it one last time]({{customField.demo_link}})

If you'd like to actually implement it in your business, book a free call:
https://axieria.com/contacto

If you're not interested, we won't bother you again.

Best regards,
The Axieria Team
```

### Campaign configuration
- **Trigger:** Manual (n8n schedules it via API)
- **Stop on reply:** Yes
- **Stop on booking:** Yes
- **Unsubscribe link:** Mandatory (GDPR)

## 4. GHL API Key

1. In GHL: **Settings > Business Profile > API Keys**
2. Create an API key with permissions:
   - contacts.write
   - contacts.read
   - opportunities.write
   - opportunities.read
   - campaigns.read
3. Copy the API key

## 5. Credential in n8n

1. In n8n: **Settings > Credentials > Add credential**
2. Type: **Header Auth**
3. Name: `GHL API`
4. Header Name: `Authorization`
5. Header Value: `Bearer YOUR_GHL_API_KEY`
6. Save
7. Assign to the 3 GHL nodes in the workflow:
   - GHL - Upsert Contact
   - GHL - Schedule Nurturing 48h
   - GHL - Create Opportunity

## 6. IDs to replace in the workflow

Open each GHL node and replace these placeholders:

| Placeholder | Where to find it |
|---|---|
| `{{YOUR_GHL_LOCATION_ID}}` | GHL > Settings > Business Profile > Location ID |
| `{{YOUR_GHL_PIPELINE_ID}}` | GHL > Opportunities > Pipelines > click "Demo Leads" > the ID is in the URL |
| `{{YOUR_GHL_STAGE_DEMO_SENT_ID}}` | GHL API: `GET /opportunities/pipelines` returns stages with their IDs |
| `{{YOUR_GHL_NURTURING_CAMPAIGN_ID}}` | GHL > Marketing > Campaigns > click the campaign > the ID is in the URL |

### Get IDs via API (quick way)
```bash
# Pipelines + stages
curl -H "Authorization: Bearer YOUR_API_KEY" \
  "https://services.leadconnectorhq.com/opportunities/pipelines?locationId=YOUR_LOCATION_ID"

# Campaigns
curl -H "Authorization: Bearer YOUR_API_KEY" \
  "https://services.leadconnectorhq.com/campaigns/?locationId=YOUR_LOCATION_ID"
```

## 7. Full GHL flow

```
Form submit → n8n webhook
  → ElevenLabs creates the agent
  → In parallel:
      1. Email to the lead with demo_link
      2. GHL: upsert contact with custom fields
          → GHL: create opportunity in "Demo Sent"
          → GHL: schedule nurturing at 48h

  48h later (if no activity):
      → GHL sends Email 1
      → +48h: Email 2
      → +72h: Email 3 (last one)
      → If they reply or book → stop the sequence
```
