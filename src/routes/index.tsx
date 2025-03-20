import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";

import RootLayout from "./layouts/Root";
import Issues from "./pages/Issues";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Issues />,
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
