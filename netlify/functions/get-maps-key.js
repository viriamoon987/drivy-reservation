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
  const host = event.headers.host;
  const authorizedSite = 'https://6843feaa8563084d7cee48fb--effervescent-cobbler-0316a6.netlify.app';

  console.log('Origin:', origin);
  console.log('Referer:', event.headers.referer);
  console.log('Host:', host);

  // Vérifier que la demande vient bien de votre site
  let isAuthorized = false;
  
  if (origin && origin === authorizedSite) {
    isAuthorized = true;
  } else if (event.headers.referer && event.headers.referer.startsWith(authorizedSite)) {
    isAuthorized = true;
  } else if (host && host === '6843feaa8563084d7cee48fb--effervescent-cobbler-0316a6.netlify.app') {
    isAuthorized = true;
  }

  if (!isAuthorized) {
    console.warn('Blocked request - Origin:', origin, 'Referer:', event.headers.referer, 'Host:', host);
    return {
      statusCode: 403,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        error: 'Access denied - unauthorized origin',
        debug: {
          origin: origin,
          referer: event.headers.referer,
          host: host,
          authorized: authorizedSite
        }
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
