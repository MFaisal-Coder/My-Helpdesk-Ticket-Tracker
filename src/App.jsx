import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import CustomerHome from "./pages/CustomerHome";
import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import DevDashboard from "./pages/DevDashboard";
import TicketDetail from "./pages/TicketDetail";
import TrackTickets from "./pages/TrackTickets";
import ResolvedTickets from "./pages/ResolvedTickets";
import TicketProvider from "./contexts/TicketContext";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { Loggeduser } from "./contexts/Loggeduser";

import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";

function App() {
  return (
    <TicketProvider>
      {/* <Outlet></Outlet> */}
      <Router>
        <Navbar />

        <div className="overflow-x-hidden">
          <Routes>
            <Route
              element={
                <Loggeduser>
                  <Outlet />
                </Loggeduser>
              }
            >
              <Route
                path="/submit"
                element={
                  <ProtectedRoute allowedRole={["user"]}>
                    <CustomerHome />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/track"
                element={
                  <ProtectedRoute allowedRole={["user"]}>
                    <TrackTickets />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dev/dashboard"
                element={
                  <ProtectedRoute allowedRole={["dev"]}>
                    <DevDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dev/dashboard/ticket/:ticketId"
                element={
                  <ProtectedRoute allowedRole={["dev"]}>
                    <TicketDetail />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dev/resolved"
                element={
                  <ProtectedRoute allowedRole={["dev"]}>
                    <ResolvedTickets />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </div>
      </Router>
    </TicketProvider>
  );
}

export default App;
