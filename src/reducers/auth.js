export const authReducerDefaultState = {
  token: '',
  user: {
    sub: '',
    name: '',
    locale: '',
    email: '',
    preferred_username: '',
    given_name: '',
    family_name: '',
    zoneinfo: '',
    updated_at: 0,
    email_verified: false
  }
};

export default (state = authReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.user
      };
    case 'CLEAR_USER':
      return {
        ...state,
        user: {}
      };
    case 'SET_TOKEN':
      return {
        ...state,
        token: action.token
      };
    case 'CLEAR_TOKEN':
      return {
        ...state,
        token: ''
      };
    default:
      return state;
  }
};
