export const CHECK_IF_AUTHENTICATED = "login/CHECK_IF_AUTHENTICATED";

interface CheckIfAuthenticated {
  type: typeof CHECK_IF_AUTHENTICATED;
  isAuthenticated: boolean;
}

export type LoginActionTypes = CheckIfAuthenticated;

export const checkIfAuthenticated = (isAuthenticated: boolean): CheckIfAuthenticated => ({
  isAuthenticated,
  type: CHECK_IF_AUTHENTICATED,
});
