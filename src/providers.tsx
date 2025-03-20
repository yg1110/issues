import { QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";

import { getQueryClient } from "./lib/tanstack-query/client";

export function Providers({ children }: PropsWithChildren) {
  return <QueryClientProvider client={getQueryClient()}>{children}</QueryClientProvider>;
}
