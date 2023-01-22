import { reducer } from '../services/reducers/index';
import { ThunkAction } from "@reduxjs/toolkit";
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook,
} from "react-redux";
import { TAppActions } from '../services/actions/indes';

import type {} from "redux-thunk/extend-redux";

export type RootState = ReturnType<typeof reducer>

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, TAppActions>; 

type AppDispatch<TReturnType = void> = (
  action: TAppActions | AppThunk<TReturnType>
) => TReturnType

export const useDispatch: () => AppDispatch = dispatchHook;
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;


