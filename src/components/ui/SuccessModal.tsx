import React from 'react';
import { Modal } from './Modal';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({ 
  isOpen, 
  onClose, 
  title = "Thank You!",
  message = "Thanks for subscribing! You'll receive leadership insights soon."
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-sm">
      <div className="p-8 text-center">
        {/* Success Icon */}
        <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-primary-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg 
            className="w-8 h-8 text-white" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M5 13l4 4L19 7" 
            />
          </svg>
        </div>

        {/* Title */}
        <h3 className="font-heading text-2xl font-medium text-text-primary mb-3">
          {title}
        </h3>

        {/* Message */}
        <p className="text-text-secondary mb-6 leading-relaxed">
          {message}
        </p>

        {/* Action Button */}
        <button
          onClick={onClose}
          className="w-full bg-gradient-to-r from-primary-400 to-primary-500 text-white py-3 px-6 rounded-full font-corporate font-medium hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
        >
          Continue
        </button>
      </div>
    </Modal>
  );
};
