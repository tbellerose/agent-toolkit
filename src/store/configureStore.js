import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import authReducer from '../reducers/auth';
import sitesReducer from '../reducers/sites';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      sites: sitesReducer,
      auth: authReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  )
  return store;
};