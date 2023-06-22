import "../styles/globals.css";
import type { AppProps } from "next/app";
import createQueryClient from "../core/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import LoginLayout from "../layouts/Login.layout";
import PageLayout from "../layouts/Page.layout";
import NoSSR from "react-no-ssr";
import useUserStore from "@/stores/User.store";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const token = useUserStore((state: any) => state.token);
  const pathName = usePathname();
  const loginPath = "/members/login";
  const homePath = "/members";
  const router = useRouter();

  // check token
  useEffect(() => {
    if (!token) {
      if (pathName !== loginPath) router.push(loginPath);
    } else {
      if (pathName === loginPath) router.push(homePath);
    }
  }, []);

  const queryClient = createQueryClient({
    onError: async (error: any) => {
      if (error?.response?.status === 401) {
        router.push(loginPath);
      }
    },
  });

  const Layout = (props: any) => {
    return pathName === loginPath ? (
      <LoginLayout>{props.children}</LoginLayout>
    ) : (
      <PageLayout>{props.children}</PageLayout>
    );
  };

  return (
    <NoSSR>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </QueryClientProvider>
    </NoSSR>
  );
}
