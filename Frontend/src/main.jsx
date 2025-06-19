import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App_user from "./Layout/App_user.jsx";
import App_admin from "./Layout/App_admin.jsx";
import Layout from "./Layout/Layout.jsx";
import ProtectedRoute from "./Protected.jsx";

// Lazy-loaded components
const Hero = React.lazy(() => import("./Hero/Hero.jsx"));

// User pages
const FlightStatusUser = React.lazy(() => import("./User/Status/Status.jsx"));
const AboutUser = React.lazy(() => import("./User/About/About_user.jsx"));
const BookingUser = React.lazy(() => import("./User/Booking/booking_user.jsx"));
const BaggageUser = React.lazy(() => import("./User/Baggage/baggage_user.jsx"));
const SignupUser = React.lazy(() => import("./User/Login/Signup_user.jsx"));
const LoginUser = React.lazy(() => import("./User/Login/Login_user.jsx"));
const HomeUser = React.lazy(() => import("./User/Home/Home.jsx"));
const SupportUser = React.lazy(() =>import("./User/Customer_support/support.jsx"));
const Profile = React.lazy(() => import("./User/Profile/Profile.jsx"));
const Team = React.lazy(() => import("./User/Team/team.jsx"));
const Resultspage = React.lazy(() => import("./User/Booking/FlightResultpage.jsx"));
const BookingPage = React.lazy(() => import("./User/Booking/BookingPage.jsx"));


// Admin pages
const FlightStatusAdmin = React.lazy(() => import("./Admin/Status/Status.jsx"));
const AboutAdmin = React.lazy(() => import("./Admin/About/About_admin.jsx"));
const BaggageAdmin = React.lazy(() =>import("./Admin/Baggage/baggage_admin.jsx"));
const SignupAdmin = React.lazy(() => import("./Admin/Login/Signup_admin.jsx"));
const LoginAdmin = React.lazy(() => import("./Admin/Login/Login_admin.jsx"));
const HomeAdmin = React.lazy(() => import("./Admin/Home/Home.jsx"));
const Advisory = React.lazy(() => import("./Admin/Advisory/advisory.jsx"));
const Employee = React.lazy(() => import("./Admin/Employee/employee.jsx"));
const Pass_Info = React.lazy(() =>import("./Admin/Passanger/passanger_info.jsx"));
const FlightManage = React.lazy(() =>import("./Admin/FlightManage/flightManage.jsx"));
const Feedback = React.lazy(() =>import("./Admin/Feedback/feedback.jsx"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<div>Loading Home...</div>}>
            <Hero />
          </Suspense>
        ),
      },
      {
        path: "/user/login-user",
        element: (
          <Suspense fallback={<div>Loading User Login...</div>}>
            <LoginUser />
          </Suspense>
        ),
      },
      {
        path: "/user/signup-user",
        element: (
          <Suspense fallback={<div>Loading User Signup...</div>}>
            <SignupUser />
          </Suspense>
        ),
      },
      {
        path: "/admin/login-admin",
        element: (
          <Suspense fallback={<div>Loading Admin Login...</div>}>
            <LoginAdmin />
          </Suspense>
        ),
      },
      {
        path: "/admin/signup-admin",
        element: (
          <Suspense fallback={<div>Loading Admin Signup...</div>}>
            <SignupAdmin />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/user",
    element: (
      <ProtectedRoute role="user">
        <App_user></App_user>
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<div>Loading User Dashboard...</div>}>
            <HomeUser />
          </Suspense>
        ),
      },
      {
        path: "flight-status",
        element: (
          <Suspense fallback={<div>Loading Flight Status...</div>}>
            <FlightStatusUser />
          </Suspense>
        ),
      },
      {
        path: "confirmation",
        element: (
          <Suspense fallback={<div>Loading Flight Status...</div>}>
            <BookingPage />
          </Suspense>
        ),
      },
      {
        path: "flight-bookings",
        element: (
          <Suspense fallback={<div>Loading Bookings...</div>}>
            <BookingUser />
          </Suspense>
        ),
      },
      {
        path: "baggage-tracker",
        element: (
          <Suspense fallback={<div>Loading Baggage Info...</div>}>
            <BaggageUser />
          </Suspense>
        ),
      },
      {
        path: "about",
        element: (
          <Suspense fallback={<div>Loading About...</div>}>
            <AboutUser />
          </Suspense>
        ),
      },
      {
        path: "support",
        element: (
          <Suspense fallback={<div>Loading Support...</div>}>
            <SupportUser />
          </Suspense>
        ),
      },
      {
        path: "profile",
        element: (
          <Suspense fallback={<div>Loading Profile...</div>}>
            <Profile />
          </Suspense>
        ),
      },
      {
        path: "team",
        element: (
          <Suspense fallback={<div>Loading Team...</div>}>
            <Team />
          </Suspense>
        ),
      },
      {
        path: "filter",
        element: (
          <Suspense fallback={<div>Loading Flights...</div>}>
            <Resultspage />
          </Suspense>
        )
      }
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute role="admin">
        <App_admin></App_admin>
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<div>Loading Admin Dashboard...</div>}>
            <HomeAdmin />
          </Suspense>
        ),
      },
      {
        path:"feedback",
        element:(
          <Suspense fallback={<div></div>}>
            <Feedback />
          </Suspense>
        )
      },
      {
        path: "flight-status",
        element: (
          <Suspense fallback={<div>Loading Flight Status...</div>}>
            <FlightStatusAdmin />
          </Suspense>
        ),
      },
      {
        path: "baggage-tracker",
        element: (
          <Suspense fallback={<div>Loading Baggage Info...</div>}>
            <BaggageAdmin />
          </Suspense>
        ),
      },
      {
        path: "about",
        element: (
          <Suspense fallback={<div>Loading About...</div>}>
            <AboutAdmin />
          </Suspense>
        ),
      },
      {
        path: "advisory",
        element: (
          <Suspense fallback={<div>Loading Advisory...</div>}>
            <Advisory />
          </Suspense>
        ),
      },
      {
        path: "employee",
        element: (
          <Suspense fallback={<div>Loading Advisory...</div>}>
            <Employee />
          </Suspense>
        ),
      },
      {
        path: "passenger-info",
        element: (
          <Suspense fallback={<div>Loading Advisory...</div>}>
            <Pass_Info />
          </Suspense>
        ),
      },
      {
        path: "flight-Manage",
        element: (
          <Suspense fallback={<div>Loading ...</div>}>
            <FlightManage />
          </Suspense>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
