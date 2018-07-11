import { setSites, clearSites } from '../../actions/sites';
import sites from '../fixtures/sites';

test('should generate setSites action object', () => {
  const action = setSites(sites);
  expect(action).toEqual({
    type: 'SET_SITES',
    sites
  });
});

test('should generate clearSites action object', () => {
  const action = clearSites();
  expect(action).toEqual({
    type: 'CLEAR_SITES'
  });
});
