export default (state = {}, action) => {
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
      }
    case 'CLEAR_TOKEN':
      return {
        ...state,
        token: ''
      };
    default:
      return state;
  }
};