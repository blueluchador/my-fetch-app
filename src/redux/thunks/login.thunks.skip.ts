// fetchIsAuthenticated.test.ts
import configureMockStore from "redux-mock-store";
import thunk, { ThunkMiddleware } from "redux-thunk";

import { userSessionExists } from "../../utils";
import { checkIfAuthenticated, LoginActionTypes } from "../actions";
import { RootState } from "../store"; // Ensure you're importing RootState correctly

import { fetchIsAuthenticated } from "./login.thunks";

// Mock the utils module
jest.mock("../../utils");

// // Define the middleware
// const middlewares = [thunk as unknown as ThunkMiddleware<RootState, LoginActionTypes>];
// const mockStore = configureMockStore<RootState>(middlewares); // Use RootState here

// describe("fetchIsAuthenticated", () => {
//   it("should dispatch checkIfAuthenticated with true when userSessionExists returns true", async () => {
//     (userSessionExists as jest.Mock).mockReturnValue(true); // Mock the return value

//     const store = mockStore({ login: { isAuthenticated: false } }); // Initialize store state

//     await store.dispatch(fetchIsAuthenticated());

//     const actions = store.getActions(); // Get the dispatched actions
//     const expectedAction = checkIfAuthenticated(true);

//     expect(actions).toEqual([expectedAction]); // Check if the correct action was dispatched
//   });

//   it("should dispatch checkIfAuthenticated with false when userSessionExists returns false", async () => {
//     (userSessionExists as jest.Mock).mockReturnValue(false); // Mock the return value

//     const store = mockStore({ login: { isAuthenticated: false } }); // Initialize store state

//     await store.dispatch(fetchIsAuthenticated());

//     const actions = store.getActions(); // Get the dispatched actions
//     const expectedAction = checkIfAuthenticated(false);

//     expect(actions).toEqual([expectedAction]); // Check if the correct action was dispatched
//   });
// });
