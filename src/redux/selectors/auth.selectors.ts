import { RootState } from "../store";

export const getIsAuthenticated = (state: RootState): boolean | null =>
  state.authStatus.isAuthenticated;

export const isLoginLoading = (state: RootState): boolean => state.login.loading;
