import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

const TUTOR_ADDRESS = "Vancouver, BC, Canada";
const RATE_PER_MINUTE = 0.50;
const RATE_PER_KM = 0.25;

let cachedTutorCoords = null;

async function geocodeAddress(address) {
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1`;
  const res = await fetch(url, {
    headers: { 'User-Agent': 'PhilomathyLearningCenter/1.0 (philomathy.info@gmail.com)' }
  });
  if (!res.ok) return null;
  const data = await res.json();
  if (!data || data.length === 0) return null;
  return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) };
}

async function getDrivingRoute(origin, destination) {
  const url = `https://router.project-osrm.org/route/v1/driving/${origin.lon},${origin.lat};${destination.lon},${destination.lat}?overview=false`;
  const res = await fetch(url);
  if (!res.ok) return null;
  const data = await res.json();
  if (!data.routes || data.routes.length === 0) return null;
  const route = data.routes[0];
  return {
    distanceKm: route.distance / 1000,
    durationMinutes: route.duration / 60
  };
}

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const { address } = body;
    if (!address || address.trim().length < 5) {
      return Response.json({ error: 'A valid address is required' }, { status: 400 });
    }

    if (!cachedTutorCoords) {
      cachedTutorCoords = await geocodeAddress(TUTOR_ADDRESS);
      if (!cachedTutorCoords) {
        return Response.json({ error: 'Could not determine tutor location' }, { status: 500 });
      }
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    const studentCoords = await geocodeAddress(address.trim());
    if (!studentCoords) {
      return Response.json({ error: 'Address not found. Please include your city and postal code.' }, { status: 400 });
    }

    const route = await getDrivingRoute(cachedTutorCoords, studentCoords);
    if (!route) {
      return Response.json({ error: 'Could not calculate a driving route to this address' }, { status: 400 });
    }

    const travelFee = Math.max(0, Math.round(
      (route.durationMinutes * 2 * RATE_PER_MINUTE) +
      (route.distanceKm * 2 * RATE_PER_KM)
    ));

    return Response.json({
      distanceKm: Math.round(route.distanceKm * 10) / 10,
      durationMinutes: Math.round(route.durationMinutes),
      travelFee
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});
