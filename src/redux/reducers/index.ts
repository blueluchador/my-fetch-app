/* eslint-disable sort-keys */
import { combineReducers } from "@reduxjs/toolkit";

import { authStatusReducer } from "./authStatus.reducer";
import { dogBreedsReducer } from "./dogBreeds.reducer";
import { dogsReducer } from "./dogs.reducer";
import { dogSearchReducer } from "./dogSearch.reducers";
import { favoritesReducer } from "./favorites.reducer";
import { loginReducer } from "./login.reducer";
import { matchDogReducer } from "./matchDog.reducer";

export const reducers = combineReducers({
  authStatus: authStatusReducer,
  dogBreeds: dogBreedsReducer,
  dogSearch: dogSearchReducer,
  dogs: dogsReducer,
  favorites: favoritesReducer,
  login: loginReducer,
  matchDog: matchDogReducer,
});
