import config from '../../app.config';

export const getAPI = async (endpoint, authToken) => {
  try {
    const response = await fetch(`${config.api_uri}${endpoint}`, {
      headers: {
        'Authorization': `sso-jwt ${authToken}`
      }
    });
    if (response.status !== 200) {
      const error = await response.json();
      throw new Error(error.id);
    }
    return response.json();
  } catch (e) {
    return { error: e.message };
  }
};

export const deleteAPI = async (endpoint, authToken, body) => {
  try {
    const response = await fetch(`${config.api_uri}${endpoint}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `sso-jwt ${authToken}`,
        'Content-Type': 'application/json'
      }
    });
    if (response.status !== 204) {
      const error = await response.json();
      throw new Error(error.id);
    }
    return response;
  } catch (e) {
    return { error: e.message };
  }
};