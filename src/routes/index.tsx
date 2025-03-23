import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom";

import RootLayout from "./layouts/Root";
import IssuesCreatePage from "./pages/issue/create";
import IssuesDetailPage from "./pages/issue/detail";
import IssuesEditPage from "./pages/issue/edit";
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
        path: "/:user/:repo/issue/create",
        element: <IssuesCreatePage />,
      },
      {
        path: "/:user/:repo/issue/:id",
        element: <IssuesDetailPage />,
      },
      {
        path: "/:user/:repo/issue/:id/edit",
        element: <IssuesEditPage />,
      },
      {
        path: "*",
        loader: async () => redirect("/yg1110/issues/issues?state=open"),
      },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
