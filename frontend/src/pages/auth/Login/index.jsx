import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { getUser, login } from '@/redux/authSlice';
import { PathRoutesAdmin, PathRoutesUser } from '@/constants/PathRoutes';
import ToastMessage from '@/components/Toast';
import LoginImg from '@/assets/login.svg';
import AuthorizationCheck from '@/utils/AuthorizationCheck';
import LoginForm from './LoginForm';
import { MessageConstant } from '@/constants/MessageConstant';
import { SYSTEM_NAME } from '@/constants/defaultData';
import { useState } from 'react';
import { ThreeBodyLoading } from '@/components/Loading';
import { setSessionExpired } from '@/redux/sessionExpiredSlice';

const shema = yup.object({
  email: yup
    .string()
    .required('Vui lòng nhập email.')
    .email('Email không hợp lệ.'),
  password: yup.string().required('Vui lòng nhập mật khẩu.'),
});
const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(shema) });

  const { contextHolder, openNotification } = ToastMessage();
  const dispath = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { isAdmin } = AuthorizationCheck();
  const onSubmit = async (credentials) => {
    setLoading(true);
    try {
      const loginResult = await dispath(login(credentials));
      console.log(loginResult);
      if (loginResult.payload?.success === false) {
        openNotification.error(loginResult?.payload?.message);
      } else {
        const getUserResult = await dispath(getUser());
        // console.log(loginResult);
        unwrapResult(loginResult);
        unwrapResult(getUserResult);
        openNotification.success(MessageConstant.LOGIN_SUCCESS);
        dispath(setSessionExpired(false));
        setTimeout(() => {
          isAdmin(getUserResult.payload)
            ? navigate(PathRoutesAdmin.STATISTICAL)
            : navigate(PathRoutesUser.HOME);
        }, 500);
      }
    } catch (err) {
      console.log(err);
      if (err.code === 'ERR_BAD_REQUEST') {
        openNotification.error('Account has been disabled!');
      }
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRedirectRegister = (e) => {
    e.preventDefault();
    // reset({
    //   phone: '',
    //   password: '',
    // });
    navigate(PathRoutesUser.REGISTER);
  };
  return (
    <div className="min-w-[30%] min-h-[500px] bg-white flex rounded-md animate-fadeInToRight shadow-mdCustom">
      {loading && <ThreeBodyLoading />}
      {contextHolder}
      <div className="w-[400px] h-full flex items-center relative ">
        <h2 className="absolute left-20 bottom-20 text-primary-500 text-32 opacity-30 font-openSans font-bold select-none">
          {SYSTEM_NAME}
        </h2>
        <img src={LoginImg} alt="" className="rounded-lg" />
      </div>
      <LoginForm
        control={control}
        handleSubmit={handleSubmit}
        errors={errors}
        onSubmit={onSubmit}
        redirectRegister={handleRedirectRegister}
      />
    </div>
  );
};

export default Login;
