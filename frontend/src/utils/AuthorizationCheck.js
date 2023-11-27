import RoleConstant from '@/constants/RoleConstant';
import { useSelector } from 'react-redux';

const AuthorizationCheck = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const isLoggedIn = () => {
    return currentUser !== null;
  };
  const isAdmin = (user) => {
    const roles = user?.roles;
    return roles?.some((role) => role.roleName === RoleConstant.ROLE_ADMIN);
  };
  const isEmployee = () => {
    const roles = currentUser?.roles;
    return roles?.some((role) => role.roleName === RoleConstant.ROLE_EMPLOYEE);
  };

  return { isLoggedIn, isAdmin, isEmployee };
};

export default AuthorizationCheck;
