import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./Pages/Dashboard.jsx";
import Connexion from "./Pages/Connexion.jsx";
import Inscription from "./Pages/Inscription.jsx";
import Page404 from "./Pages/Page404.jsx";
import { Toaster } from "react-hot-toast";

const routes = createBrowserRouter([
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/connexion",
    element: <Connexion />,
  },
  {
    path: "/inscription",
    element: <Inscription />,
  },
  {
    path: "*",
    element: <Page404 />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Toaster />
    <RouterProvider router={routes}></RouterProvider>
  </StrictMode>
);
