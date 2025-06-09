import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import Layout from "./Layout.jsx";

// Lazy-loaded components
const Hero = React.lazy(() => import("./Hero/Hero.jsx"));
const FlightStatusUser = React.lazy(() => import("./User/Status/Status.jsx"));
const FlightStatusAdmin = React.lazy(() => import("./Admin/Status/Status.jsx"));
const AboutUser = React.lazy(() => import("./User/About/About_user.jsx"));
const AboutAdmin = React.lazy(() => import("./Admin/About/About_admin.jsx"));
const BookingUser = React.lazy(() => import("./User/Booking/booking_user.jsx"));
const BookingAdmin = React.lazy(() => import("./Admin/Booking/booking_admin.jsx"));
const BaggageUser = React.lazy(() => import("./User/Baggage/baggage_user.jsx"));
const BaggageAdmin = React.lazy(() => import("./Admin/Baggage/baggage_admin.jsx"));

// User pages
const SignupUser = React.lazy(() => import("./User/Login/Signup_user.jsx"));
const LoginUser = React.lazy(() => import("./User/Login/Login_user.jsx"));
const HomeUser = React.lazy(() => import("./User/Home/Home.jsx"));

// Admin pages
const SignupAdmin = React.lazy(() => import("./Admin/Login/Signup_admin.jsx"));
const LoginAdmin = React.lazy(() => import("./Admin/Login/Login_admin.jsx"));
const HomeAdmin = React.lazy(() => import("./Admin/Home/Home.jsx"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Suspense fallback={<div>Loading Home...</div>}><Hero /></Suspense> },
      { path: "/user/login-user", element: <Suspense fallback={<div>Loading User Login...</div>}><LoginUser /></Suspense> },
      { path: "/user/signup-user", element: <Suspense fallback={<div>Loading User Signup...</div>}><SignupUser /></Suspense> },
      { path: "/admin/login-admin", element: <Suspense fallback={<div>Loading Admin Login...</div>}><LoginAdmin /></Suspense> },
      { path: "/admin/signup-admin", element: <Suspense fallback={<div>Loading Admin Signup...</div>}><SignupAdmin /></Suspense> },
    ],
  },
  {
    path: "/user",
    element: <App />,
    children: [
      { index: true, element: <Suspense fallback={<div>Loading User Dashboard...</div>}><HomeUser /></Suspense> },
      { path: "flight-status", element: <Suspense fallback={<div>Loading Flight Status...</div>}><FlightStatusUser /></Suspense> },
      { path: "flight-bookings", element: <Suspense fallback={<div>Loading Bookings...</div>}><BookingUser /></Suspense> },
      { path: "baggage-tracker", element: <Suspense fallback={<div>Loading Baggage Info...</div>}><BaggageUser /></Suspense> },
      { path: "about", element: <Suspense fallback={<div>Loading About...</div>}><AboutUser /></Suspense> },
    ],
  },
  {
    path: "/admin",
    element: <App />,
    children: [
      { index: true, element: <Suspense fallback={<div>Loading Admin Dashboard...</div>}><HomeAdmin /></Suspense> },
      { path: "flight-status", element: <Suspense fallback={<div>Loading Flight Status...</div>}><FlightStatusAdmin /></Suspense> },
      { path: "flight-bookings", element: <Suspense fallback={<div>Loading Bookings...</div>}><BookingAdmin /></Suspense> },
      { path: "baggage-tracker", element: <Suspense fallback={<div>Loading Baggage Info...</div>}><BaggageAdmin /></Suspense> },
      { path: "about", element: <Suspense fallback={<div>Loading About...</div>}><AboutAdmin /></Suspense> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
