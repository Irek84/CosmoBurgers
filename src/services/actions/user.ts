import {
  passwordReset,
  setNewPassword,
  registerUser,
  loginUser,
  logoutUser,
  updateToken,
  getUser,
  updateUser,
  expiresAT,
  expiresRT,
  setCookie,
  getCookie,
  deleteCookie,
} from "../../utils/api";
import { AppDispatch, AppThunk, TOrder, TTokenBody, TUser } from "../types";
import {
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
  RESET_PASSWORD_SET_EMAIL,
  SET_NEW_PASSWORD_REQUEST,
  SET_NEW_PASSWORD_SUCCESS,
  SET_NEW_PASSWORD_FAILED,
  REFRESH_TOKEN_REQUEST,
  REFRESH_TOKEN_SUCCESS,
  REFRESH_TOKEN_FAILED,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILED,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED,
  LOGOUT_USER_REQUEST,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAILED,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,
} from "../constants/user";

export interface IResetPasswordRequestAction {
  readonly type: typeof RESET_PASSWORD_REQUEST;
}
export interface IResetPasswordSuccessAction {
  readonly type: typeof RESET_PASSWORD_SUCCESS;
  readonly response: string;
}
export interface IResetPasswordFailedAction {
  readonly type: typeof RESET_PASSWORD_FAILED;
  readonly error: string;
}
export interface IResetPasswordSetEmailAction {
  readonly type: typeof RESET_PASSWORD_SET_EMAIL;
  readonly email: string;
}

export interface ISetNewPasswordRequestAction {
  readonly type: typeof SET_NEW_PASSWORD_REQUEST;
}
export interface ISetNewPasswordSuccessAction {
  readonly type: typeof SET_NEW_PASSWORD_SUCCESS;
  readonly response: string;
}
export interface ISetNewPasswordFailedAction {
  readonly type: typeof SET_NEW_PASSWORD_FAILED;
  readonly error: string;
}

export interface IRefreshTokenRequestAction {
  readonly type: typeof REFRESH_TOKEN_REQUEST;
}
export interface IRefreshTokenSuccessAction {
  readonly type: typeof REFRESH_TOKEN_SUCCESS;
  readonly user: TUser;
}
export interface IRefreshTokenFailedAction {
  readonly type: typeof REFRESH_TOKEN_FAILED;
}

export interface IRegisterUserRequestAction {
  readonly type: typeof REGISTER_USER_REQUEST;
}
export interface IRegisterUserSuccessAction {
  readonly type: typeof REGISTER_USER_SUCCESS;
}
export interface IRegisterUserFailedAction {
  readonly type: typeof REGISTER_USER_FAILED;
}

export interface ILoginUserRequestAction {
  readonly type: typeof LOGIN_USER_REQUEST;
}
export interface ILoginUserSuccessAction {
  readonly type: typeof LOGIN_USER_SUCCESS;
  readonly name: string;
  readonly email: string;
}
export interface ILoginUserFailedAction {
  readonly type: typeof LOGIN_USER_FAILED;
}

export interface ILogoutUserRequestAction {
  readonly type: typeof LOGOUT_USER_REQUEST;
}
export interface ILogoutUserSuccessAction {
  readonly type: typeof LOGOUT_USER_SUCCESS;
  readonly message: string;
}
export interface ILogoutUserFailedAction {
  readonly type: typeof LOGOUT_USER_FAILED;
}

export interface IGetUserRequestAction {
  readonly type: typeof GET_USER_REQUEST;
}
export interface IGetUserSuccessAction {
  readonly type: typeof GET_USER_SUCCESS;
  readonly user: TUser;
}
export interface IGetUserFailedAction {
  readonly type: typeof GET_USER_FAILED;
}

export interface IUpdateUserRequestAction {
  readonly type: typeof UPDATE_USER_REQUEST;
}
export interface IUpdateUserSuccessAction {
  readonly type: typeof UPDATE_USER_SUCCESS;
  readonly user: TUser;
}
export interface IUpdateUserFailedAction {
  readonly type: typeof UPDATE_USER_FAILED;
}

export type TUserActions =
  | IResetPasswordRequestAction
  | IResetPasswordSuccessAction
  | IResetPasswordFailedAction
  | IResetPasswordSetEmailAction
  | ISetNewPasswordRequestAction
  | ISetNewPasswordSuccessAction
  | ISetNewPasswordFailedAction
  | IRefreshTokenRequestAction
  | IRefreshTokenSuccessAction
  | IRefreshTokenFailedAction
  | IRegisterUserRequestAction
  | IRegisterUserSuccessAction
  | IRegisterUserFailedAction
  | ILoginUserRequestAction
  | ILoginUserSuccessAction
  | ILoginUserFailedAction
  | ILogoutUserRequestAction
  | ILogoutUserSuccessAction
  | ILogoutUserFailedAction
  | IGetUserRequestAction
  | IGetUserSuccessAction
  | IGetUserFailedAction
  | IUpdateUserRequestAction
  | IUpdateUserSuccessAction
  | IUpdateUserFailedAction;

export const resetPasswordEnhancer: AppThunk = (email: string) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: RESET_PASSWORD_REQUEST,
    });
    passwordReset(email)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: RESET_PASSWORD_SUCCESS,
            response: res.message,
          });
        } else {
          dispatch({
            type: RESET_PASSWORD_FAILED,
            error: res.message,
          });
        }
      })
      .catch((err) => {
        console.error(err);
        dispatch({
          type: RESET_PASSWORD_FAILED,
          error: err.message,
        });
      });
  };
};

export const setNewPasswordEnhancer: AppThunk = (newPassword: string, token: string) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: SET_NEW_PASSWORD_REQUEST,
    });
    setNewPassword(newPassword, token)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: SET_NEW_PASSWORD_SUCCESS,
            response: res,
          });
        } else {
          dispatch({
            type: SET_NEW_PASSWORD_FAILED,
            error: "Не удалось изменить пароль"
          });
        }
      })
      .catch((err) => {
        console.error(err);
        dispatch({
          type: SET_NEW_PASSWORD_FAILED,
          error: err.message,
        });
      });
  };
};

export const registerUserEnhancer: AppThunk = (email: string, password: string, name: string) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: REGISTER_USER_REQUEST,
    });
    registerUser(email, password, name)
      .then((res) => {
        if (res && res.success) {
          setCookie("refreshToken", res.refreshToken, expiresRT);
          setCookie("accessToken", res.accessToken, expiresAT);

          dispatch({
            type: REGISTER_USER_SUCCESS,
          });
        } else {
          dispatch({
            type: REGISTER_USER_FAILED,
          });
        }
      })
      .catch((err) => {
        console.error(err);
        dispatch({
          type: REGISTER_USER_FAILED,
          error: err.message,
        });
      });
  };
};

export const loginUserEnhancer: AppThunk = (email: string, password: string) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: LOGIN_USER_REQUEST,
    });
    loginUser(email, password)
      .then((res) => {
        if (res && res.success) {
          setCookie("refreshToken", res.refreshToken, expiresRT);
          setCookie("accessToken", res.accessToken, expiresAT);

          dispatch({
            type: LOGIN_USER_SUCCESS,
            name: res.user.name,
            email: res.user.email,
          });
        } else {
          dispatch({
            type: LOGIN_USER_FAILED,
          });
        }
      })
      .catch((err) => {
        console.error(err);
        dispatch({
          type: LOGIN_USER_FAILED,
          error: err.message,
        });
      });
  };
};

export const logoutUserEnhancer: AppThunk = () => {
  return function (dispatch: AppDispatch) {
    const tokenBody: TTokenBody = { token: getCookie("refreshToken") };
    dispatch({
      type: LOGOUT_USER_REQUEST,
    });
    logoutUser(tokenBody)
      .then((res) => {
        if (res && res.success) {
          deleteCookie("accessToken");
          deleteCookie("refreshToken");

          dispatch({
            type: LOGOUT_USER_SUCCESS,
            message: res.message,
          });
        } else {
          dispatch({
            type: LOGOUT_USER_FAILED,
          });
        }
      })
      .catch((err) => {
        console.error(err);
        dispatch({
          type: LOGOUT_USER_FAILED,
          error: err.message,
        });
      });
  };
};

export const updateTokenEnhancer: AppThunk = () => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: REFRESH_TOKEN_REQUEST,
    });
    updateToken()
      .then((res) => {
        if (res && res.success) {
          setCookie("refreshToken", res.refreshToken, expiresRT);
          setCookie("accessToken", res.accessToken, expiresAT);
          dispatch({
            type: REFRESH_TOKEN_SUCCESS,
            user: res.user,
          });
        } else {
          dispatch({
            type: REFRESH_TOKEN_FAILED,
          });
        }
      })
      .catch((err) => {
        deleteCookie("accessToken");
        deleteCookie("refreshToken");
        dispatch({
          type: REFRESH_TOKEN_FAILED,
        });
      });
  };
};

export const getUserEnhancer: AppThunk = () => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: GET_USER_REQUEST,
    });
    getUser()
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: GET_USER_SUCCESS,
            user: res.user,
          });
        } else {
          throw res;
        }
      })
      .catch((res) => {
        dispatch({
          type: GET_USER_FAILED,
        });
      });
  };
};

export const updateUserEnhancer: AppThunk = (name: string, email: string, password: string) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: UPDATE_USER_REQUEST,
    });
    const data = {
      name: name,
      email: email,
      password: password,
    };
    updateUser(data)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: UPDATE_USER_SUCCESS,
            user: res.user,
          });
        } else {
          throw res;
        }
      })
      .catch((res) => {
        dispatch({
          type: UPDATE_USER_FAILED,
        });
      });
  };
};

export const checkUserAuth: AppThunk = () => {
  return function (dispatch: AppDispatch) {
    const isAccessTokenExist = document.cookie.indexOf("accessToken=") !== -1;
    const isRefreshTokenExist = document.cookie.indexOf("refreshToken=") !== -1;
    if (!isAccessTokenExist && isRefreshTokenExist) {
      dispatch({
        type: REFRESH_TOKEN_REQUEST,
      });
      updateToken()
        .then((res) => {
          if (res && res.success) {
            setCookie("refreshToken", res.refreshToken, expiresRT);
            setCookie("accessToken", res.accessToken, expiresAT);
            dispatch({
              type: REFRESH_TOKEN_SUCCESS,
              user: res.user,
            });
          } else {
            dispatch({
              type: REFRESH_TOKEN_FAILED,
            });
          }
        })
        .catch((err) => {
          deleteCookie("accessToken");
          deleteCookie("refreshToken");
          dispatch({
            type: REFRESH_TOKEN_FAILED,
          });
        });
    }
    if (isAccessTokenExist && isRefreshTokenExist) {
      dispatch({
        type: GET_USER_REQUEST,
      });
      getUser()
        .then((res) => {
          if (res && res.success) {
            dispatch({
              type: GET_USER_SUCCESS,
              user: res.user,
            });
          } else {
            throw res;
          }
        })
        .catch((res) => {
          dispatch({
            type: GET_USER_FAILED,
          });
        });
    }
  };
};
