import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { createBrowserHistory } from "history";
import charactersReducer from "./characters";
import characterDetailsReducer from "./characters-details";
import charactePlanetsReducer from "./planets";
import BACK_TO_DETAILS from "./actions";
import characteStarshipsReducer from "./starships";

export const history = createBrowserHistory();

const initial = {
  detailPath: ""
};

export function appReducer(state = initial, action) {
  switch (action.type) {
    case BACK_TO_DETAILS:
      return {
        ...state,
        detailPath: action.payload
      };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  //app: appReducer,
  starships: characteStarshipsReducer,
  planets: charactePlanetsReducer,
  characters: charactersReducer,
  details: characterDetailsReducer,
  router: connectRouter(history)
});

export default rootReducer;
