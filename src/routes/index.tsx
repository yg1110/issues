import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom";

import RootLayout from "./layouts/Root";
import IssuesPage from "./pages/issues";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/:user/:repo/issues",
        element: <IssuesPage />,
      },
      {
        path: "*",
        loader: async () => redirect("/facebook/react/issues"),
      },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
