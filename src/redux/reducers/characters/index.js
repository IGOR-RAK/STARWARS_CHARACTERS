import {
  FETCH_CHARACTERS,
  FETCH_CHARACTERS_SUCCCESS,
  FETCH_CHARACTERS_ERROR
} from "./actions";

const initialCharactersState = {
  page: 1,
  search: "",
  loading: false,
  error: null,
  data: null
  // data:{
  //   total: 0,
  //   results:[]
  // }
};

export default function characterReducer(
  state = initialCharactersState,
  action
) {
  switch (action.type) {
    case FETCH_CHARACTERS:
      const { page, search } = action.payload;
      return {
        ...state,
        loading: true,
        page,
        search
      };

    case FETCH_CHARACTERS_SUCCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload
      };

    case FETCH_CHARACTERS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    default:
      return state;
  }
}
