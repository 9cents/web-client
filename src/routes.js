// import React from "react";
// import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout, LoginLayout } from "./layouts";

// Route Views
import Login from "./views/Login";
import Overview from "./views/Overview";
import Questions from "./views/Questions";
import Responses from "./views/Responses";
import Assignments from "./views/Assignments";
import Progress from "./views/Progress";
import Instructions from "./views/Instructions";
import Logout from "./views/Logout";

export default [
  {
    path: "/",
    layout: LoginLayout,
    component: Login,
    //component: () => <Redirect to="/blog-overview" />
  },
  {
    path: "/overview",
    layout: DefaultLayout,
    component: Overview,
  },
  {
    path: "/progress",
    layout: DefaultLayout,
    component: Progress,
  },
  {
    path: "/questions",
    layout: DefaultLayout,
    component: Questions,
  },
  {
    path: "/responses",
    layout: DefaultLayout,
    component: Responses,
  },
  {
    path: "/assignments",
    layout: DefaultLayout,
    component: Assignments,
  },
  {
    path: "/instructions",
    layout: DefaultLayout,
    component: Instructions,
  },
  {
    path: "/logout",
    layout: DefaultLayout,
    component: Logout,
  },
];
