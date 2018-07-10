import { setUser, clearUser } from '../../actions/auth';
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