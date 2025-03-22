import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom";

import RootLayout from "./layouts/Root";
import IssuesCreatePage from "./pages/issue/create";
import IssuesDetailPage from "./pages/issue/detail";
import IssuesPage from "./pages/issue/list";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/:user/:repo/issues",
        element: <IssuesPage />,
      },
      {
        path: "/:user/:repo/issues/create",
        element: <IssuesCreatePage />,
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
