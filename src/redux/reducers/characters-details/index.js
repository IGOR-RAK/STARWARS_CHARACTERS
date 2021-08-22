import { BACK_TO_DETAILS } from "../actions";
import {
  FETCH_CHARACTERS_DETAILS,
  FETCH_CHARACTERS_DETAILS_ERROR,
  FETCH_CHARACTERS_DETAILS_SUCCCESS,
  FETCH_CHARACTERS_ZERO
} from "./actions";

const initialCharactersState = {
  loading: false,
  error: null,
  data: null,
  path: "/"
};

export default function characterDetailsReducer(
  state = initialCharactersState,
  action
) {
  switch (action.type) {
    case FETCH_CHARACTERS_DETAILS:
      return {
        ...state,
        loading: true
      };

    case FETCH_CHARACTERS_ZERO:
      return {
        ...state,
        loading: false,
        error: null,
        data: null
      };

    case BACK_TO_DETAILS:
      return {
        ...state,
        path: action.payload
      };

    case FETCH_CHARACTERS_DETAILS_SUCCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null
      };

    case FETCH_CHARACTERS_DETAILS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    default:
      return state;
  }
}
