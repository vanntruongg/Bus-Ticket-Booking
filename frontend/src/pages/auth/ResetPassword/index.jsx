import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import FormInput from '@/components/FormInput';
import { MdOutlinePassword } from 'react-icons/md';
import { userApi } from '@/services/userApi';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ToastMessage from '@/components/Toast';
import { PathRoutesUser } from '@/constants/PathRoutes';
import { LargeButton } from '@/components/Buttons';

const shema = yup.object({
  password: yup
    .string()
    .required('Vui lòng nhập mật khẩu.')
    .min(6, 'Mật khẩu phải có ít nhất 6 ký tự.'),
  confirmPassword: yup
    .string()
    .required('Vui lòng xác nhận mật khẩu.')
    .oneOf([yup.ref('password'), null], 'Mật khẩu xác nhận không khớp.'),
});
const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const { contextHolder, openNotification } = ToastMessage();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(shema) });

  const onSubmit = async (data) => {
    const token = searchParams.get('token');
    const dataResetPassword = {
      token: token,
      newPassword: data.password,
    };
    try {
      const res = await userApi.resetPassword(dataResetPassword);
      openNotification.success(res.message);
      setTimeout(() => {
        navigate(PathRoutesUser.LOGIN);
      }, 100);
    } catch (err) {
      openNotification.error(err.response.data.message);
      throw new Error(err);
    }
  };
  return (
    <>
      {contextHolder}
      <div
        className={`bg-white p-4 min-w-[30%] min-h-[500px] border rounded-md`}
      >
        <h2 className="text-24 font-bold font-openSans">Đặt lại mật khẩu.</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="my-4">
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <FormInput
                  field={field}
                  name={'password'}
                  errors={errors.password}
                  title={'Nhập mật khẩu mới.'}
                  type={'password'}
                  isPassword={true}
                  icon={<MdOutlinePassword size={18} />}
                />
              )}
            />
            <Controller
              name="confirmPassword"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <FormInput
                  field={field}
                  name={'confirmPassword'}
                  errors={errors.confirmPassword}
                  title={'Nhập lại mật khẩu.'}
                  type={'password'}
                  isPassword={true}
                  icon={<MdOutlinePassword size={18} />}
                />
              )}
            />
          </div>
          <div className="mt-8">
            <LargeButton>Đặt lại mật khẩu</LargeButton>
          </div>
        </form>
      </div>
    </>
  );
};

export default ResetPassword;
