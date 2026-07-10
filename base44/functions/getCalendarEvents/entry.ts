import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { accessToken } = await base44.asServiceRole.connectors.getConnection('googlecalendar');

    const body = await req.json().catch(() => ({}));
    const calendarId = body.calendarId || 'primary';

    const now = new Date().toISOString();
    const threeMonthsLater = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString();

    const encodedId = encodeURIComponent(calendarId);
    const url = `https://www.googleapis.com/calendar/v3/calendars/${encodedId}/events?timeMin=${now}&timeMax=${threeMonthsLater}&singleEvents=true&orderBy=startTime&maxResults=50`;

    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!res.ok) {
      const err = await res.text();
      return Response.json({ error: err }, { status: res.status });
    }

    const data = await res.json();
    const events = (data.items || []).map((e) => ({
      id: e.id,
      title: e.summary || 'Session',
      description: e.description || '',
      start: e.start?.dateTime || e.start?.date,
      end: e.end?.dateTime || e.end?.date,
      location: e.location || '',
      isAllDay: !e.start?.dateTime,
      link: e.htmlLink || '',
    }));

    return Response.json({ events });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});