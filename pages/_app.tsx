import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import createQueryClient from "../core/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import LoginLayout from "../layouts/Login.layout";
import PageLayout from "../layouts/Page.layout";

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

  if (router.pathname === "/login") {
    return (
      <QueryClientProvider client={queryClient}>
        <LoginLayout>
          <Component {...pageProps} />
        </LoginLayout>
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <PageLayout>
        <Component {...pageProps} />
      </PageLayout>
    </QueryClientProvider>
  );
}
