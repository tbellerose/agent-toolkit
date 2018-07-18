import config from '../../app.config';

// SET_SITES
export const setSites = (sites) => ({
  type: 'SET_SITES',
  sites
});

export const startSetSites = () => {
  return async (dispatch, getState) => {
    const authToken = getState().auth.token;
    try {
      const response = await fetch(`${config.api_uri}/sites`, {
        headers: {
          Authorization: `sso-jwt ${authToken}`
        }
      });
      if (response.status !== 200) {
        throw new Error('Invalid or expired SSO Token');
      }
      const sites = await response.json();
      dispatch(setSites(sites));
    } catch (e) {
      return e;
    }
  };
};

export const clearSites = () => ({
  type: 'CLEAR_SITES'
});
