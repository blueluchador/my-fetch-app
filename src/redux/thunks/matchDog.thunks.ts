import { ThunkAction } from "redux-thunk";

import { dogMatchApi } from "../../api";
import { DogMatch } from "../../models";
import { MatchDogActionTypes, matchDogFailure, matchDogRequest, matchDogSuccess } from "../actions";
import { RootState } from "../store";

export const fetchDogMatch = (
  dogs: string[],
): ThunkAction<Promise<void>, RootState, unknown, MatchDogActionTypes> => {
  return async (dispatch) => {
    dispatch(matchDogRequest());

    try {
      const match: DogMatch = await dogMatchApi(dogs);
      dispatch(matchDogSuccess(match));
    } catch (error) {
      dispatch(matchDogFailure((error as Error).message));
    }
  };
};
