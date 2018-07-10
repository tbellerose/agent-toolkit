import { setUser } from '../../actions/auth';

test('should generate setUser action object', () => {
  const user = {
    name: 'Test User',
    email: 'test@test.com'
  };
  const action = setUser(user);
  expect(action).toEqual({
    type: 'SET_USER',
    user
  });
});