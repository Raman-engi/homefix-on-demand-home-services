import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  MapPin,
  User,
  Menu,
  X,
  Phone,
  Moon,
  Sun,
  Briefcase,
} from "lucide-react";

import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/slice/authSlice";
import useTheme from "../hooks/useTheme";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const [mobileOpen, setMobileOpen] = useState(false);

  // Theme Hook
  const { darkMode, setDarkMode } = useTheme();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  // Hide Navbar on auth pages
  const hideNavbar =
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/worker-login" ||
    location.pathname === "/professional-login" ||
    location.pathname === "/professional-dashboard";

  if (hideNavbar) return null;

  const navLinks = [
    { label: "Explore", path: "/" },
    { label: "Services", path: "/services" },
    ...(isAuthenticated
      ? [{ label: "Bookings", path: "/dashboard" }]
      : []),
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex justify-between items-center h-16">

          {/* LEFT */}
          <div className="flex items-center gap-8">

            {/* LOGO */}
            <Link to="/" className="flex items-center gap-2">

              <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow">
                H
              </div>

              <div>
                <h1 className="font-bold text-lg text-gray-900 dark:text-white">
                  HomeFix
                </h1>

                <p className="text-[11px] text-gray-500 dark:text-gray-400 -mt-1">
                  Trusted Home Services
                </p>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-6">

              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium transition ${
                    location.pathname === link.path
                      ? "text-blue-600"
                      : "text-gray-600 dark:text-gray-300 hover:text-blue-600"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

            </div>
          </div>

          {/* RIGHT */}
          <div className="hidden md:flex items-center gap-4">

            {/* Location */}
            <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-300">
              <MapPin size={15} className="text-blue-600" />
              <span>Gorakhpur</span>
            </div>

            {/* Support */}
            <a
              href="tel:+917084702208"
              className="flex items-center gap-1 text-sm font-medium text-green-600 hover:text-green-700"
            >
              <Phone size={15} />
              <span>24×7 Support</span>
            </a>

            {/* Worker Login */}
            <button
              onClick={() => navigate("/worker-login")}
              className="flex items-center gap-1 px-3 py-2 rounded-xl bg-orange-100 text-orange-600 hover:bg-orange-200 transition"
            >
              <Briefcase size={16} />
              <span className="text-sm font-medium">
                Professional
              </span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white hover:scale-105 transition"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Auth */}
            {isAuthenticated ? (
              <div className="flex items-center gap-3">

                <Link to="/profile">

                  <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold shadow">
                    {user?.name
                      ? user.name.charAt(0).toUpperCase()
                      : <User size={15} />}
                  </div>

                </Link>

                <button
                  onClick={handleLogout}
                  className="text-sm text-red-500 font-medium hover:text-red-600"
                >
                  Logout
                </button>

              </div>
            ) : (
              <div className="flex items-center gap-3">

                <Link
                  to="/login"
                  className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600"
                >
                  Log in
                </Link>

                <button
                  onClick={() => navigate("/signup")}
                  className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-blue-700 transition"
                >
                  Sign Up
                </button>

              </div>
            )}

          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <X size={20} className="dark:text-white" />
            ) : (
              <Menu size={20} className="dark:text-white" />
            )}
          </button>
        </div>

        {/* MOBILE MENU */}
        {mobileOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700 space-y-2">

            {/* Nav Links */}
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {link.label}
              </Link>
            ))}

            {/* Worker Login */}
            <button
              onClick={() => navigate("/professional-login")}
              className="w-full text-left px-3 py-2 rounded-lg text-orange-600 bg-orange-50 dark:bg-orange-900/20"
            >
              👨‍🔧 Worker Login
            </button>

            {/* Theme Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="w-full text-left px-3 py-2 rounded-lg text-gray-700 dark:text-white bg-gray-100 dark:bg-gray-800"
            >
              {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
            </button>

            {/* Support */}
            <a
              href="tel:+917084702208"
              className="block px-3 py-2 rounded-lg text-green-600 bg-green-50 dark:bg-green-900/20"
            >
              📞 24×7 Support
            </a>

            {/* Auth */}
            {isAuthenticated ? (
              <button
                onClick={() => {
                  handleLogout();
                  setMobileOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-lg text-red-500 bg-red-50 dark:bg-red-900/20"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-lg text-gray-700 dark:text-gray-200"
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  className="block px-3 py-2 rounded-lg bg-blue-600 text-white"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;