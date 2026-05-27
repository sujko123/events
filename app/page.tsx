'use client'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Dashboard from "./dashboard/page";

const queryClient = new QueryClient();

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <Dashboard />
    </QueryClientProvider>
  );
}

