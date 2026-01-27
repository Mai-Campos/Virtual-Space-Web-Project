import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/UseAuth";

interface ProtectedRouteProps {
  allowedRoles?: string[];
}

export function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (
    allowedRoles &&
    !user.roles.some((role: string) => allowedRoles.includes(role))
  ) {
    return <Navigate to="/403" replace />;
  }

  return <Outlet />;
}
