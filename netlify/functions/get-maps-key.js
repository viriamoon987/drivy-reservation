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

  // SÉCURITÉ MAXIMALE : SEUL VOTRE SITE EST AUTORISÉ
  const origin = event.headers.origin || event.headers.referer;
  const authorizedSite = 'https://6843fd15fa99af229a285f9e--effervescent-cobbler-0316a6.netlify.app';

  // Vérifier que la demande vient bien de votre site
  if (!origin || !origin.startsWith(authorizedSite)) {
    return {
      statusCode: 403,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        error: 'Access denied - unauthorized origin'
      }),
    };
  }

  // Succès : retourner la clé API
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': authorizedSite,
      'Cache-Control': 'no-cache'
    },
    body: JSON.stringify({ apiKey }),
  };
};
