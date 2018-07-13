import config from '../../app.config';

export default async (endpoint, authToken) => {
  try {
    const response = await fetch(`${config.api_uri}${endpoint}`, {
      headers: {
        'Authorization': `sso-jwt ${authToken}`
      }
    });
    if (response.status !== 200) {
      throw new Error(response.statusText);
    }
    return response.json();
  } catch (e) {
    return { error: e.message };
  }
};