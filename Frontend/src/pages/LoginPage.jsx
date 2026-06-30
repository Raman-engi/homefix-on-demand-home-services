import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Mail, Lock, LogIn } from 'lucide-react';
import { loginSchema } from '../utils/validators';
import { setCredentials } from '../store/slice/authSlice';
import { showToast } from '../store/slice/uiSlice';
import { setLocal, getLocal } from '../utils/storage';
import PageWrapper from '../components/PageWrapper';
import Input from '../components/Input';
import Button from '../components/Button';
import authService from "../api/authService";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: { identifier: '', password: '' },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await authService.login({
          email: values.identifier,
          password: values.password,
        });

        const user = response.data;
        const token = response.data.token;

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
        navigate('/');
      } catch (err) {
        console.error(err);
        dispatch(
          showToast({
            type: "error",
            message:
              err.response?.data?.message || "Login failed",
          })
        );
        
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <PageWrapper title="Login" className="flex items-center justify-center p-4 bg-[#fafafa]">
      <div className="w-full max-w-md bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.08)] overflow-hidden border border-gray-100">
        
        <div className="p-8">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center justify-center w-12 h-12 bg-primary text-white rounded-xl font-bold text-2xl mb-4">H</Link>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              User Login
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
              Login to book home services
            </p>
          </div>

          <form onSubmit={formik.handleSubmit} className="space-y-5">
            <Input
              id="identifier"
              name="identifier"
              type="text"
              label="Email"
              placeholder="Enter Email"
              leftIcon={<Mail size={18} />}
              value={formik.values.identifier}
              onChange={formik.handleChange}
            />

            <div>
              <Input
                id="password"
                name="password"
                type="password"
                label="Password"
                placeholder="********"
                leftIcon={<Lock size={18} />}
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              <div className="flex justify-end mt-1">
                <a href="#" className="text-xs text-primary hover:text-blue-600 font-medium">Forgot password?</a>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              loading={loading}
            >
              Log in
            </Button>
          </form>

          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500">
            <span>Don't have an account?</span>
            <Link to="/signup" className="text-primary font-medium hover:underline">Sign up</Link>
          </div>
          
          <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
            <Button variant="outline" className="w-full" leftIcon={<LogIn size={18} />}>
              Continue with Google
            </Button>
            <p className="text-center text-sm text-gray-500 mt-6">
              Want to work with HomeFix?
              <br />

              <Link
                to="/worker-login"
                className="text-primary font-semibold hover:underline"
              >
                Become a Professional →
              </Link>
            </p>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default LoginPage;
