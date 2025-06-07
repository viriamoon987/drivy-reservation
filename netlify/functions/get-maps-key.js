// netlify/functions/get-maps-key.js

exports.handler = async (event, context) => {
  // Get the API key from environment variables
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ error: 'API key not configured' }),
    };
  }

  // Autoriser automatiquement TOUTES les URL de votre projet Netlify
  const host = event.headers.host;
  const origin = event.headers.origin;
  
  // Si c'est votre projet Netlify (n'importe quelle URL)
  if (host && host.includes('effervescent-cobbler-0316a6.netlify.app')) {
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': origin || '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET',
        'Cache-Control': 'no-cache'
      },
      body: JSON.stringify({ apiKey }),
    };
  }

  // Si c'est un accès depuis le même domaine (URL relative)
  if (!origin || origin === `https://${host}`) {
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET',
        'Cache-Control': 'no-cache'
      },
      body: JSON.stringify({ apiKey }),
    };
  }

  // Bloquer seulement les autres sites
  return {
    statusCode: 403,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ 
      error: 'Access denied',
      debug: { host, origin }
    }),
  };
};
