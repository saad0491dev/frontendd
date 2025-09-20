import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, ArrowLeft, CheckCircle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import AuthLayout from './AuthLayout';
import NotificationToast from './NotificationToast';
import { useNotification } from '../hooks/useNotification';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { notification, showError, showSuccess, hideNotification } = useNotification();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const loginData = {
        email: formData.email,
        password: formData.password,
        rememberMe: formData.rememberMe,
      };
      
      const result = await login(loginData);
      
      if (result.success) {
        showSuccess('Welcome back!', 'You have been successfully signed in.');
        navigate('/dashboard'); // Redirect to dashboard or home page
      } else {
        showError('Sign In Failed', result.message);
      }
    } catch (error) {
      showError('Connection Error', 'Unable to connect to the server. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  function LoginLeftContent() {
    return (
      <div className="relative w-full h-full flex-col justify-center p-20 text-white hidden lg:flex">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{
            backgroundImage: `url('https://res.cloudinary.com/drnak5yb2/image/upload/v1754555854/MPFM-SFS-3G-X-1536x1187_qhmxbs.png')`,
          }}
        ></div>

        {/* Logo fixed top-left */}
        <div className="absolute top-6 left-6 z-20">
          <img
            src="https://res.cloudinary.com/drnak5yb2/image/upload/v1756278804/light_mode_logo_saher_btbdos.svg"
            alt="Saher Flow Solutions"
            className="h-12"
          />
        </div>

        {/* Text content */}
        <div className="relative z-10 flex flex-col justify-center p-20 text-white max-w-2xl">
          <h1 className="text-5xl font-semibold leading-tight tracking-wider">
            <span className="block">Welcome to</span>
            <span className="block">Saher Flow Solutions</span>
            <span className="block text-yellow-400 text-4xl  font-medium mt-2">
              Professional Portal
            </span>
          </h1>

          <p className="text-xl text-gray-100 leading-relaxed my-10">
            Access your professional dashboard to monitor real-time flow data,
            manage your measurement systems, and gain actionable insights that
            drive operational excellence in your critical applications.
          </p>

          <div className="space-y-6">
            {[
              'Real-time monitoring and analytics',
              'Advanced measurement technology',
              'Professional-grade precision',
            ].map((text, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-yellow-400 mr-2" />
                <span className="text-gray-200 font-medium">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <NotificationToast
        type={notification.type}
        title={notification.title}
        message={notification.message}
        isVisible={notification.isVisible}
        onClose={hideNotification}
      />
    <AuthLayout leftContent={<LoginLeftContent />}>
      {/* Right Side - Login Form */}
      <div className="w-full flex flex-col justify-center bg-gradient-to-b from-navy-900 to-navy-800 min-h-screen">
        <div className="md:w-[80%] w-[90%] mx-auto">
          <div className="bg-[#1E1F2E] rounded-2xl shadow-xl w-full md:p-10 p-6 my-8 border border-[#2A2D47]">
            {/* Back to Home Link */}
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
            >
              <ArrowLeft size={20} />
              Back to Home
            </Link>

            <div className="mb-8">
              <h2 className="text-4xl font-bold text-white mb-2">
                Welcome back
              </h2>
              <p className="text-gray-400">
                Sign in to your account to continue
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Email address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-3 bg-[#2A2D47] border border-[#3A3D57] text-white rounded-lg focus:outline-none focus:ring-1 focus:ring-yellow-400 focus:border-yellow-400 transition-colors placeholder-gray-500"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-12 py-3 bg-[#2A2D47] border border-[#3A3D57] text-white rounded-lg focus:outline-none focus:ring-1 focus:ring-yellow-400 focus:border-yellow-400 transition-colors placeholder-gray-500"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-500 hover:text-gray-300" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-500 hover:text-gray-300" />
                    )}
                  </button>
                </div>
              </div>


              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="rememberMe"
                    name="rememberMe"
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 bg-[#2A2D47] border-[#3A3D57] rounded"
                  />
                  <label
                    htmlFor="rememberMe"
                    className="ml-2 block text-sm text-gray-300"
                  >
                    Remember me
                  </label>
                </div>

                <div className="md:text-sm text-xs">
                  <Link
                    to="/forgot-password"
                    className="font-light italic text-yellow-400 hover:text-yellow-300"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-navy-900 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-gray-400">
              Don't have an account?{' '}
              <Link
                to="/signup"
                className="font-medium text-yellow-400 hover:text-yellow-300"
              >
                Sign up for free
              </Link>
            </p>
          </div>
        </div>
      </div>
    </AuthLayout>
    </>
  );
};

export default Login;