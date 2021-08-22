import {
  all,
  put,
  takeEvery,
  call,
  take,
  delay,
  takeLatest,
  takeLeading,
  fork,
  spawn,
  join,
  apply,
  select
} from "redux-saga/effects";

import { selectCharacters } from "../../reducers/characters/selectors";

import {
  FETCH_CHARACTERS,
  FETCH_CHARACTERS_SUCCCESS,
  FETCH_CHARACTERS_ERROR
} from "../../reducers/characters/actions";

import { LOCATION_CHANGE } from "connected-react-router";
import { matchPath } from "react-router";
import {
  getRouteConfig,
  MAIN_ROUTE,
  CHARACTERS_ROUTE,
  PLANETS_ROUTE,
  STARSHIPS_ROUTE
} from "../../../routes";
import {
  FETCH_CHARACTERS_DETAILS,
  FETCH_CHARACTERS_DETAILS_ERROR,
  FETCH_CHARACTERS_DETAILS_SUCCCESS,
  FETCH_CHARACTERS_ZERO
} from "../../reducers/characters-details/actions";
import {
  FETCH_PLANETS,
  FETCH_PLANETS_SUCCCESS,
  FETCH_PLANETS_ERROR
} from "../../reducers/planets/actions";
import { BACK_TO_DETAILS, BACK_TO_DETAILS_SAGA } from "../../reducers/actions";
import {
  FETCH_STARSHIPS,
  FETCH_STARSHIPS_ERROR,
  FETCH_STARSHIPS_SUCCCESS
} from "../../reducers/starships/actions";

export function* backToDretails({ payload }) {
  yield put({
    type: BACK_TO_DETAILS
    // payload: false
  });
}

export function* fetchCharactersDetail({ payload }) {
  const { id } = payload;
  try {
    const req = yield call(fetch, `https://swapi.dev/api/people/${id}`);
    const data = yield apply(req, req.json);

    yield put({
      type: FETCH_CHARACTERS_DETAILS_SUCCCESS,
      payload: data
    });
  } catch (e) {
    yield put({
      type: FETCH_CHARACTERS_DETAILS_ERROR,
      payload: e
    });
  }
}

export function* fetchPlanets({ payload }) {
  const { id } = payload;
  try {
    const req = yield call(fetch, `https://swapi.dev/api/planets/${id}`);
    const data = yield apply(req, req.json);
    yield console.log(data);

    yield put({
      type: FETCH_PLANETS_SUCCCESS,
      payload: data
    });
  } catch (e) {
    yield put({
      type: FETCH_PLANETS_ERROR,
      payload: e
    });
  }
}

export function* fetchStarships({ payload }) {
  const { id } = payload;
  try {
    const req = yield call(fetch, `https://swapi.dev/api/starships/${id}`);
    const data = yield apply(req, req.json);
    yield console.log(data);

    yield put({
      type: FETCH_STARSHIPS_SUCCCESS,
      payload: data
    });
  } catch (e) {
    yield put({
      type: FETCH_STARSHIPS_ERROR,
      payload: e
    });
  }
}

export function* fetchCharactersList({ payload }) {
  const { page, search } = payload;
  try {
    const req = yield call(
      fetch,
      `https://swapi.dev/api/people?page=${page}&search=${search}`
    );
    const data = yield apply(req, req.json);

    yield put({
      type: FETCH_CHARACTERS_SUCCCESS,
      payload: data
    });
  } catch (e) {
    yield put({
      type: FETCH_CHARACTERS_ERROR,
      payload: e
    });
  }
}

export function* routeChangeSaga() {
  while (true) {
    const action = yield take(LOCATION_CHANGE);
    //console.log("Route Action", action.payload.location.pathname);
    //--------------------------------------------------------------------
    const mainPage = matchPath(
      action.payload.location.pathname,
      getRouteConfig(MAIN_ROUTE)
    );

    if (mainPage) {
      const state = yield select(selectCharacters);

      const { page, search } = state;

      yield put({
        type: FETCH_CHARACTERS,
        payload: { page, search }
      });
      yield put({
        type: FETCH_CHARACTERS_ZERO
      });
    }

    //----------------------------------------

    const detailsPage = matchPath(
      action.payload.location.pathname,
      getRouteConfig(CHARACTERS_ROUTE)
    );

    if (detailsPage) {
      console.log("d >>", detailsPage);
      const { id } = detailsPage.params;
      console.log("d >> paiload_id", id);
      if (id) {
        yield put({
          type: FETCH_CHARACTERS_DETAILS,
          payload: { id }
        });
      }
    }

    //------------------------------------

    const planetPage = matchPath(
      action.payload.location.pathname,
      getRouteConfig(PLANETS_ROUTE)
    );

    if (planetPage) {
      console.log("d >>", planetPage);
      const { id } = planetPage.params;
      console.log("d >> payload_id", id);
      if (id) {
        yield put({
          type: FETCH_PLANETS,
          payload: { id }
        });
      }
    }

    //------------------------------------------

    const starshipsPage = matchPath(
      action.payload.location.pathname,
      getRouteConfig(STARSHIPS_ROUTE)
    );

    if (starshipsPage) {
      console.log("d >>", starshipsPage);
      const { id } = starshipsPage.params;
      console.log("d >> payload_id", id);
      if (id) {
        yield put({
          type: FETCH_STARSHIPS,
          payload: { id }
        });
        yield put({
          type: FETCH_CHARACTERS_ZERO
        });
      }
    }

    //-----------------------------------------------------
  }
}

export default function* charactersWatcher() {
  yield fork(routeChangeSaga);
  yield takeLatest(FETCH_CHARACTERS, fetchCharactersList);
  yield takeLatest(FETCH_CHARACTERS_DETAILS, fetchCharactersDetail);
  yield takeLatest(FETCH_PLANETS, fetchPlanets);
  yield takeLatest(FETCH_STARSHIPS, fetchStarships);
  yield takeLatest(BACK_TO_DETAILS_SAGA, backToDretails);
}
