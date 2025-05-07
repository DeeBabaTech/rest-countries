"use client";

import { HydrationBoundary, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
// import queryClient from "@/lib/query-client";

export default function ReactQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [client] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={client}>
      <HydrationBoundary>{children}</HydrationBoundary>
    </QueryClientProvider>
  );
}
