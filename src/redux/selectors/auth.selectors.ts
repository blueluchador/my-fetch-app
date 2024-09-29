import { RootState } from "../store";

export const getIsAuthenticated = (state: RootState): boolean => state.authStatus.isAuthenticated;
