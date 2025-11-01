import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LoginModal } from './auth/LoginModal';
import { useScrollDirection } from '../hooks/useScrollAnimation';
import { useNewsletter } from '../contexts/NewsletterContext';

export const Header = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const isHeaderVisible = useScrollDirection();
  const { isNewsletterVisible } = useNewsletter();
  
  const navItems = [
    { path: '/about', label: 'About' },
    { path: '/book', label: 'Book' },
    // { path: '/coaching', label: 'Coach' }, // Hidden - uncomment to show coaching link
    // { path: '/course', label: 'Course' }, // Hidden - uncomment to show course link
    { path: '/connect', label: 'Connect' }
  ]; // Navigation items - coaching and course are hidden but can be re-enabled
  
  return (
    <header className={`fixed w-full z-50 backdrop-blur-glass bg-primary-100/90 py-4 md:py-6 transition-all duration-300 ${
      isHeaderVisible 
        ? (isNewsletterVisible ? 'top-12 translate-y-0' : 'top-0 translate-y-0') 
        : 'top-0 -translate-y-full'
    }`}>
      <nav className="container mx-auto px-4 md:px-6 flex justify-between items-center max-w-7xl">
        <Link to="/" className="logo font-heading text-xl md:text-2xl font-medium text-text-primary hover:text-primary-400 transition-colors tracking-wide">
          JESSIE LI
        </Link>
        
        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-12 list-none items-center">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link 
                to={item.path} 
                className={`font-corporate font-bold text-xs hover:text-primary-400 transition-colors duration-300 uppercase tracking-wider ${location.pathname === item.path ? 'text-primary-400' : 'text-text-primary'}`}
              >
                {item.label}
              </Link>
            </li>
          ))}
          {/* <li>
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="bg-text-primary text-primary-100 font-corporate font-bold text-xs px-6 py-2 rounded-sm hover:bg-primary-400 hover:text-white transition-all duration-300 uppercase tracking-wider"
            >
              Log In
            </button>
          </li> */} {/* Hidden - uncomment to show login button */}
        </ul>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          <span className={`w-6 h-0.5 bg-text-primary transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-text-primary transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-text-primary transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
        </button>
      </nav>

      {/* Mobile Navigation */}
      <div className={`md:hidden fixed top-0 left-0 w-full h-screen bg-white/95 backdrop-blur-md transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          {navItems.map((item) => (
            <Link 
              key={item.path}
              to={item.path} 
              className={`font-corporate font-bold text-lg hover:text-primary-400 transition-colors duration-300 uppercase tracking-wider ${location.pathname === item.path ? 'text-primary-400' : 'text-text-primary'}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          {/* <button
            onClick={() => {
              setIsLoginModalOpen(true);
              setIsMobileMenuOpen(false);
            }}
            className="bg-primary-400 text-white font-corporate font-medium text-lg px-8 py-3 rounded-full hover:bg-primary-500 transition-all duration-300 uppercase tracking-wider"
          >
            Log In
          </button> */} {/* Hidden - uncomment to show login button */}
        </div>
      </div>

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSignUpClick={() => {
          setIsLoginModalOpen(false);
          // TODO: Open sign up modal or navigate to sign up
        }}
      />
    </header>
  );
};