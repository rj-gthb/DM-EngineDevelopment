const BACKEND_API_BASE_URL =
  process.env.BACKEND_API_BASE_URL ||
  process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL ||
  'http://127.0.0.1:5000';

export async function POST(request) {
  if (!BACKEND_API_BASE_URL) {
    return Response.json(
      { error: 'BACKEND_API_BASE_URL is not configured.' },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const response = await fetch(`${BACKEND_API_BASE_URL}/api/select_team`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      cache: 'no-store',
    });

    const payload = await response.json();
    return Response.json(payload, { status: response.status });
  } catch (error) {
    return Response.json(
      { error: `Backend request failed: ${error?.message || 'unknown error'}` },
      { status: 502 }
    );
  }
}
