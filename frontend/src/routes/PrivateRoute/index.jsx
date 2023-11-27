import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  return isLoggedIn ? <Outlet /> : <Navigate to="/dang-nhap" />;
};

export default PrivateRoute;
