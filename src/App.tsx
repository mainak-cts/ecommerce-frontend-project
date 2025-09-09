import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import AppRouter from "./routes/AppRouter";
import { Provider } from "react-redux";
import { store } from "./redux/store/store";
import { ToastContainer } from "react-toastify";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { APP_CONFIG } from "./config/appconfig";

function App() {
  const queryClient = new QueryClient();
  return (
    <GoogleOAuthProvider clientId={APP_CONFIG.GOOGLE_OAUTH_CLIENT_ID}>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <AppRouter />
        </QueryClientProvider>
        <ToastContainer />
      </Provider>
    </GoogleOAuthProvider>
  );
}

export default App;
