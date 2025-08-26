import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { store } from "../../src/redux/store/store";

export default function ComponentWrapper({
  component,
}: {
  component: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={new QueryClient()}>
        <MemoryRouter>{component}</MemoryRouter>
      </QueryClientProvider>
    </Provider>
  );
}
