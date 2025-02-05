import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const storedToken = localStorage.getItem('token');

  return isAuthenticated || storedToken ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
