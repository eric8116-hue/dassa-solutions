const MAX_FIELD_LENGTH = 500;

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store'
    }
  });
}

function cleanField(value, maxLength = MAX_FIELD_LENGTH) {
  if (typeof value !== 'string') return '';
  return value.trim().replace(/[\u0000-\u001f\u007f]/g, ' ').slice(0, maxLength);
}

// Visitor text is pasted into a chat message, so neutralize pings, links and formatting.
function forChat(value) {
  return value.replace(/@/g, '@\u200b').replace(/[*_~`|>\\\[\]]/g, '').replace(/https?:\/\//gi, '');
}

export async function onRequestPost({ request, env }) {
  const origin = request.headers.get('origin');
  if (origin && new URL(origin).host !== new URL(request.url).host) {
    return json({ error: 'This request did not come from the site.' }, 403);
  }

  const contentType = request.headers.get('content-type') || '';
  if (!contentType.toLowerCase().includes('application/json')) {
    return json({ error: 'Send the form as JSON.' }, 415);
  }

  const contentLength = Number(request.headers.get('content-length') || 0);
  if (contentLength > 16_384) return json({ error: 'Request is too large.' }, 413);

  let data;
  try {
    data = await request.json();
  } catch {
    return json({ error: 'Request body must be valid JSON.' }, 400);
  }

  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    return json({ error: 'Request body must be an object.' }, 400);
  }
  if (cleanField(data.website, 200)) return json({ success: true }, 200);

  const lead = {
    bizName: cleanField(data.bizName, 160),
    lines: cleanField(data.lines, 80),
    spend: cleanField(data.spend, 120),
    headache: cleanField(data.headache, 200),
    contact: cleanField(data.contact, 200)
  };

  if (!lead.bizName || !lead.contact || !lead.lines || !lead.headache) {
    return json({ error: 'Business name, contact details, users, and challenge are required.' }, 400);
  }

  // Cloudflare Pages Function invocation logs are available in Workers & Pages.
  console.log('New Bill Review Request received for', lead.bizName.slice(0, 40));

  if (env.LEAD_WEBHOOK_URL) {
    const message = [
      '**New Bill Review Request**',
      `**Business:** ${forChat(lead.bizName)}`,
      `**Users/Lines:** ${forChat(lead.lines)}`,
      `**Current Spend:** ${forChat(lead.spend) || 'Not provided'}`,
      `**Primary Pain:** ${forChat(lead.headache)}`,
      `**Email/Phone:** ${forChat(lead.contact)}`
    ].join('\n');

    try {
      const webhookResponse = await fetch(env.LEAD_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: message })
      });
      if (!webhookResponse.ok) {
        console.error('Lead webhook returned a non-success status:', webhookResponse.status);
        return json({ error: 'The notification service could not accept the request. Please try again or contact us directly.' }, 502);
      }
    } catch (error) {
      console.error('Lead webhook request failed:', error instanceof Error ? error.message : 'Unknown error');
      return json({ error: 'The notification service could not accept the request. Please try again or contact us directly.' }, 502);
    }
  }

  return json({ success: true }, 200);
}
