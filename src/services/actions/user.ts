import {
  AUTH_CHECKED,
  AUTH_FAILED,
  SET_USER_REQUEST,
  SET_USER_SUCCESS,
} from "../constants/profile";
import {
  refreshToken,
  BASE_URL,
  fetchWithRefresh,
} from "../../utils/api";
import { getCookie, setCookie } from "../../utils/utils";
import { TForm } from "../../utils/types";
import { AppThunk } from "../../utils/store-type";

// auth section
export type TAuthCheckAction = {
  readonly type: typeof AUTH_CHECKED;
  readonly authChecked: boolean;
};

export type TAuthFailedAction = {
  readonly type: typeof AUTH_FAILED;
};

export const authCheckAction = (authChecked: boolean): TAuthCheckAction => ({
  type: AUTH_CHECKED,
  authChecked,
});

export const authFailedAcion = (): TAuthFailedAction => ({
  type: AUTH_FAILED,
});

// setting user section

export type TUserAction = {
  readonly type: typeof SET_USER_REQUEST;
};

export type TUserSuccessAction = {
  readonly type: typeof SET_USER_SUCCESS;
  readonly user?: TForm;
  readonly payload?: TForm;
  readonly data?: TForm;
};

export type TUserActions =
  | TUserAction
  | TUserSuccessAction
  | TAuthCheckAction
  | TAuthFailedAction;

export const setUserAction = (): TUserAction => ({
  type: SET_USER_REQUEST,
});

export const setUserSuccessAction = (
  user: TForm,
): TUserSuccessAction => ({
  type: SET_USER_SUCCESS,
  user,
});

// functions

// export const checkUserAuth = (): AppThunk => (dispatch) => {
//   if (getCookie("accessToken")) {
//     dispatch(getUser())
//       .finally(() => {
//         dispatch({ type: AUTH_CHECKED, authChecked: true });
//       })
//       .catch((err: string) => {
//         dispatch({ type: AUTH_FAILED, payload: err });
//       });
//   }
// };

export interface ITokens {
  refreshToken: string;
  accessToken: string;
  res?: unknown;
}

export function saveTokens(tokens: ITokens): void {
  setCookie("accessToken", tokens.refreshToken);
  localStorage.setItem("refreshToken", tokens.accessToken);
  console.log("Tokens", tokens);
}

export const updateToken = (): AppThunk => {
  return function (dispatch) {
    refreshToken()
      .then((res) => {
        dispatch(setUserAction());
        console.log("Tokens updated");
      })
      .catch((err) => {
        console.log("Token Update Error", err);
      });
  };
};

interface IUser {
  name: string;
  email: string;
}

interface IGetUser {
  user: IUser;
  res: null;
}

export function getUser(): AppThunk {
  return function (dispatch) {
    fetchWithRefresh(`${BASE_URL}auth/user`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: getCookie("accessToken"),
      } as HeadersInit,
    })
      .then((res) => {
        dispatch(setUserSuccessAction(res.user));
      })
      .catch((error) => {
        console.log('Error get user', error);
      });
  };
}
