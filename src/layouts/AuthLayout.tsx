import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export default function AuthLayout() {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">
          <Heart className="w-12 h-12 text-pink-500" />
        </div>
      </div>
    );
  }

  if (user && location.pathname !== '/onboarding') {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 to-purple-600">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center mb-8">
          <Heart className="w-12 h-12 text-white" />
        </div>
        <Outlet />
      </div>
    </div>
  );
}