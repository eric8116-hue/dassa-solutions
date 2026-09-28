(() => {
  const form = document.getElementById('bill-review-form');
  if (!form) return;

  const status = document.getElementById('bill-review-status');
  const button = form.querySelector('button[type="submit"]');
  const originalButton = button.innerHTML;
  const spanish = form.dataset.language === 'es';
  const messages = spanish ? {
    sending: 'Enviando su solicitud…',
    button: 'Enviando…',
    success: 'Gracias. Recibimos su solicitud y Dassa Solutions se comunicará con usted usando los datos proporcionados.',
    error: 'No pudimos enviar su solicitud. Escriba a eric.dassa@netlinkvoice.com o llame al (407) 369-2856.'
  } : {
    sending: 'Sending your bill review request…',
    button: 'Sending…',
    success: 'Thanks — your request was received. Dassa Solutions will follow up using the contact details you provided.',
    error: 'We could not send your request just now. Please email eric.dassa@netlinkvoice.com or call (407) 369-2856.'
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (button.disabled) return;

    const data = new FormData(form);
    const payload = {
      bizName: String(data.get('business') || '').trim(),
      contact: String(data.get('contact') || '').trim(),
      lines: String(data.get('users') || ''),
      spend: String(data.get('spend') || '').trim(),
      headache: String(data.get('challenge') || ''),
      website: String(data.get('website') || '').trim()
    };

    button.disabled = true;
    button.textContent = messages.button;
    status.textContent = messages.sending;

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!response.ok) throw new Error('Lead request failed');
      status.textContent = messages.success;
      form.reset();
    } catch {
      status.textContent = messages.error;
    } finally {
      button.disabled = false;
      button.innerHTML = originalButton;
    }
  });
})();
