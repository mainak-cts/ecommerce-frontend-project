import { Navigate, Outlet } from "react-router-dom";
import { isLoggedIn } from "../shared/services/auth";
import { ErrorBoundary } from "react-error-boundary";
import Fallback from "../pages/Fallback";
import { Suspense } from "react";
import PageLoading from "./PageLoading";

export default function AuthRoutes() {
  const loggedIn = isLoggedIn();
  return (
    <>
      {loggedIn ? (
        <Navigate to="/" />
      ) : (
        <ErrorBoundary
          FallbackComponent={Fallback}
          resetKeys={[location.pathname]}
        >
          <Suspense fallback={<PageLoading />}>
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      )}
    </>
  );
}
