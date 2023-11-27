import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import RoleConstant from '@/constants/RoleConstant';
import { PathRoutesUser } from '@/constants/PathRoutes';
const AdminRoute = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const isAdmin = currentUser?.roles.some(
    (roleUser) => roleUser.roleName === RoleConstant.ROLE_ADMIN,
  );
  return isAdmin ? <Outlet /> : <Navigate to={PathRoutesUser.FORBIDDEN} />;
};
export default AdminRoute;
