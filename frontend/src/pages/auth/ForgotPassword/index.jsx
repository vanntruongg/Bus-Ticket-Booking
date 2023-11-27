import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import FormInput from '@/components/FormInput';
import { AiOutlineMail } from 'react-icons/ai';
import { userApi } from '@/services/userApi';
import ToastMessage from '@/components/Toast';
import { LargeButton } from '@/components/Buttons';
import ForgotPasswordImg from '@/assets/forgot_password.svg';

const shema = yup.object({
  email: yup
    .string()
    .required('Vui lòng nhập email.')
    .email('Email không hợp lệ.'),
});
const ForgotPassword = () => {
  const { contextHolder, openNotification } = ToastMessage();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(shema) });

  const onSubmit = async (data) => {
    const res = await userApi.forgotPassword(data);
    if (res.success) {
      openNotification.success(res.message);
    } else {
      // openNotification.error(res.message);
      openNotification.error('Account not found!');
    }
  };
  return (
    <div className="bg-white p-4 min-w-[340px] min-h-[500px] rounded-lg">
      {contextHolder}
      <h2 className="text-left text-24 font-medium">Quên mật khẩu</h2>
      <div className="w-[200px]">
        <img src={ForgotPasswordImg} alt="" className="rounded-lg" />
      </div>
      <div className={`bg-white min-w-[30%] rounded-lg`}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="my-4">
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <FormInput
                  field={field}
                  name={'email'}
                  errors={errors.email}
                  title={'Vui lòng nhập email'}
                  type={'text'}
                  icon={<AiOutlineMail size={18} />}
                />
              )}
            />
          </div>
          <div className="mt-8">
            <LargeButton type="submit">Yêu cầu đặt lại mật khẩu</LargeButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
