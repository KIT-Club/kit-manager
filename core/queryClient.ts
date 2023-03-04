import { QueryClient } from "@tanstack/query-core";

export default function createQueryClient({
  onSuccess,
  onError,
  onSettled,
}: {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
  onSettled?: (data: any, error: any) => void;
}) {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        onError: async (error: any) => {
          if (onError) {
            onError(error);
          }
        },
      },
    },
  });
}
