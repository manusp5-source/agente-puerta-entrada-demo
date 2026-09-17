# User Journeys — Agente Puerta de Entrada Demo

## UJ-001: Lead fills out the form

**Milestone:** M1
**Actor:** Lead (web visitor / event attendee)
**Trigger:** Lead visits the landing page and fills out the form
**Preconditions:** Landing page deployed, n8n webhook active

### Happy path
1. Lead visits the landing page
2. Sees the premium Axieria branding, understands the value proposition
3. Fills out the form: company, website, contact, phone, email, appointments/week, notes
4. Clicks "Create my demo agent"
5. Sees a confirmation message: "You'll receive your demo agent in minutes"
6. Data reaches n8n via webhook POST

### Error paths
- Empty required fields: frontend validation shows an inline error
- Invalid email: frontend validation rejects the format
- n8n webhook down: frontend shows "Temporary error, please try again"
- Duplicate form (same email): n8n detects it and updates instead of creating

### Acceptance criteria
- [ ] Form collects the 7 defined fields
- [ ] Frontend validation works without external JS
- [ ] POST to the webhook reaches n8n correctly
- [ ] Confirmation message shows on submit
- [ ] Landing page looks premium on mobile and desktop
- [ ] Axieria palette applied correctly

### Security checklist
- [ ] No data stored on the frontend (submission only)
- [ ] HTTPS mandatory for the webhook
- [ ] Input sanitized before sending
- [ ] No secrets in the frontend code
- [ ] Rate limiting on the webhook (n8n side)

---

## UJ-002: Automatic agent creation

**Milestone:** M1
**Actor:** System (automatic n8n)
**Trigger:** Webhook receives the form data
**Preconditions:** IT-003 (API test) and IT-004 (prompt template) completed

### Happy path
1. n8n receives the data via webhook
2. Code node infers sector and use case from website + notes
3. Code node generates the system prompt using the template + lead data
4. HTTP Request creates the agent via the ElevenLabs API (language: "en", prompt in Spanish)
5. API returns agent_id
6. n8n builds demo_link and edit_link
7. Agent data is passed to the next step (email)

### Error paths
- ElevenLabs API returns an error: n8n retries once, if it fails → notifies Rocio by email
- API returns rate limit (429): wait 60s and retry
- Credits exhausted: notify Rocio immediately
- Prompt too long: truncate the simulated FAQs

### Acceptance criteria
- [ ] Agent is created in < 30 seconds
- [ ] Generated prompt is coherent with the company's sector
- [ ] Agent speaks Spanish despite language: "en"
- [ ] demo_link and edit_link are correct and functional
- [ ] Error handling notifies Rocio on failure

### Security checklist
- [ ] ElevenLabs API key in n8n credentials (not hardcoded)
- [ ] API key never logged in any output
- [ ] Lead data sanitized before being injected into the prompt

---

## UJ-003: Lead receives the demo link

**Milestone:** M1
**Actor:** System (n8n) → Lead (receives email)
**Trigger:** Agent created successfully (UJ-002 completed)
**Preconditions:** Agent created, lead's email available

### Happy path
1. n8n receives the agent_id from the previous step
2. Builds the email with: personalized greeting, demo link, call-booking CTA
3. Sends the email via SMTP
4. Lead receives the email in < 2 minutes
5. Lead clicks the demo link
6. Lead tries the voice agent on ElevenLabs

### Error paths
- Email fails to send (SMTP error): retry once, notify Rocio
- Email goes to spam: use a verified domain, SPF/DKIM configured
- Demo link doesn't work: verify agent_id before sending

### Acceptance criteria
- [ ] Email arrives in < 2 minutes after agent creation
- [ ] Email has Axieria branding (or is at least professional)
- [ ] Demo link works and opens the agent directly
- [ ] Call CTA is clear and natural
- [ ] Email looks good on mobile and desktop

### Security checklist
- [ ] No credentials included in the email
- [ ] Demo link is HTTPS
- [ ] Do not include edit_link in the email to the lead (demo_link only)

---

## UJ-004: Lead in GHL

**Milestone:** M2
**Actor:** System (n8n → GHL)
**Trigger:** Form received (in parallel with UJ-002)
**Preconditions:** IT-005 (GHL integration) completed

### Happy path
1. n8n receives the form data
2. Looks up an existing contact in GHL by email
3. If it doesn't exist: creates a new contact with all fields
4. If it exists: updates the data
5. Assigns it to the "Demo Leads" pipeline at the "Demo Sent" stage
6. After UJ-002: updates custom fields with agent_id and demo_link

### Error paths
- GHL API error: retry, notify Rocio
- Duplicate contact: merge or update

### Acceptance criteria
- [ ] Lead appears in GHL in < 1 minute
- [ ] agent_id and demo_link custom fields are populated
- [ ] "Demo Leads" pipeline shows the lead at the correct stage
- [ ] Form data is complete on the contact

### Security checklist
- [ ] GHL API key in n8n credentials
- [ ] Do not expose GHL IDs to the frontend

---

## UJ-005: 48h nurturing

**Milestone:** M2
**Actor:** Automatic GHL
**Trigger:** 48h with no call booked after the demo was sent
**Preconditions:** UJ-004 completed, nurturing sequence configured in GHL

### Happy path
1. GHL detects that 48h have passed since "Demo Sent"
2. No call activity recorded
3. Moves the lead to the "Nurturing" stage
4. Starts the email sequence:
   - Email 1 (48h): "Have you tried your agent? Here's the link again"
   - Email 2 (96h): "See what other clinics are achieving with AI"
   - Email 3 (168h): "Last chance: book a free call"
5. If the lead books a call at any point: stop the sequence

### Error paths
- Lead already converted: verify status before sending
- Email bounce: mark lead as "invalid email"

### Acceptance criteria
- [ ] Sequence starts exactly at 48h
- [ ] Stops if the lead books a call
- [ ] Emails are professional and carry Axieria branding
- [ ] Maximum of 3 nurturing emails

### Security checklist
- [ ] Unsubscribe option in every email
- [ ] GDPR compliance (consent on the form)

---

## UJ-006: Leads dashboard

**Milestone:** M2
**Actor:** Rocio (Axieria team)
**Trigger:** Wants to see the status of demo leads
**Preconditions:** UJ-004 and UJ-005 working

### Happy path
1. Rocio opens GHL
2. Goes to the "Demo Leads" pipeline
3. Sees leads in columns: Demo Sent / Nurturing / Call Booked / Converted
4. Can click a lead to see: data, demo link, agent edit link
5. Can move leads manually between stages

### Error paths
- Empty pipeline: verify the webhook is active
- Custom fields not visible: configure the view in GHL

### Acceptance criteria
- [ ] Pipeline visible with 4 stages
- [ ] agent_id and demo_link custom fields visible on the contact
- [ ] Filters by date and stage work
- [ ] Rocio can move leads between stages

### Security checklist
- [ ] Only authorized Axieria users can access the pipeline
- [ ] edit_link visible only in GHL, never to the lead
