// import React from "react";
// import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout, LoginLayout } from "./layouts";

// Route Views
import Login from "./views/Login";
import BlogOverview from "./views/BlogOverview";
import UserProfileLite from "./views/UserProfileLite";
import AddNewPost from "./views/AddNewPost";
import Errors from "./views/Errors";
import ComponentsOverview from "./views/ComponentsOverview";
import Tables from "./views/Tables";
import BlogPosts from "./views/BlogPosts";
import Questions from "./views/Questions";
import Responses from "./views/Responses";
import Assignments from "./views/Assignments";
import Progress from "./views/Progress";

export default [
  {
    path: "/",
    layout: LoginLayout,
    component: Login
    //component: () => <Redirect to="/blog-overview" />
  },
  {
    path: "/blog-overview",
    layout: DefaultLayout,
    component: BlogOverview
  },
  {
    path: "/user-profile-lite",
    layout: DefaultLayout,
    component: UserProfileLite
  },
  {
    path: "/add-new-post",
    layout: DefaultLayout,
    component: AddNewPost
  },
  {
    path: "/errors",
    layout: DefaultLayout,
    component: Errors
  },
  {
    path: "/components-overview",
    layout: DefaultLayout,
    component: ComponentsOverview
  },
  {
    path: "/tables",
    layout: DefaultLayout,
    component: Tables
  },
  {
    path: "/blog-posts",
    layout: DefaultLayout,
    component: BlogPosts
  },
  {
    path: "/questions",
    layout: DefaultLayout,
    component: Questions
  },
  {
    path: "/responses",
    layout: DefaultLayout,
    component: Responses
  },
  {
    path: "/assignments",
    layout: DefaultLayout,
    component: Assignments
  },
  {
    path: "/progress",
    layout: DefaultLayout,
    component: Progress
  }
];
