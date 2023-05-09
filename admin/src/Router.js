import React, { lazy, Suspense } from "react";
import Themeprovider from "./Themeprovider";
import Externalcontext from "./context/Externalcontext";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./pages/Sidebar";
import Adminauth from "./pages/Adminauth";
import LoginAuth from "./pages/LoginAuth";
import ErrorPage from "./pages/ErrorPage";

// Import pages using lazy loading
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Userpage = lazy(() => import("./pages/Userpage"));
const Login = lazy(() => import("./pages/Login"));
const HostApproval = lazy(() => import("./pages/HostApproval"));
const Propertylist = lazy(() => import("./pages/Propertylist"));
const PropertyType = lazy(() => import("./pages/PropertyType"));
const PropertyAminities = lazy(() => import("./pages/PropertyAminities"));
const BookingPage = lazy(() => import("./pages/BookingPage"));

function Router() {
  return (
    <Themeprovider>
      <Externalcontext>
        <BrowserRouter basename="/Admin">
          <Sidebar>
            <Routes>
              <Route element={<Adminauth />}>
                <Route path="/Dashboard" element={<Suspense fallback={<div>Loading...</div>}><Dashboard /></Suspense>} />
                <Route path="/users" element={<Suspense fallback={<div>Loading...</div>}><Userpage /></Suspense>} />
                <Route path="/Hosting-Request" element={<Suspense fallback={<div>Loading...</div>}><HostApproval /></Suspense>} />
                <Route path="/Property-Management" element={<Suspense fallback={<div>Loading...</div>}><Propertylist /></Suspense>} />
                <Route path="/Property-Category" element={<Suspense fallback={<div>Loading...</div>}><PropertyType /></Suspense>} />
                <Route
                  path="/Property-Facility"
                  element={<Suspense fallback={<div>Loading...</div>}><PropertyAminities /></Suspense>}
                />
                <Route path="/Bookings" element={<Suspense fallback={<div>Loading...</div>}><BookingPage /></Suspense>} />
                <Route path="*" element={<ErrorPage />} />
              </Route>
            </Routes>
          </Sidebar>
          <Routes>
            <Route element={<LoginAuth/>} >
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/login" element={<Suspense fallback={<div>Loading...</div>}><Login /></Suspense>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Externalcontext>
    </Themeprovider>
  );
}

export default Router;


