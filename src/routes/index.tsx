import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";

import Issues from "./pages/Issues";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Issues />,
  },
  {
    path: "*",
    loader: async () => redirect("/"),
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
