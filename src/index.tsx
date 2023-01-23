import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./components/app/app";
import {  configureStore } from "@reduxjs/toolkit";
import { compose, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { reducer } from "./services/reducers/index";
import thunk from "redux-thunk";
import { socketMiddleware } from "./utils/socketMiddleware";
import {
  ordersWsActions,
  profileOrdersWsActions,
} from "./services/constants/ws";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = applyMiddleware(
  thunk,
  socketMiddleware(ordersWsActions),
  socketMiddleware(profileOrdersWsActions)
);

export const store = configureStore({
  reducer: reducer,
  enhancers: [enhancer],
});

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
