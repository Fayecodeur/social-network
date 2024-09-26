import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import Dashboard from "./Pages/Dashboard.jsx";
import Connexion from "./Pages/Connexion.jsx";
import Inscription from "./Pages/Inscription.jsx";
import { Toaster } from "react-hot-toast";

const routes = createBrowserRouter([
  {
    path: "/",
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
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Toaster />
    <RouterProvider router={routes}></RouterProvider>
  </StrictMode>
);
