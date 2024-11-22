import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { ROUTES } from "../Constants";
import { useAuth } from "../hooks/useAuth";

interface RequireUnauthProps {
  children: ReactNode;
}
function RequireUnauth({ children }: RequireUnauthProps) {
  const { authed } = useAuth();

  return !authed ? <>{children}</> : <Navigate to={ROUTES.home} replace />;
}

export default RequireUnauth;
