import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

export default function ConfirmEmail() {
  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <Heart className="w-12 h-12 text-pink-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-4">Check Your Email</h2>
        <p className="text-gray-600 mb-6">
          We've sent you a confirmation email. Please check your inbox and click the link to verify your account.
        </p>
        <Link
          to="/login"
          className="inline-block text-pink-600 hover:text-pink-500"
        >
          Return to login
        </Link>
      </div>
    </div>
  );
}