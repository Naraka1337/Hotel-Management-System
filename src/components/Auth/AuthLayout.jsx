import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import LoginForm from './LoginForm';
import { RegisterForm } from './RegisterForm';
import PasswordReset from './PasswordReset';

const AuthLayout = () => {
  const location = useLocation();
  const [authView, setAuthView] = useState('login'); // Default to login

  // Set the initial auth view based on the URL path
  useEffect(() => {
    const path = location.pathname;
    if (path.includes('register')) {
      setAuthView('register');
    } else if (path.includes('reset')) {
      setAuthView('reset');
    } else {
      setAuthView('login');
    }
  }, [location.pathname]);

  const renderAuthForm = () => {
    switch (authView) {
      case 'login':
        return <LoginForm setAuthView={setAuthView} />;
      case 'register':
        return <RegisterForm setAuthView={setAuthView} />;
      case 'reset':
        return <PasswordReset setAuthView={setAuthView} />;
      default:
        return <LoginForm setAuthView={setAuthView} />;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
          {renderAuthForm()}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
