import React from 'react';

interface ErrorMessageProps {
  message: string;
  className?: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, className = '' }) => {
  return (
    <div className={`absolute top-full left-0 right-0 mt-2 z-10 ${className}`}>
      <div className="bg-white border border-red-200 rounded-lg shadow-lg p-3 relative">
        {/* Arrow pointing up */}
        <div className="absolute -top-2 left-4 w-4 h-4 bg-white border-l border-t border-red-200 transform rotate-45"></div>
        
        <div className="flex items-start gap-3">
          {/* Error Icon */}
          <div className="flex-shrink-0 w-5 h-5 bg-red-100 rounded-full flex items-center justify-center">
            <svg 
              className="w-3 h-3 text-red-500" 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path 
                fillRule="evenodd" 
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" 
                clipRule="evenodd" 
              />
            </svg>
          </div>
          
          {/* Error Message */}
          <p className="text-sm text-red-600 font-corporate">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};
