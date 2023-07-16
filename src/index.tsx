import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {
  createBrowserRouter,
  RouterProvider,
  redirect,
  Navigate
} from "react-router-dom";
import NotFounds from "@/pages/NotFounds";
import Home from "@/pages/Home";
import TempPage from "@/pages/TempPage";
import TableTest from "@/pages/TableTest";
import NeedLoginPage from "@/pages/NeedLoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import TableComponentTest from "./pages/TableComponentTest";

//description

import Button from "@/description/Button/";
import Input from "@/description/Input";
import StatusInput from "@/description/Input/StatusInput";
import Modal from "@/description/Modal";
import Popup from "@/description/Popup";
import Table from "@/description/Table";
import FixedComponent from "@/description/FixedComponent";
import ProtectedRouteDes from "@/description/ProtectedRoute";
import CustomCheckBoxArea from "@/description/CustomCheckBox/index";
const router = createBrowserRouter([
  {
    index: true, // <-- match on parent, i.e. "/"
    element: <Navigate to="/home" replace /> // <-- redirect
  },

  {
    path: "/",
    element: <App></App>,
    errorElement: <NotFounds />,
    children: [
      {
        path: "home",
        element: <Home />
      },
      {
        element: <TempPage />,
        path: "temp"
      },
      {
        element: <TableTest />,
        path: "TableTest"
      },
      {
        element: <TableComponentTest />,
        path: "TableComponentTest"
      },
      {
        element: (
          <ProtectedRoute>
            <NeedLoginPage />
          </ProtectedRoute>
        ),
        path: "needLogin"
      },
      {
        element: <NotFounds />,
        path: "*"
      }
    ]
  },
  {
    path: "/demo",
    element: <App></App>,
    errorElement: <NotFounds />,
    children: [
      {
        path: "Button",
        element: <Button />
      },
      {
        path: "Input",
        element: <Input />
      },
      {
        path: "StatusInput",
        element: <StatusInput />
      },
      {
        path: "Modal",
        element: <Modal />
      },
      {
        path: "Popup",
        element: <Popup />
      },
      {
        path: "Table",
        element: <Table />
      },
      {
        path: "CustomCheckBoxArea",
        element: <CustomCheckBoxArea />
      },
      {
        path: "Protect",
        element: <ProtectedRouteDes />
      },
      {
        path: "FixedComponent",
        element: <FixedComponent />
      }
    ]
  }
]);
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
