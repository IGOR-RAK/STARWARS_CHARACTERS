import { spawn, all } from "redux-saga/effects";

import charactersWatcher from "./characters";

export default function* rootSaga() {
  const sagas = [charactersWatcher];

  yield all(sagas.map((s) => spawn(s)));
}
