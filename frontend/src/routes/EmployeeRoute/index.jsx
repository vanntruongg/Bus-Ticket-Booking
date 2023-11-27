import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import RoleConstant from '@/constants/RoleConstant';
import { PathRoutesUser } from '@/constants/PathRoutes';
const EmployeeRoute = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const isEmployee = currentUser?.roles.some(
    (roleUser) => roleUser.roleName === RoleConstant.ROLE_EMPLOYEE,
  );
  return isEmployee ? <Outlet /> : <Navigate to={PathRoutesUser.FORBIDDEN} />;
};
export default EmployeeRoute;
