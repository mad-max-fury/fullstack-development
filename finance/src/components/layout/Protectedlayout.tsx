import { Navigate, Outlet } from 'react-router-dom';

const ProtectedLayout = () => {
  const token = false;

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedLayout;
