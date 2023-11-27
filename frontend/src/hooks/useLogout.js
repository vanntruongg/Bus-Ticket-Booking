import authApi from '@/services/authApi';
import { PathRoutesUser } from '@/constants/PathRoutes';
import { setCurrentUser, setIsLoggedIn } from '@/redux/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const useLogout = () => {
  const dispath = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    try {
      dispath(setCurrentUser(null));
      dispath(setIsLoggedIn(false));
      authApi.logout();
      navigate(PathRoutesUser.LOGIN);
    } catch (err) {
      console.log(err);
    }
  };

  return logout;
};

export default useLogout;
