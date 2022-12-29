import { rootReducer } from "./../services/reducers/index";
import { ThunkAction } from "redux-thunk";

import { Action, ActionCreator } from "redux";

import { store } from "../index";

import { TConstructorActions } from "../services/actions/constructor";
import { TProfileActions } from "../services/actions/profile";
import { TOrderActions } from "./../services/actions/order";
import { TFetchActions } from "./../services/actions/menu";
import { TUserActions } from "./../services/actions/user";
import { TLoginActions } from "./../services/actions/login";
import { TWsActions } from "./../services/actions/wsActions";
import { ThunkDispatch } from "@reduxjs/toolkit";

export type TApplicationActions =
  | TConstructorActions
  | TProfileActions
  | TOrderActions
  | TFetchActions
  | TUserActions
  | TLoginActions
  | TWsActions;

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<RootState, never, TApplicationActions>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  never,
  TApplicationActions
>