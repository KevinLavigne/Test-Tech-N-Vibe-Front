import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute({ user }) {
  if (!user.email) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
