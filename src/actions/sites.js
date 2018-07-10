import config from '../../app.config';

// SET_SITES
export const setSites = (sites) => ({
  type: 'SET_SITES',
  sites
});

export const startSetSites = () => {
  return async (dispatch, getState) => {
    const authToken = getState().auth.token;
    const response = await fetch(`${config.api_uri}/sites`, {
      headers: {
        'Authorization': `sso-jwt ${authToken}`
      }
    });
    const sites = await response.json();
    dispatch(setSites(sites));
  };
};

export const clearSites = () => ({
  type: 'CLEAR_SITES'
});