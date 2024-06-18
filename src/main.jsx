import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import "./index.css";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import LoginPageAdmin from "./pages/LoginPageAdmin";
import Notification from "./pages/Notification";
import DashboardLayout from "./layout/DashboardLayout";
import { Provider } from "react-redux";
import store, { persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import NewPost from "./pages/NewPost";
import Guide from "./pages/Guide";
import PostDetail from "./pages/PostDetail";
import Profile from "./pages/Dashboard/Profile";
import PostCentral from "./pages/Dashboard/PostCentral";
import ChangePassword from "./pages/Dashboard/ChangePassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/login-admin",
        element: <LoginPageAdmin />,
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
      {
        path: "/new-post",
        element: <NewPost />,
      },
      {
        path: "guide",
        element: <Guide />,
      },
      {
        path: "post/:id",
        element: <PostDetail />,
      },
      {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
          {
            path: "notification",
            element: <Notification />,
          },
          {
            path: "your-profile",
            element: <Profile />,
          },
          {
            path: "post-central",
            element: <PostCentral />,
          },
          {
            path: "change-password",
            element: <ChangePassword />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <RouterProvider router={router} />
  </>
);
