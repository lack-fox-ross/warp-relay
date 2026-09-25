export const config = { runtime: 'edge' };

export default async function handler(req) {
  const url = new URL(req.url);
  const targetUrl = 'https://api.cloudflareclient.com' + url.pathname + url.search;

  const headers = new Headers(req.headers);
  headers.set('Host', 'api.cloudflareclient.com');
  headers.delete('host');

  const response = await fetch(targetUrl, {
    method: req.method,
    headers: headers,
    body: req.method !== 'GET' && req.method !== 'HEAD' ? req.body : undefined,
  });

  const respHeaders = new Headers(response.headers);
  respHeaders.set('Access-Control-Allow-Origin', '*');

  return new Response(response.body, {
    status: response.status,
    headers: respHeaders,
  });
}
