import React from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

/**
 * STEP 2: Import Global Features
 */
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { getMuiTheme } from "./theme/muiTheme";

/**
 * STEP 3: Import Hooks and Components
 */
import useAuth from "./hooks/useAuth";
import GlobalToast from "./components/Toast";
import Nav from "./components/Navbar";
import Footer from "./components/Footer";

/**
 * STEP 4: Import All Pages
 */
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ServicesPage from "./pages/ServicesPage";
import ProviderProfilePage from "./pages/ProviderProfilePage";
import BookingPage from "./pages/BookingPage";
import DashboardPage from "./pages/Dashboard";
import UserProfilePage from "./pages/UserProfilePage";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import WorkerLogin from "./pages/WorkerLogin"; // later rename to ProfessionalLogin
import NotFoundPage from "./pages/NotFoundPage";
import ProfessionalDashboard from "./pages/ProfessionalDashboard";

/**
 * HELPER: ProtectedRoute
 */
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

/**
 * HELPER: RoleRoute
 */
const RoleRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, role } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

/**
 * HELPER: ConditionalFooter
 */
const ConditionalFooter = () => {
  const location = useLocation();

  const hideOnPaths = [
    "/login",
    "/signup",
    "/worker-login",
    "/professional-login",
     "/professional-dashboard",
  ];

  const hideOnPrefixes = ["/book/"];

  const shouldHide =
    hideOnPaths.includes(location.pathname) ||
    hideOnPrefixes.some((prefix) =>
      location.pathname.startsWith(prefix)
    );

  if (shouldHide) return null;

  return <Footer />;
};

/**
 * MAIN APP
 */
function App() {
  const muiTheme = React.useMemo(() => {
  return getMuiTheme();
}, []);

  return (
    <HelmetProvider>
      <BrowserRouter>

        <ThemeProvider theme={muiTheme}>

          <CssBaseline />

          {/* NAVBAR */}
          <Nav />

          {/* ROUTES */}
          <Routes>

            {/* PUBLIC */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/worker-login" element={<WorkerLogin />} />

            <Route
              path="/professional-login"
              element={<WorkerLogin />}
            />

            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/:id" element={<ServicesPage />} />

            <Route
              path="/provider/:id"
              element={<ProviderProfilePage />}
            />

            {/* PRIVATE */}
            <Route
              path="/book/:providerId/*"
              element={
                <ProtectedRoute>
                  <BookingPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <UserProfilePage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/professional-dashboard"
              element={<ProfessionalDashboard />}
            />

            {/* ADMIN */}
            <Route
              path="/admin"
              element={
                localStorage.getItem("role") === "admin"
                  ? <AdminDashboard />
                  : <Navigate to="/admin-login" />
              }
            />
            
            <Route
              path="/admin-login"
              element={<AdminLogin />}
            />

            {/* 404 */}
            <Route path="*" element={<NotFoundPage />} />

          </Routes>

          {/* FOOTER */}
          <ConditionalFooter />

          {/* TOAST */}
          <Toaster position="top-right" />
          <GlobalToast />

        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
