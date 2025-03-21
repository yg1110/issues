import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom";

import RootLayout from "./layouts/Root";
import IssuesPage from "./pages/issues";
import NewIssuesPage from "./pages/issues/new";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/:user/:repo/issues",
        element: <IssuesPage />,
      },
      {
        path: "/:user/:repo/issues/new",
        element: <NewIssuesPage />,
      },
      {
        path: "*",
        loader: async () => redirect("/yg1110/issues/issues"),
      },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
