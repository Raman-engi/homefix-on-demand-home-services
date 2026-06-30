import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { User, Mail, Phone, Lock } from "lucide-react";

import { setCredentials } from "../store/slice/authSlice";
import { showToast } from "../store/slice/uiSlice";
import { setLocal } from "../utils/storage";
import authService from "../api/authService";

import PageWrapper from "../components/PageWrapper";
import Input from "../components/Input";
import Button from "../components/Button";

const SignUpPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    otp: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSendOtp = async () => {
    if (!formData.email) {
      dispatch(
        showToast({
          type: "error",
          message: "Enter Email",
        })
      );

      return;
    }

    try {
      setLoading(true);

      await authService.sendOTP(formData.email);

      setOtpSent(true);

      dispatch(
        showToast({
          type: "success",
          message: "OTP Sent Successfully",
        })
      );
    } catch (error) {
      dispatch(
        showToast({
          type: "error",
          message:
            error.response?.data?.message ||
            "Failed to send OTP",
        })
      );
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (formData.otp.length !== 6) {
      dispatch(
        showToast({
          type: "error",
          message: "Enter valid OTP",
        })
      );
      return;
    }

    try {
      setLoading(true);

      await authService.verifyOTP(
        formData.email,
        formData.otp
      );

      setOtpVerified(true);

      dispatch(
        showToast({
          type: "success",
          message: "Email Verified Successfully",
        })
      );
    } catch (error) {
      dispatch(
        showToast({
          type: "error",
          message:
            error.response?.data?.message ||
            "OTP Verification Failed",
        })
      );
    } finally {
      setLoading(false);
    }
  };
  const handleCreateAccount = async () => {
    if (!otpVerified) {
      dispatch(
        showToast({
          type: "error",
          message: "Please verify OTP first",
        })
      );
      return;
    }

    if (!formData.name.trim()) {
      dispatch(
        showToast({
          type: "error",
          message: "Enter your name",
        })
      );
      return;
    }

    if (!formData.password) {
      dispatch(
        showToast({
          type: "error",
          message: "Password is required",
        })
      );
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      dispatch(
        showToast({
          type: "error",
          message: "Passwords do not match",
        })
      );
      return;
    }

    try {
      setLoading(true);
      const response = await authService.signup({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      const user = response.data;
      const token = user.token;

      setLocal("homefix_user", user);
      setLocal("homefix_token", token);

      dispatch(
        setCredentials({
          user,
          token,
        })
      );

      dispatch(
        showToast({
          type: "success",
          message: response.message,
        })
      );
      navigate("/");
    } catch (error) {
      dispatch(
        showToast({
          type: "error",
          message:
            error.response?.data?.message ||
            "Something went wrong",
        })
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper
      title="Sign Up"
      className="flex items-center justify-center p-4 py-12 bg-[#fafafa]"
    >
      <div className="w-full max-w-md bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.08)] overflow-hidden border border-gray-100">

        <div className="p-8">

          <div className="text-center mb-8">
            <Link
              to="/"
              className="inline-flex items-center justify-center w-12 h-12 bg-primary text-white rounded-xl font-bold text-2xl mb-4"
            >
              H
            </Link>

            <h2 className="text-2xl font-bold text-gray-900">
              Create Account
            </h2>

            <p className="text-gray-500 text-sm mt-2">
              Join HomeFix Services
            </p>
          </div>

          {/* NAME */}
          <Input
            id="name"
            name="name"
            label="Full Name"
            placeholder="Enter Full Name"
            leftIcon={<User size={18} />}
            value={formData.name}
            onChange={handleChange}
            className="mb-4"
          />


          {/* EMAIL OPTIONAL */}
          <Input
            id="email"
            name="email"
            label="Email"
            placeholder="example@gmail.com"
            leftIcon={<Mail size={18} />}
            value={formData.email}
            onChange={handleChange}
            className="mb-4"
          />

          {/* SEND OTP */}
          {!otpSent && (
            <Button
              type="button"
              className="w-full mb-4"
              onClick={handleSendOtp}
            >
              Send OTP
            </Button>
          )}

          {/* OTP BOX */}
          {otpSent && !otpVerified && (
            <>
              <Input
                id="otp"
                name="otp"
                label="Enter OTP"
                placeholder="123456"
                value={formData.otp}
                onChange={handleChange}
                className="mb-4"
              />

              <Button
                type="button"
                className="w-full mb-4"
                onClick={handleVerifyOtp}
              >
                Verify OTP
              </Button>
            </>
          )}

          {/* PASSWORD SECTION */}
          {otpVerified && (
            <>
              <Input
                id="password"
                name="password"
                type="password"
                label="Password"
                placeholder="********"
                leftIcon={<Lock size={18} />}
                value={formData.password}
                onChange={handleChange}
                className="mb-4"
              />

              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                label="Confirm Password"
                placeholder="********"
                leftIcon={<Lock size={18} />}
                value={formData.confirmPassword}
                onChange={handleChange}
                className="mb-4"
              />

              <Button
                type="button"
                className="w-full"
                loading={loading}
                onClick={handleCreateAccount}
              >
                Create Account
              </Button>
            </>
          )}

          <div className="mt-6 text-center text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary font-semibold"
            >
              Login
            </Link>
          </div>

          <div className="mt-4 text-center text-sm">
            <Link
              to="/worker-login"
              className="text-orange-500 font-semibold"
            >
              Become a Professional →
            </Link>
          </div>

        </div>
      </div>
    </PageWrapper>
  );
};

export default SignUpPage;