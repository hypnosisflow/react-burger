import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./components/app/app";
import { compose, legacy_createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { rootReducer } from "./services/reducers/index";
import thunk from "redux-thunk";
import { socketMiddleware } from "./utils/socketMiddleware";
import { TWsActions } from "./services/actions/wsActions";
import { ordersWsActions } from './utils/socketMiddleware'


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const wsUrl = "wss://norma.nomoreparties.space/orders/all";

const enhancer = composeEnhancers(
  applyMiddleware(thunk, socketMiddleware(wsUrl, ordersWsActions))
);

// socketMiddleware(wsUrl, WSAction)

export const store = legacy_createStore(rootReducer, enhancer);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
