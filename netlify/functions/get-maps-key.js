// netlify/functions/get-maps-key.js

exports.handler = async (event, context) => {
  // Only allow GET requests
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers: {
        'Allow': 'GET',
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

  // Optional: Add origin check for extra security
  const origin = event.headers.origin || event.headers.host;
  const allowedOrigins = [
    'https://drivy-calculator.netlify.app', // Remplacez par votre domaine Netlify
    'http://localhost:8888', // Pour le développement local
    'http://localhost:3000'  // Pour d'autres serveurs de dev
  ];

  // En production, décommentez cette vérification :
  /*
  if (!allowedOrigins.includes(origin)) {
    return {
      statusCode: 403,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ error: 'Forbidden' }),
    };
  }
  */

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*', // En production, utilisez votre domaine spécifique
      'Access-Control-Allow-Headers': 'Content-Type',
      'Cache-Control': 'no-cache', // Ne pas mettre en cache la clé API
    },
    body: JSON.stringify({ apiKey }),
  };
};
