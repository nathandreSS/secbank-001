import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { ROUTES } from "../Constants";
import { useAuth } from "../hooks/useAuth";

interface RequireAuthProps {
  children: ReactNode;
}
const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
  const { authed } = useAuth();

  return authed ? <>{children}</> : <Navigate to={ROUTES.login} replace />;
};

export default RequireAuth;
