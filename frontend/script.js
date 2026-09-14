// ============================================
// AXIERIA — Agente Puerta de Entrada Demo
// Form validation + webhook submission
// ============================================

const WEBHOOK_URL = 'https://n8n.axieria.com/webhook/agent-demo';

const form = document.getElementById('agent-form');
const submitBtn = document.getElementById('submit-btn');
const btnText = submitBtn.querySelector('.btn-text');
const btnLoading = submitBtn.querySelector('.btn-loading');
const successMsg = document.getElementById('success-msg');
const errorMsg = document.getElementById('error-msg');

// Validation rules
const validators = {
    company_name: {
        test: (v) => v.trim().length >= 2,
        msg: 'Introduce el nombre de la empresa'
    },
    website: {
        test: (v) => /^https?:\/\/.+\..+/.test(v.trim()),
        msg: 'Introduce una URL valida (https://...)'
    },
    contact_name: {
        test: (v) => v.trim().length >= 2,
        msg: 'Introduce tu nombre'
    },
    phone: {
        test: (v) => /^[\d\s+()-]{7,20}$/.test(v.trim()),
        msg: 'Introduce un telefono valido'
    },
    email: {
        test: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
        msg: 'Introduce un email valido'
    },
    appointments_per_week: {
        test: (v) => parseInt(v, 10) > 0,
        msg: 'Introduce un numero mayor que 0'
    },
    consent: {
        test: (_v, el) => el.checked,
        msg: 'Debes aceptar la politica de privacidad'
    }
};

// Clear error on input
form.querySelectorAll('input, textarea').forEach((el) => {
    el.addEventListener('input', () => {
        el.classList.remove('invalid');
        const errSpan = el.closest('.form-group')?.querySelector('.error-msg');
        if (errSpan) errSpan.textContent = '';
    });
});

// Validate all fields
function validateForm() {
    let valid = true;

    for (const [name, rule] of Object.entries(validators)) {
        const el = form.elements[name];
        if (!el) continue;

        const val = el.type === 'checkbox' ? '' : el.value;
        const passed = rule.test(val, el);

        if (!passed) {
            valid = false;
            if (el.type !== 'checkbox') el.classList.add('invalid');
            const errSpan = el.closest('.form-group')?.querySelector('.error-msg')
                         || el.closest('.consent-group')?.querySelector('.error-msg');
            if (errSpan) errSpan.textContent = rule.msg;
        }
    }

    return valid;
}

// Collect form data
function getFormData() {
    return {
        company_name: form.elements.company_name.value.trim(),
        website: form.elements.website.value.trim(),
        contact_name: form.elements.contact_name.value.trim(),
        phone: form.elements.phone.value.trim(),
        email: form.elements.email.value.trim(),
        appointments_per_week: parseInt(form.elements.appointments_per_week.value, 10),
        notes: form.elements.notes.value.trim(),
        source: 'landing-demo',
        submitted_at: new Date().toISOString()
    };
}

// Set loading state
function setLoading(loading) {
    submitBtn.disabled = loading;
    btnText.style.display = loading ? 'none' : '';
    btnLoading.style.display = loading ? '' : 'none';
}

// Submit handler
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
        const res = await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(getFormData())
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        form.style.display = 'none';
        successMsg.style.display = 'block';
    } catch (err) {
        console.error('Submission error:', err);
        form.style.display = 'none';
        errorMsg.style.display = 'block';
    } finally {
        setLoading(false);
    }
});
