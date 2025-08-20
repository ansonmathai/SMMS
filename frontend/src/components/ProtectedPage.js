import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const ProtectedPage = () => {
  const { logout } = useAuth();

  return (
    <div>
      <h2>Protected Content</h2>
      <p>Welcome to the protected page!</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default ProtectedPage;
