import { Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Header from "./Header";
import { ErrorBoundary } from "react-error-boundary";
import Fallback from "../pages/Fallback";
import { Suspense } from "react";
import PageLoading from "./PageLoading";

function Layout() {
  const location = useLocation();
  return (
    <>
      <Header />
      <Navbar />
      {/* Using resetKeys as location.pathname, so that if the user navigate to different page, the error state resets */}
      <ErrorBoundary
        FallbackComponent={Fallback}
        resetKeys={[location.pathname]}
      >
        <div className="w-full flex-1 bg-white flex justify-center">
          <Suspense fallback={<PageLoading />}>
            <Outlet key={location.pathname} />
          </Suspense>
        </div>
      </ErrorBoundary>
      <Footer />
    </>
  );
}

export default Layout;
