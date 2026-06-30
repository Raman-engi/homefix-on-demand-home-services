import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../api/authService";

const WorkerLogin = () => {
  const navigate = useNavigate();

  const [isSignup, setIsSignup] = useState(false);

  const [loading, setLoading] = useState(false);

  const [otpSent, setOtpSent] = useState(false);

  const [otpVerified, setOtpVerified] = useState(false);

  const [form, setForm] = useState({
    name: "",
    service: "",
    experience: "",
    city: "",
    email: "",
    otp: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ===============================
  // SEND OTP
  // ===============================

  const handleSendOtp = async () => {
    if (!form.email) {
      alert("Enter Email");
      return;
    }

    try {
      setLoading(true);

      await authService.sendOTP(form.email);

      setOtpSent(true);

      alert("OTP Sent Successfully");
    } catch (err) {
      alert(
        err.response?.data?.message ||
        "Unable to send OTP"
      );
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // VERIFY OTP
  // ===============================

  const handleVerifyOtp = async () => {
    if (form.otp.length !== 6) {
      alert("Enter Valid OTP");
      return;
    }

    try {
      setLoading(true);

      await authService.verifyOTP(
        form.email,
        form.otp
      );

      setOtpVerified(true);

      alert("Email Verified");
    } catch (err) {
      alert(
        err.response?.data?.message ||
        "OTP Verification Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // PROFESSIONAL SIGNUP
  // ===============================

  const handleSignup = () => {
    if (!otpVerified) {
      alert("Verify Email First");
      return;
    }

    if (
      !form.name ||
      !form.service ||
      !form.experience ||
      !form.city ||
      !form.password ||
      !form.confirmPassword
    ) {
      alert("Fill all fields");
      return;
    }

    if (form.password.length < 8) {
      alert("Password must be at least 8 characters");
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const professionalData = {
      id: Date.now(),
      name: form.name,
      service: form.service,
      experience: form.experience,
      city: form.city,
      email: form.email,
      password: form.password,
      role: "professional",
      status: "pending",
    };

    const pending =
      JSON.parse(
        localStorage.getItem(
          "pending_professionals"
        )
      ) || [];

    pending.push(professionalData);

    localStorage.setItem(
      "pending_professionals",
      JSON.stringify(pending)
    );

    alert("Signup Request Sent To Admin");

    setForm({
      name: "",
      service: "",
      experience: "",
      city: "",
      email: "",
      otp: "",
      password: "",
      confirmPassword: "",
    });

    setOtpSent(false);

    setOtpVerified(false);

    setIsSignup(false);
  };

  // ===============================
  // LOGIN
  // ===============================

  const handleLogin = () => {
    if (!form.email || !form.password) {
      alert("Enter Email & Password");
      return;
    }

    const approved =
      JSON.parse(
        localStorage.getItem(
          "approved_professionals"
        )
      ) || [];

    const professional = approved.find(
      (p) =>
        p.email === form.email &&
        p.password === form.password
    );

    if (!professional) {
      alert(
        "Invalid credentials or account not approved."
      );
      return;
    }

    localStorage.setItem(
      "professional_logged_in",
      "true"
    );

    localStorage.setItem(
      "professional_data",
      JSON.stringify(professional)
    );

    alert("Login Successful");

    navigate("/professional-dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">

        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-orange-500 text-white flex items-center justify-center text-2xl font-bold">
            P
          </div>

          <h1 className="text-3xl font-bold mt-4 text-gray-900">
            {isSignup ? "Professional Signup" : "Professional Login"}
          </h1>

          <p className="text-gray-500 mt-2">
            Join HomeFix Professional Network
          </p>
        </div>

        <div className="space-y-4">

          {isSignup && (
            <>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                className="w-full h-12 px-4 border rounded-xl"
              />

              <select
                name="service"
                value={form.service}
                onChange={handleChange}
                className="w-full h-12 px-4 border rounded-xl"
              >
                <option value="">Select Service Category</option>
                <option>Electrician</option>
                <option>Plumber</option>
                <option>AC Service</option>
                <option>Carpenter</option>
                <option>Painter</option>
                <option>Deep Cleaning</option>
                <option>Appliance Repair</option>
              </select>

              <input
                type="number"
                name="experience"
                placeholder="Experience (Years)"
                value={form.experience}
                onChange={handleChange}
                className="w-full h-12 px-4 border rounded-xl"
              />

              <select
                name="city"
                value={form.city}
                onChange={handleChange}
                className="w-full h-12 px-4 border rounded-xl"
              >
                <option value="">Select City</option>
                <option>Ghaziabad</option>
                <option>Noida</option>
                <option>Lucknow</option>
                <option>Kanpur</option>
                <option>Gorakhpur</option>
              </select>
            </>
          )}

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            className="w-full h-12 px-4 border rounded-xl"
          />

          {isSignup && !otpSent && (
            <button
              type="button"
              onClick={handleSendOtp}
              disabled={loading}
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold"
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          )}

          {isSignup && otpSent && !otpVerified && (
            <>
              <input
                type="text"
                name="otp"
                placeholder="Enter OTP"
                value={form.otp}
                onChange={handleChange}
                className="w-full h-12 px-4 border rounded-xl"
              />

              <button
                type="button"
                onClick={handleVerifyOtp}
                disabled={loading}
                className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-semibold"
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            </>
          )}

          {(!isSignup || otpVerified) && (
            <>
              <input
                type="password"
                name="password"
                placeholder={isSignup ? "Create Password" : "Password"}
                value={form.password}
                onChange={handleChange}
                className="w-full h-12 px-4 border rounded-xl"
              />

              {isSignup && (
                <>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    className="w-full h-12 px-4 border rounded-xl"
                  />

                  <button
                    type="button"
                    onClick={handleSignup}
                    className="w-full h-12 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold"
                  >
                    Create Professional Account
                  </button>
                </>
              )}
            </>
          )}

          {!isSignup && (
            <button
              type="button"
              onClick={handleLogin}
              className="w-full h-12 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold"
            >
              Login
            </button>
          )}

          <div className="pt-3 text-center">
            {!isSignup ? (
              <p className="text-sm text-gray-600">
                New Professional?{" "}
                <button
                  onClick={() => setIsSignup(true)}
                  className="text-orange-500 font-semibold"
                >
                  Create Account
                </button>
              </p>
            ) : (
              <p className="text-sm text-gray-600">
                Already Registered?{" "}
                <button
                  onClick={() => setIsSignup(false)}
                  className="text-orange-500 font-semibold"
                >
                  Login Here
                </button>
              </p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default WorkerLogin;