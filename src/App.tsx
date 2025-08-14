import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import ContextProvider from "./provider/ContextProvider";
import AppRouter from "./routes/AppRouter";

function App() {
  const queryClient = new QueryClient();
  return (
    <ContextProvider>
      <QueryClientProvider client={queryClient}>
        <AppRouter />
      </QueryClientProvider>
    </ContextProvider>
  );
}

export default App;
