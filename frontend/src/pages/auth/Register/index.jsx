import { startTransition, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { LargeButton } from '@/components/Buttons';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { PathRoutesUser } from '@/constants/PathRoutes';
import FormInput from '@/components/FormInput';
import { MdOutlineEmail } from 'react-icons/md';
import { MdOutlinePassword } from 'react-icons/md';
import { BiUser } from 'react-icons/bi';
import { userApi } from '@/services/userApi';
import ToastMessage from '@/components/Toast';
import { ThreeBodyLoading } from '@/components/Loading';
import WelcomeImg from '@/assets/welcome.svg';
import { SYSTEM_NAME } from '@/constants/defaultData';

const shema = yup.object({
  firstName: yup.string().required('Vui lòng nhập tên của bạn.'),
  lastName: yup.string().required('Vui lòng nhập họ của bạn.'),
  email: yup.string().required('Email bắt buộc.').email('Email không hợp lệ'),
  password: yup
    .string()
    .required('*Mật khẩu là bắt buộc.')
    .min(6, 'Mật khẩu phải chứa ít nhất 6 ký tự.'),
});

const Register = () => {
  const [loading, setLoading] = useState(false);
  const { contextHolder, openNotification } = ToastMessage();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(shema) });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await userApi.resgister(data);
      setLoading(false);
      if (res?.success) {
        openNotification.success(res?.message);
      } else {
        openNotification.error(res.response?.data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRedirectLogin = (e) => {
    e.preventDefault();
    navigate(PathRoutesUser.LOGIN);
  };

  return (
    <div className="bg-white min-w-[30%] min-h-[500px] flex justify-center items-center rounded-lg animate-fadeInToLeft shadow-mdCustom">
      {contextHolder}
      {loading && <ThreeBodyLoading />}
      <div className="p-4 w-[400px] h-full flex items-center relative">
        <h2 className="absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] text-primary-500 text-56 opacity-30 font-pacifico font-bold select-none">
          {SYSTEM_NAME}
        </h2>
        <img src={WelcomeImg} alt="" className="rounded-lg" />
      </div>
      <div className={`bg-white h-full p-8 rounded-lg`}>
        <h2 className="text-24 font-bold font-openSans">Đăng ký.</h2>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div className="my-4">
            <Controller
              name="lastName"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <FormInput
                  field={field}
                  name={'lastName'}
                  errors={errors.lastName}
                  title={'Họ'}
                  icon={<BiUser size={18} />}
                />
              )}
            />
            <Controller
              name="firstName"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <FormInput
                  field={field}
                  name={'firstName'}
                  errors={errors.firstName}
                  title={'Tên'}
                  icon={<BiUser size={18} />}
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <FormInput
                  field={field}
                  name={'email'}
                  errors={errors.email}
                  title={'Email'}
                  icon={<MdOutlineEmail size={18} />}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <FormInput
                  field={field}
                  name={'password'}
                  errors={errors.password}
                  title={'Mật khẩu'}
                  isPassword={true}
                  type={'password'}
                  icon={<MdOutlinePassword size={18} />}
                />
              )}
            />
          </div>
          <div className="mt-6">
            <LargeButton>Đăng ký</LargeButton>
          </div>
          <div className="text-center mt-4 text-14">
            Bạn đã có tài khoản?
            <button
              className="text-white mx-1"
              onClick={(e) => handleRedirectLogin(e)}
            >
              <span className="text-primary-700"> Đăng nhập</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
