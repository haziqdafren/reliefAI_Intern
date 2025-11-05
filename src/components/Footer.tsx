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
                <a href="https://facebook.com/jessielileadership" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-primary-400 transition-all">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
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
                    <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.538 2.717C4.386 6.482 3.72 8.847 3.705 12.01c.014 3.165.68 5.527 1.97 7.017 1.429 1.785 3.631 2.696 6.542 2.717 2.623-.02 4.358-.631 5.477-1.924.67-.77 1.118-1.76 1.35-2.954-.934.67-2.113 1.056-3.58 1.169-2.529.192-4.693-.652-6.047-2.38-1.149-1.463-1.723-3.457-1.61-5.62.114-2.162.79-4.002 2-5.204 1.325-1.316 3.13-2.006 5.365-2.053 2.233.047 3.903.737 4.967 2.051.953 1.171 1.481 2.799 1.571 4.839.042.914-.005 1.757-.141 2.508-.155.85-.409 1.606-.755 2.25-.487.908-1.165 1.63-1.986 2.138-1.082.669-2.41 1.007-3.942.999-1.564-.008-2.894-.41-3.953-1.193l.93-1.686c.839.665 1.865.996 3.057 1.002 1.09.004 2.038-.253 2.813-.768.56-.373 1.026-.91 1.386-1.598.256-.487.442-1.053.552-1.684.11-.63.162-1.29.154-1.968-.122-2.892-1.483-4.355-4.049-4.35-1.664.005-2.97.524-3.883 1.539-.912 1.015-1.411 2.453-1.489 4.288-.078 1.836.261 3.307 1.005 4.373.741.943 1.903 1.387 3.462 1.327 1.064-.042 1.99-.322 2.758-.833-.183-1.095-.267-2.298-.246-3.608.02-1.308.146-2.482.376-3.51.247-1.103.639-2.028 1.166-2.751.59-.808 1.348-1.424 2.244-1.828.963-.435 2.09-.65 3.35-.64 1.257.01 2.363.225 3.295.648.935.425 1.687 1.041 2.232 1.827.61.88 1.01 1.95 1.188 3.18l-2.065.318c-.15-1.01-.436-1.807-.85-2.374-.367-.502-.871-.894-1.495-1.164-.626-.271-1.402-.408-2.309-.406-.906-.002-1.683.135-2.313.406-.62.268-1.12.658-1.485 1.164-.48.665-.805 1.58-.962 2.72-.152 1.128-.246 2.403-.28 3.805-.034 1.406.025 2.715.177 3.915.151 1.203.402 2.226.75 3.05.347.82.82 1.477 1.42 1.97.601.493 1.346.74 2.237.74.892 0 1.639-.247 2.243-.74.603-.493 1.079-1.15 1.425-1.97.348-.824.6-1.847.75-3.05.151-1.2.208-2.509.174-3.915-.034-1.402-.128-2.677-.28-3.805-.156-1.14-.481-2.055-.962-2.72-.364-.506-.864-.896-1.485-1.164-.63-.271-1.407-.408-2.313-.406-.907-.002-1.683.135-2.309.406-.624.27-1.128.662-1.495 1.164-.414.567-.7 1.364-.85 2.374l-2.065-.318c.178-1.23.578-2.3 1.188-3.18.545-.786 1.297-1.402 2.232-1.827.932-.423 2.038-.638 3.295-.648 1.26-.01 2.387.205 3.35.64.896.404 1.654 1.02 2.244 1.828.527.723.919 1.648 1.166 2.751.23 1.028.356 2.202.376 3.51.021 1.31-.063 2.513-.246 3.608.768.511 1.694.791 2.758.833 1.559.06 2.721-.384 3.462-1.327.744-1.066 1.083-2.537 1.005-4.373-.078-1.835-.577-3.273-1.489-4.288-.913-1.015-2.219-1.534-3.883-1.539-2.566-.005-3.927 1.458-4.049 4.35-.008.678.044 1.338.154 1.968.11.631.296 1.197.552 1.684.36.688.826 1.225 1.386 1.598.775.515 1.723.772 2.813.768 1.192-.006 2.218-.337 3.057-1.002l.93 1.686c-1.059.783-2.389 1.185-3.953 1.193-1.532.008-2.86-.33-3.942-.999-.821-.508-1.499-1.23-1.986-2.138-.346-.644-.6-1.4-.755-2.25-.136-.751-.183-1.594-.141-2.508.09-2.04.618-3.668 1.571-4.839 1.064-1.314 2.734-2.004 4.967-2.051 2.235.047 4.04.737 5.365 2.053 1.21 1.202 1.886 3.042 2 5.204.113 2.163-.461 4.157-1.61 5.62-1.354 1.728-3.518 2.572-6.047 2.38-1.467-.113-2.646-.499-3.58-1.169.232 1.194.68 2.184 1.35 2.954 1.119 1.293 2.854 1.904 5.477 1.924 2.911-.021 5.113-.932 6.542-2.717 1.29-1.49 1.956-3.852 1.97-7.017-.015-3.163-.681-5.528-1.97-7.017-1.428-1.781-3.628-2.695-6.538-2.717-4.406.031-7.2 2.055-8.304 6.015l-2.04-.569c.651-2.337 1.832-4.177 3.509-5.467C7.137.725 9.434.02 12.18 0h.006z"/>
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