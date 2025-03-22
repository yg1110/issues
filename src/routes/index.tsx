import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom";

import RootLayout from "./layouts/Root";
import IssuesDetailPage from "./pages/issue/detail";
import IssuesPage from "./pages/issue/list";
import NewIssuesPage from "./pages/issue/new";

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
        path: "/:user/:repo/issues/:id",
        element: <IssuesDetailPage />,
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
