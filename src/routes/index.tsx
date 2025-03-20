import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";

import RootLayout from "./layouts/Root";
import IssuesPage from "./pages/issues";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <IssuesPage />,
      },
      {
        path: "*",
        loader: async () => redirect("/"),
      },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
