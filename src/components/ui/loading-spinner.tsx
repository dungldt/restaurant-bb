import React from 'react';
import { type LoadingSpinnerProps } from '~/types';

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message = 'Loading...' }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
      <div className="text-gray-600 text-lg">{message}</div>
    </div>
  );
};
