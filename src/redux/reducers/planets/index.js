import {
  FETCH_PLANETS,
  FETCH_PLANETS_SUCCCESS,
  FETCH_PLANETS_ERROR
} from "./actions";

const initialCharactersState = {
  loading: false,
  error: null,
  data: null
};

export default function charactePlanetsReducer(
  state = initialCharactersState,
  action
) {
  switch (action.type) {
    case FETCH_PLANETS:
      return {
        ...state,
        loading: true
      };

    case FETCH_PLANETS_SUCCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null
      };

    case FETCH_PLANETS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    default:
      return state;
  }
}
