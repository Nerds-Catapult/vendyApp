import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App.tsx";
import Spinner from "./components/spinner/Spinner.tsx";
import Login from "./components/customer/login.tsx";
import Signup from "./components/customer/signup.tsx";
import Profile from "./components/dashboard/profile/profile.tsx";
import CreateStore from "./components/forms/createStore.tsx";
import BusinessDashBoard from "./components/dashboard/Business/BusinessDashBoard.tsx";
import LoginStore from "./components/forms/loginStore.tsx";
import NotFound from "./components/errors/404.tsx";
import store from "./store/store.ts";
import RunErrands from "./components/forms/errandForms.tsx";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/shop",
    element: <App />, 
  },
  {
    path: "/auth/customer/login",
    element: <Login />, //done
  },
  {
    path: "/auth/customer/signup",
    element: <Signup />, //done
  },
  {
    path: "/profile", //done
    element: <Profile />,
  },
  {
    path: "/auth/createstore",
    element: <CreateStore />,
  },
  {
    path: "/admin/dashboard",
    element: <BusinessDashBoard />,
  },
  {
    path: "/auth/runerrands",
    element: <RunErrands />,
  },
  {
    path: "/auth/findstore",
    element: <LoginStore />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} fallbackElement={<Spinner />} />
    </Provider>
  </React.StrictMode>
);
