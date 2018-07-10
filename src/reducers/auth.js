export default (state = {}, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        user: action.user
      };
    default:
      return state;
  }
};