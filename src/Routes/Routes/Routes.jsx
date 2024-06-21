import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../../Layout/DashboardLayout";
import Main from "../../Layout/Main";
import Blog from "../../Pages/Blog/Blog";
import AllUsers from "../../Pages/Dashboard/AllUsers/AllUsers";
import ManageProducts from "../../Pages/Dashboard/ManageProducts/ManageProducts";
import MyOrders from "../../Pages/Dashboard/MyOrders/MyOrders";
import Payment from "../../Pages/Dashboard/Payment/Payment";
import ReportedProduct from "../../Pages/Dashboard/ReportedProduct/ReportedProduct";
import AllAdvertise from "../../Pages/Home/Categories/AllAdvertise";
import AllCategories from "../../Pages/Home/Categories/AllCategories";

import Home from "../../Pages/Home/Home/Home";
import Searchyou from "../../Pages/Home/Home/Searchyou";
import Login from "../../Pages/Login/Login";
import AllProducts from "../../Pages/ProductAvailable/AllProducts";

import Details from "../../Pages/ProductAvailable/Details";

import DisplayError from "../../Pages/Shared/DisplayError/DisplayError";
import Profile2 from "../../Pages/SignUp/Profile2";
import Profile34 from "../../Pages/SignUp/Profile34";
import SignUp from "../../Pages/SignUp/SignUp";
import AdminRoute from "../AdminRoute/AdminRoute";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <DisplayError></DisplayError>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },

      {
        path: "/",
        element: (
          <PrivateRoute>
            <AllCategories></AllCategories>
          </PrivateRoute>
        ),
      },
      {
        path: "/",
        element: (
          <PrivateRoute>
            <AllAdvertise></AllAdvertise>{" "}
          </PrivateRoute>
        ),
      },
      {
        path: "/Messages",
        element: <Blog></Blog>,
      },

      {
        path: "/About",
        element: (
          <PrivateRoute>
            <Profile2></Profile2>
          </PrivateRoute>
        ),
      },

      {
        path: "/searchyou",
        element: (
          
            <Searchyou></Searchyou>
      
        ),
      },

      {
        path: "/profile34",
        element: (
          <PrivateRoute>
            <Profile34></Profile34>
          </PrivateRoute>
        ),
      },

      {
        path: "/checkout/:id",
        element: (
          <PrivateRoute>
            <Details></Details>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `http://localhost:5000/allProducts2/${params.id}`
          ),
      },

      {
        path: "/:id",
        element: <AllProducts></AllProducts>,
        loader: ({ params }) =>
          fetch(
            `http://localhost:5000/allProducts/${params.id}`
          ),
      },

      {
        path: "/login",
        element: <Login></Login>,
      },

      {
        path: "/signup",
        element: <SignUp></SignUp>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    errorElement: <DisplayError></DisplayError>,
    children: [
      {
        path: "/dashboard/comments",
        element: (
          <PrivateRoute>
            <MyOrders></MyOrders>
          </PrivateRoute>
        ),
      },

      {
        path: "/dashboard/reportedproducts",
        element: (
          <AdminRoute>
            <ReportedProduct></ReportedProduct>
          </AdminRoute>
        ),
      },

      {
        path: "/dashboard/allusers",
        element: (
          <AdminRoute>
            <AllUsers></AllUsers>
          </AdminRoute>
        ),
      },

      {
        path: "/dashboard/manageproducts",
        element: (
          <PrivateRoute>
            <ManageProducts></ManageProducts>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/payment/:id",
        element: (
          <PrivateRoute>
            {" "}
            <Payment></Payment>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `http://localhost:5000/bookingsProduct/${params.id}`
          ),
      },
    ],
  },
]);

export default router;
