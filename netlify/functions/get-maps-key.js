// netlify/functions/get-maps-key.js

exports.handler = async (event, context) => {
  // Only allow GET requests
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  // Get the API key from environment variables
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ error: 'API key not configured' }),
    };
  }

  // Permettre l'accès depuis votre site pour tous les visiteurs
  const origin = event.headers.origin || event.headers.referer;
  const host = event.headers.host;
  
  // Autoriser tous les visiteurs de votre site Netlify
  if (host && host.includes('effervescent-cobbler-0316a6.netlify.app')) {
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': origin || `https://${host}`,
        'Access-Control-Allow-Headers': 'Content-Type',
        'Cache-Control': 'no-cache'
      },
      body: JSON.stringify({ apiKey }),
    };
  }

  // Bloquer les accès directs ou depuis d'autres sites
  return {
    statusCode: 403,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ 
      error: 'Access denied'
    }),
  };
};
