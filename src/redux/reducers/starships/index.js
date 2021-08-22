import {
  FETCH_STARSHIPS,
  FETCH_STARSHIPS_ERROR,
  FETCH_STARSHIPS_SUCCCESS
} from "./actions";

const initialStarshipsState = {
  loading: false,
  error: null,
  data: null
};

export default function characteStarshipsReducer(
  state = initialStarshipsState,
  action
) {
  switch (action.type) {
    case FETCH_STARSHIPS:
      return {
        ...state,
        loading: true
      };

    case FETCH_STARSHIPS_SUCCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null
      };

    case FETCH_STARSHIPS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    default:
      return state;
  }
}
