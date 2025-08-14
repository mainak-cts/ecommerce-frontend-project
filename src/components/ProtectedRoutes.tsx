// import { useAppContext } from "../provider/ContextProvider";
import { Navigate, Outlet } from "react-router-dom";
import { isLoggedIn } from "../shared/services/auth";
import { Suspense } from "react";
import PageLoading from "./PageLoading";

export default function ProtectedRoutes() {
  return (
    <>
      {isLoggedIn() ? (
        <Suspense fallback={<PageLoading />}>
          <Outlet />
        </Suspense>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
}
