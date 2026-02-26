export function parseClientEvent(raw) {
  try {
    const event = JSON.parse(raw.toString());
    if (typeof event.text !== 'string') {
      return { ok: false, error: 'payload doit inclure text(string)' };
    }
    return { ok: true, text: event.text };
  } catch {
    return { ok: false, error: 'json invalide' };
  }
}
