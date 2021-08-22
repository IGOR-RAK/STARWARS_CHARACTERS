import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import store from "./redux";
import { history } from "./redux/reducers";
import Routes from "./routes";
import "antd/dist/antd.css";

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Routes />
      </Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);
