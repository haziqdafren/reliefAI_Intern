import React, { useState } from 'react';
import { Modal } from '../ui/Modal';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignUpClick?: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onSignUpClick
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login attempt:', { email, password });
  };

  const handleGoogleSignIn = () => {
    // Handle Google sign-in logic here
    console.log('Google sign-in');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-8 relative bg-primary-100/50">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-text-secondary hover:text-text-primary transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-heading font-medium text-text-primary mb-2">Log in</h2>
          <p className="text-sm font-corporate text-text-secondary">
            Don't have an account?{' '}
            <button
              onClick={onSignUpClick}
              className="text-primary-500 hover:text-primary-400 font-medium transition-colors"
            >
              Sign up
            </button>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Google Sign In */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-3 py-3 px-6 border border-primary-200 rounded-xl hover:bg-primary-100 transition-all font-corporate font-medium text-text-primary bg-white shadow-sm"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-primary-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-primary-100/50 text-text-secondary font-corporate font-medium">OR</span>
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-heading font-semibold text-text-primary mb-3">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-6 py-4 bg-white border border-primary-200 rounded-xl font-corporate focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 transition-all duration-300 shadow-sm"
              placeholder="your@email.com"
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label htmlFor="password" className="block text-sm font-heading font-semibold text-text-primary">
                Password
              </label>
              <button
                type="button"
                className="text-sm text-primary-400 hover:text-primary-500 font-corporate transition-colors"
              >
                Forgot password?
              </button>
            </div>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-6 py-4 bg-white border border-primary-200 rounded-xl font-corporate focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 transition-all duration-300 shadow-sm"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Login Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-primary-500 text-white py-3 px-8 rounded-full font-corporate font-medium text-xs md:text-sm transition-all duration-300 hover:bg-primary-400 hover:-translate-y-0.5 hover:shadow-lg shadow-md"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};