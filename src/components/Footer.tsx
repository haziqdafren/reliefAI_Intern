import React, { useState } from 'react';
import { LoginModal } from './auth/LoginModal';

export const Footer = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  return (
    <footer className="bg-white pt-16 pb-12">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid md:grid-cols-12 gap-8">
          {/* LEFT SIDE - Main Quote */}
          <div className="md:col-span-5 space-y-8">
            <div>
              <h2 className="font-heading text-4xl md:text-5xl font-medium text-text-primary leading-tight mb-4">
                Your feminine essence is your <span className="underline decoration-primary-400 decoration-2 underline-offset-4">leadership superpower</span>.
              </h2>
            </div>

            {/* Copyright - bottom left */}
            <div>
              <p className="text-xs text-text-secondary">
                © 2025 JESSIE LI. All rights reserved.
              </p>
            </div>
          </div>

          {/* RIGHT SIDE - Navigation and Social */}
          <div className="md:col-span-7 flex flex-col justify-between h-full">
            {/* Navigation Links - Single column since many items are hidden */}
            <div className="flex justify-end pr-8">
              <div className="text-left">
                <a href="/about" className="block text-sm text-text-secondary hover:text-primary-400 transition-colors leading-relaxed mb-1">About</a>
                <a href="/book" className="block text-sm text-text-secondary hover:text-primary-400 transition-colors leading-relaxed mb-1">Book</a>
                <a href="/connect" className="block text-sm text-text-secondary hover:text-primary-400 transition-colors leading-relaxed">Connect</a>
                {/* Hidden items - uncomment to show */}
                {/* <a href="/coaching" className="block text-sm text-text-secondary hover:text-primary-400 transition-colors leading-relaxed mb-1">Coaching</a> */}
                {/* <a href="/course" className="block text-sm text-text-secondary hover:text-primary-400 transition-colors leading-relaxed mb-1">Course</a> */}
                {/* <a href="/journal" className="block text-sm text-text-secondary hover:text-primary-400 transition-colors leading-relaxed mb-1">Journal</a> */}
                {/* <a href="/speaker-kit" className="block text-sm text-text-secondary hover:text-primary-400 transition-colors leading-relaxed mb-1">Speaker Kit</a> */}
                {/* <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="block text-sm text-text-secondary hover:text-primary-400 transition-colors text-left leading-relaxed"
                >
                  Login
                </button> */}
              </div>
            </div>

            {/* Social Media Icons - positioned to the right bottom */}
            <div className="flex justify-end">
              <div className="flex space-x-4">
                <a href="https://www.instagram.com/jessieli/" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-primary-400 transition-all">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.40s-.644-1.44-1.439-1.40z"/>
                  </svg>
                </a>
                <a href="https://www.linkedin.com/in/jessie-li-cfa" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-primary-400 transition-all">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="https://www.threads.net/@jessieli" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-primary-400 transition-all">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.155 2c-2.97 0-5.549.786-7.294 2.299C2.906 6.184 2 8.576 2 11.592c0 2.103.389 3.807 1.242 5.235.864 1.448 2.074 2.546 3.665 3.21-.134.682-.263 1.218-.447 1.83l-.005.017c-.131.437-.279.931-.42 1.499-.153.617.33 1.22.973 1.22h.006c.367 0 .715-.185.92-.492.69-.954 1.391-1.78 2.084-2.48 1.595.207 3.245.31 4.962.31 2.97 0 5.549-.786 7.294-2.299C23.094 17.816 24 15.424 24 12.408c0-3.016-.906-5.408-2.706-6.919C19.549 3.786 16.97 3 14 3h-.845zm-.002 2h.847c2.635 0 4.833.696 6.294 1.951C20.756 7.204 21.5 9.085 21.5 11.592c0 2.507-.744 4.388-2.206 5.641-1.461 1.255-3.659 1.951-6.294 1.951-1.653 0-3.218-.098-4.69-.291l-.296-.039-.232.186c-.505.405-1.009.871-1.525 1.41.055-.285.109-.556.158-.806l.01-.051c.169-.563.301-1.03.419-1.629l.008-.043.302-1.527-1.395-.695c-1.305-.65-2.293-1.534-3.014-2.702C2.246 15.026 1.5 13.33 1.5 11.592c0-2.507.744-4.388 2.206-5.641C5.167 4.696 7.365 4 10 4h.153zM8.78 9.504c-.89.008-1.629.381-2.158 1.05-.539.682-.831 1.614-.831 2.63 0 1.015.292 1.947.831 2.628.529.669 1.268 1.043 2.157 1.05.89-.007 1.629-.381 2.158-1.05.539-.681.831-1.613.831-2.628 0-1.016-.292-1.948-.831-2.63-.529-.669-1.268-1.042-2.157-1.05zm6.502-.004c-.89.007-1.629.381-2.158 1.05-.539.682-.831 1.614-.831 2.63 0 1.015.292 1.947.831 2.628.529.669 1.268 1.043 2.158 1.05.89-.007 1.629-.381 2.158-1.05.539-.681.831-1.613.831-2.628 0-1.016-.292-1.948-.831-2.63-.529-.669-1.268-1.042-2.158-1.05zm-6.502 1.496c.484.006.865.202 1.147.543.271.328.448.815.448 1.645 0 .83-.177 1.317-.448 1.645-.282.341-.663.537-1.147.543-.484-.006-.865-.202-1.147-.543-.271-.328-.448-.815-.448-1.645 0-.83.177-1.317.448-1.645.282-.341.663-.537 1.147-.543zm6.502-.004c.484.006.865.202 1.147.543.271.328.448.815.448 1.645 0 .83-.177 1.317-.448 1.645-.282.341-.663.537-1.147.543-.484-.006-.865-.202-1.147-.543-.271-.328-.448-.815-.448-1.645 0-.83.177-1.317.448-1.645.282-.341.663-.537 1.147-.543z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
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
    </footer>
  );
};