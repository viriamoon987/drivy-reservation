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

  // Return the API key - accessible to everyone
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
};
