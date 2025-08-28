import { toast } from "@/components/feedback";
import type { Problem } from "@/types/http-errors";
import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (err: unknown) => {
      const error = err as Problem;
      toast.error(error.detail);
    },
  }),
  mutationCache: new MutationCache({
    onError: (err: unknown) => {
      const error = err as Problem;
      toast.error(error.detail);
    },
  }),

  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      throwOnError: false,
      gcTime: 1000 * 60 * 60 * 24,
    },
  },
});
