import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem("auth_token");
  const storedRole = localStorage.getItem("role");

  if (!token || storedRole !== role) {
    return <Navigate to={`/${role}/login-${role}`} replace />;
  }

  return children;
}