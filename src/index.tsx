import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import  App  from './components/app/app';
import { compose, legacy_createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from './services/reducers/index';
import thunk from 'redux-thunk';

const composeEnhancers =
   typeof window === 'object' &&
   (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
   (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
}) : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

const store = legacy_createStore(rootReducer, enhancer);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  // </React.StrictMode>
);
