export default (state = [], action) => {
  switch (action.type) {
    case 'SET_SITES':
      return action.sites;
    case 'CLEAR_SITES':
      return [];
    default:
      return state;
  }
};
