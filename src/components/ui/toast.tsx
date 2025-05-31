'use client';

import React, { useEffect, useState } from 'react';
import { Check, X, Info } from 'lucide-react';

export interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  duration?: number;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type,
  duration = 3000,
  onClose
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    const enterTimer = setTimeout(() => setIsVisible(true), 100);
    
    // Trigger exit animation
    const exitTimer = setTimeout(() => {
      setIsLeaving(true);
      setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 200);
      }, 200);
    }, duration);

    return () => {
      clearTimeout(enterTimer);
      clearTimeout(exitTimer);
    };
  }, [duration, onClose]);

  const handleClose = () => {
    setIsLeaving(true);
    setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 200);
    }, 200);
  };

  const typeStyles = {
    success: {
      bg: "bg-white",
      border: "border-green-100",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      textColor: "text-gray-800",
      progressBar: "bg-green-500"
    },
    error: {
      bg: "bg-white",
      border: "border-red-100", 
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
      textColor: "text-gray-800",
      progressBar: "bg-red-500"
    },
    info: {
      bg: "bg-white",
      border: "border-blue-100",
      iconBg: "bg-blue-100", 
      iconColor: "text-blue-600",
      textColor: "text-gray-800",
      progressBar: "bg-blue-500"
    }
  };

  const currentStyle = typeStyles[type];

  const icons = {
    success: <Check className="w-5 h-5" />,
    error: <X className="w-5 h-5" />,
    info: <Info className="w-5 h-5" />
  };

  return (
    <div 
      className={`
        relative w-96 ${currentStyle.bg} ${currentStyle.border} border rounded-xl shadow-lg
        transition-all duration-300 ease-in-out transform
        ${isVisible && !isLeaving 
          ? 'translate-x-0 opacity-100 scale-100' 
          : 'translate-x-full opacity-0 scale-95'
        }
      `}
      style={{
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      }}
    >
      {/* Progress bar */}
      <div className="absolute top-0 left-0 h-1 rounded-t-xl bg-gray-100 w-full overflow-hidden">
        <div 
          className={`h-full ${currentStyle.progressBar} transition-all ease-linear`}
          style={{
            width: isVisible ? '0%' : '100%',
            transitionDuration: `${duration}ms`
          }}
        />
      </div>

      <div className="p-4">
        <div className="flex items-start space-x-3">
          {/* Icon */}
          <div className={`
            flex-shrink-0 w-8 h-8 ${currentStyle.iconBg} ${currentStyle.iconColor} 
            rounded-full flex items-center justify-center
          `}>
            {icons[type]}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <p className={`text-sm font-medium ${currentStyle.textColor} leading-relaxed`}>
              {message}
            </p>
          </div>

          {/* Close button */}
          <button
            onClick={handleClose}
            className="flex-shrink-0 ml-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            aria-label="Close notification"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
