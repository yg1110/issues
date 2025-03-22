import "./global.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "react-hot-toast";

import { Providers } from "./providers.tsx";
import Router from "./routes/index.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Providers>
      <HelmetProvider>
        <Router />
        <Toaster />
      </HelmetProvider>
    </Providers>
  </StrictMode>,
);
