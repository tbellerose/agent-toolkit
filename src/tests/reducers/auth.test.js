import authReducer from '../../reducers/auth';
import user from '../fixtures/user';

test('should set user', () => {
  const action = {
    type: 'SET_USER',
    user
  };
  const state = authReducer({}, action);
  expect(state.user).toEqual(action.user);
});

test('should clear user', () => {
  let state = { user };
  const action = { type: 'CLEAR_USER' };
  state = authReducer(state, action);
  expect(state.user).toEqual({});
});