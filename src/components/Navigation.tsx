import React from 'react';
import { NavLink } from 'react-router-dom';
import { Heart, Users, MessageCircle, User } from 'lucide-react';

export default function Navigation() {
  const navItems = [
    { to: '/', icon: Heart, label: 'Discover' },
    { to: '/matches', icon: Users, label: 'Matches' },
    { to: '/messages', icon: MessageCircle, label: 'Messages' },
    { to: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex flex-col items-center px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-pink-600'
                    : 'text-gray-500 hover:text-pink-600'
                }`
              }
            >
              <Icon className="w-6 h-6" />
              <span className="mt-1">{label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}