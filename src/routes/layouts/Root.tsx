import { Outlet, ScrollRestoration } from "react-router-dom";

import Header from "../../shared/components/Header";

export default function RootLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <ScrollRestoration />
    </>
  );
}
