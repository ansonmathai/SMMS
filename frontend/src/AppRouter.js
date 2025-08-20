import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import App from "./App";
import Add from "./Add";
import Login from "./components/Login";
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from "./contexts/AuthContext";

const AuthenticatedApp = () => (
  <Routes>
    <Route path="/" element={<ProtectedRoute />}>
      <Route index element={<App />} />
      <Route path="/create" element={<Add />} />
    </Route>
  </Routes>
);

function AppRouter() {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        {isAuthenticated ? (
          <Route path="/*" element={<AuthenticatedApp />} />
        ) : (
          <Route path="/*" element={<Navigate to="/login" replace />} />
        )}
      </Routes>
    </Router>
  );
}

export default AppRouter;
