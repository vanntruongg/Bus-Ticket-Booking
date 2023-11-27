import { useNavigate } from 'react-router-dom';

export const performNavigate = (path) => {
  const navigate = useNavigate();
  navigate(path);
};
