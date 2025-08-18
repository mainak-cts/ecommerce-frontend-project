import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthRoutes from "../components/AuthRoutes.tsx";
import Layout from "../components/Layout.tsx";
import { lazy, Suspense } from "react";
import PageLoading from "../components/PageLoading.tsx";
import PageNotFound from "../pages/PageNotFound.tsx";
import ProtectedRoutes from "../components/ProtectedRoutes.tsx";
import Orders from "../pages/Orders.tsx";

const Home = lazy(() => import("../pages/Home.tsx"));
const Login = lazy(() => import("../pages/Login.tsx"));
const Products = lazy(() => import("../components/Products.tsx"));
const ProductView = lazy(() => import("../components/ProductView.tsx"));
const Signup = lazy(() => import("../pages/Signup.tsx"));
const SearchProduct = lazy(() => import("../components/SearchProduct.tsx"));
const Cart = lazy(() => import("../pages/Cart.tsx"));
const Profile = lazy(() => import("../pages/Profile.tsx"));

const AppRouter = () => {
  const routers = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: (
            <Suspense fallback={<PageLoading />}>
              <Home />
            </Suspense>
          ),
        },
        {
          path: "/products",
          element: (
            <Suspense fallback={<PageLoading />}>
              <Products />
            </Suspense>
          ),
          children: [
            {
              path: "category/:category",
              element: <Products />,
            },
          ],
        },
        {
          path: "/products/search/:searchInput",
          element: (
            <Suspense fallback={<PageLoading />}>
              <SearchProduct />
            </Suspense>
          ),
        },
        {
          path: "/products/:id",
          element: (
            <Suspense fallback={<PageLoading />}>
              <ProductView />
            </Suspense>
          ),
        },
        {
          element: <AuthRoutes />,
          children: [
            {
              path: "/login",
              element: <Login />,
            },
            {
              path: "/register",
              element: <Signup />,
            },
          ],
        },
        {
          element: <ProtectedRoutes />,
          children: [
            {
              path: "cart",
              element: <Cart />,
            },
            {
              path: "profile",
              element: <Profile />,
            },
            {
              path: "orders",
              element: <Orders />,
            },
          ],
        },
        {
          path: "*",
          element: <PageNotFound />,
        },
      ],
    },
  ]);
  return <RouterProvider router={routers} />;
};

export default AppRouter;
