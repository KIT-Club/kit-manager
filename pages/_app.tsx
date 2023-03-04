import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import createQueryClient from "../core/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const queryClientHandlers = {
    onError: async (error: any) => {
      if (error?.response?.status === 401) {
        await router.push("/login");
      }
    },
  };

  const queryClient = createQueryClient(queryClientHandlers);

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}
