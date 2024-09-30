export const CHECK_AUTH = "CHECK_AUTH";
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT_REQUEST = "LOGOUT_REQUEST";

interface CheckIfAuthenticated {
  type: typeof CHECK_AUTH;
  isAuthenticated: boolean;
}

interface LoginRequest {
  type: typeof LOGIN_REQUEST;
}

interface LoginSuccess {
  type: typeof LOGIN_SUCCESS;
}

interface LoginFailure {
  type: typeof LOGIN_FAILURE;
  payload: string;
}

interface logoutRequest {
  type: typeof LOGOUT_REQUEST;
  payload: string;
}

export type AuthActionTypes =
  | CheckIfAuthenticated
  | LoginRequest
  | LoginSuccess
  | LoginFailure
  | LoginRequest;

export const checkIfAuthenticated = (isAuthenticated: boolean): CheckIfAuthenticated => ({
  isAuthenticated,
  type: CHECK_AUTH,
});

export const loginRequest = (): AuthActionTypes => ({
  type: LOGIN_REQUEST,
});

export const loginSuccess = (): AuthActionTypes => ({
  type: LOGIN_SUCCESS,
});

export const loginFailure = (error: string): AuthActionTypes => ({
  payload: error,
  type: LOGIN_FAILURE,
});

export const logoutRequest = (): AuthActionTypes => ({
  type: LOGOUT_REQUEST,
});
