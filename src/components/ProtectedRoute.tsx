import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const adminToken = localStorage.getItem('admin_token');
  
  if (!adminToken) {
    return <Navigate to="/admin/login" replace />;
  }
  
  return <>{children}</>;
};