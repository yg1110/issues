import { QueryCache, QueryClient } from "@tanstack/react-query";

export const defaultStaleTime = 60 * 1000;

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: 0,
        staleTime: defaultStaleTime,
        refetchOnWindowFocus: false,
      },
    },
    queryCache: new QueryCache({}),
  });
}

let browserQueryClient: QueryClient | undefined;

export function getQueryClient() {
  if (!browserQueryClient) browserQueryClient = makeQueryClient();
  return browserQueryClient;
}
