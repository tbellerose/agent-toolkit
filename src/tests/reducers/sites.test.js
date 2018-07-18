import sitesReducer from '../../reducers/sites';
import sites from '../fixtures/sites';

test('should set default sites state', () => {
  const state = sitesReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual([]);
});

test('should set sites', () => {
  const action = {
    type: 'SET_SITES',
    sites
  };
  const state = sitesReducer(null, action);
  expect(state).toEqual(action.sites);
});

test('should clear sites', () => {
  let state = sites;
  const action = {
    type: 'CLEAR_SITES'
  };
  state = sitesReducer(null, action);
  expect(state).toEqual([]);
});
