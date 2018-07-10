import authReducer from '../../reducers/auth';

test('should set user', () => {
  const action = {
    type: 'SET_USER',
    user: { name: 'Test User', email: 'test@test.com', email_verified: false }
  };
  const state = authReducer({}, action);
  expect(state.user).toEqual(action.user);
});