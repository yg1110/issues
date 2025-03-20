import "./global.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";

import { Providers } from "./providers.tsx";
import Router from "./routes/index.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Providers>
      <HelmetProvider>
        <Router />
      </HelmetProvider>
    </Providers>
  </StrictMode>
);
