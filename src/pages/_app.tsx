import queryClient from "@/api/queryClient";
import { CategoriesProvider } from "@/context/auth/CategoriesContext";
import "@/styles/globals.css";
import { QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <CategoriesProvider>
        <Component {...pageProps} />
      </CategoriesProvider>
    </QueryClientProvider>
  );
}
