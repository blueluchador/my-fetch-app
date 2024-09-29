export const CHECK_IF_AUTHENTICATED = "CHECK_IF_AUTHENTICATED";
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

interface CheckIfAuthenticated {
  type: typeof CHECK_IF_AUTHENTICATED;
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

export type AuthActionTypes = CheckIfAuthenticated | LoginRequest | LoginSuccess | LoginFailure;

export const checkIfAuthenticated = (isAuthenticated: boolean): CheckIfAuthenticated => ({
  isAuthenticated,
  type: CHECK_IF_AUTHENTICATED,
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
