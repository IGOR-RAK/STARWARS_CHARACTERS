import { Route, Switch } from "react-router-dom";
import App from "./pages/App";
import Details from "./pages/Details";
import Planet from "./pages/Planet";
import Starships from "./pages/Starships";
import About from "./pages/About";

export const MAIN_ROUTE = "MAIN_ROUTE";
export const CHARACTERS_ROUTE = "CHARACTERS_MAIN_ROUTE";
export const PLANETS_ROUTE = "PLANETS_ROUTE";
export const STARSHIPS_ROUTE = "STARSHIPS_ROUTE";
export const ABOUT_ROUTE = "ABOUT_ROUTE";

export const routes = [
  {
    id: MAIN_ROUTE,
    path: "/",
    exact: true,
    component: App
  },
  {
    id: CHARACTERS_ROUTE,
    path: "/people/:id",
    exact: true,
    component: Details
  },
  {
    id: PLANETS_ROUTE,
    path: "/planets/:id",
    exact: true,
    component: Planet
  },
  {
    id: ABOUT_ROUTE,
    path: "/about",
    exact: true,
    component: About
  },
  {
    id: STARSHIPS_ROUTE,
    path: "/starships/:id",
    exact: true,
    component: Starships
  }
];

export const getRouteConfig = (id) => {
  const route = routes.find((r) => r.id === id);
  //console.log("route", route);
  if (route) {
    const { component, ...rest } = route;
    return rest;
  }
};

export default function Routes() {
  return (
    <div>
      <Switch>
        {routes.map((route) => {
          const { id, ...restProps } = route;
          return <Route key={id} {...restProps} />;
        })}
      </Switch>
    </div>
  );
}
