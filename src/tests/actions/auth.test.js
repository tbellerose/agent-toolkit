import { setUser, clearUser, setToken, clearToken } from '../../actions/auth';
import user from '../fixtures/user';

test('should generate setUser action object', () => {
  const action = setUser(user);
  expect(action).toEqual({
    type: 'SET_USER',
    user
  });
});

test('should generate clearUser action object', () => {
  const action = clearUser();
  expect(action).toEqual({
    type: 'CLEAR_USER'
  });
});

test('should generate setToken action object', () => {
  const token = 'abc123';
  const action = setToken(token);
  expect(action).toEqual({
    type: 'SET_TOKEN',
    token
  });
});

test('should generate clearToken action object', () => {
  const action = clearToken();
  expect(action).toEqual({
    type: 'CLEAR_TOKEN'
  });
});