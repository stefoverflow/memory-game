import Home from "pages/Home";
import Game from "pages/Game";
import redirect from "router/modules/redirect";
import Scoreboard from "pages/Scoreboard";

const routes = [
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/game",
    component: Game,
  },
  {
    path: "/scoreboard",
    component: Scoreboard,
  },
  {
    path: "/",
    component: redirect("/home"),
  },
  {
    path: "*",
    component: redirect("/home", true),
  },
];

export default routes;
