// netlify/functions/get-maps-key.js

exports.handler = async (event, context) => {
  // Vérifier l'origine de la requête
  const allowedOrigins = [
    'https://effervescent-cobbler-0316a6.netlify.app',
    'http://localhost:8888',
    'http://localhost:3000'
  ];
  
  const origin = event.headers.origin || event.headers.referer;
  
  // Vérifier si l'origine est autorisée
  const isAllowedOrigin = allowedOrigins.some(allowed => 
    origin && origin.startsWith(allowed)
  );
  
  // Headers CORS
  const headers = {
    'Access-Control-Allow-Origin': isAllowedOrigin ? origin : allowedOrigins[0],
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Content-Type': 'application/json'
  };
  
  // Gérer les requêtes OPTIONS (CORS preflight)
  if (event.httpMethod === 'OPTIONS') {
    return {
    statusCode: 200,
    headers,
    body: JSON.stringify({ key: apiKey })
  };
}; {
      statusCode: 200,
      headers,
      body: ''
    };
  }
  
  // Vérifier la méthode HTTP
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }
  
  // Vérifier l'origine pour la sécurité
  if (!isAllowedOrigin) {
    return {
      statusCode: 403,
      headers,
      body: JSON.stringify({ error: 'Forbidden' })
    };
  }
  
  // Retourner la clé API Google Maps
  // IMPORTANT: Remplacez YOUR_GOOGLE_MAPS_API_KEY par votre vraie clé API
  const apiKey = process.env.GOOGLE_MAPS_API_KEY || 'YOUR_GOOGLE_MAPS_API_KEY';
  
  return
