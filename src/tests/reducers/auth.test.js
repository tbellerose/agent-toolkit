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

test('should set token', () => {
  const token = 'abc123';
  const action = {
    type: 'SET_TOKEN',
    token
  };
  const state = authReducer({}, action);
  expect(state.token).toBe(token);
});

test('should clear token', () => {
  let state = { token: '123' };
  const action = {
    type: 'CLEAR_TOKEN'
  };
  state = authReducer(state, action);
  expect(state.token).toBe('');
});