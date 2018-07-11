// Import third party libraries
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

// Import App Router
import AppRouter from './routers/AppRouter';

// Import Redux Store
import configureStore from './store/configureStore';

// Import styles
import 'normalize.css/normalize.css';
import './styles/styles.scss';

const { store, persistor } = configureStore();

const jsx = (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AppRouter />
    </PersistGate>
  </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));