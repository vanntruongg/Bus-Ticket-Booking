import { Controller, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { MdOutlinePassword } from 'react-icons/md';
import FormInput from '@/components/FormInput';
import { useState } from 'react';
import ToastMessage from '@/components/Toast';
import { userApi } from '@/services/userApi';
import { Button, Spin } from 'antd';

const changePasswordShema = yup.object({
  oldPassword: yup.string().required('Vui lòng nhập mật khẩu cũ.'),
  newPassword: yup
    .string()
    .required('Vui lòng nhập mật khẩu mới.')
    .min(6, 'Mật khẩu mới phải có ít nhất 6 ký tự'),
  confirmPassword: yup
    .string()
    .required('Vui lòng xác nhận mật khẩu mới.')
    .oneOf([yup.ref('newPassword'), null], 'Mật khẩu không trùng khớp.'),
});

const ChangePassword = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const { contextHolder, openNotification } = ToastMessage();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: yupResolver(changePasswordShema) });
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const formData = {
        email: currentUser?.email,
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      };
      const res = await userApi.changePassword(formData);
      // console.log(res);
      openNotification.success(res.message);
    } catch (err) {
      console.log(err);
      openNotification.error(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="rounded-md w-[60%] mx-auto">
      {contextHolder}
      <section className="mb-4">
        <h2 className="text-24 font-semibold">Đặt lại mật khẩu</h2>
        <span className="text-gray-500 text-14">
          Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác
        </span>
      </section>
      <section className="p-4 pb-0 border border-gray-300 rounded-md">
        {loading ? (
          <div className="min-h-[300px] flex items-center justify-center">
            <Spin />
          </div>
        ) : (
          <>
            <h3 className="text-primary-700 text-center text-28 font-medium">{`${currentUser.email}`}</h3>
            <div className="">
              <form action="" onSubmit={handleSubmit(onSubmit)}>
                <div className="py-2">
                  <Controller
                    name="oldPassword"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <FormInput
                        field={field}
                        name={'oldPassword'}
                        errors={errors.oldPassword}
                        title={'Mật khẩu cũ'}
                        isPassword={true}
                        type={'password'}
                        icon={<MdOutlinePassword size={18} />}
                        style={'text-gray-500 border-gray-500'}
                      />
                    )}
                  />
                </div>
                <div className="py-2">
                  <Controller
                    name="newPassword"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <FormInput
                        field={field}
                        name={'newPassword'}
                        errors={errors.newPassword}
                        title={'Mật khẩu mới'}
                        isPassword={true}
                        type={'password'}
                        icon={<MdOutlinePassword size={18} />}
                        style={'text-gray-500 border-gray-500'}
                      />
                    )}
                  />
                </div>
                <div className="py-2">
                  <Controller
                    name="confirmPassword"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <FormInput
                        field={field}
                        name={'confirmPassword'}
                        errors={errors.confirmPassword}
                        title={'Xác nhận mật khẩu'}
                        isPassword={true}
                        type={'password'}
                        icon={<MdOutlinePassword size={18} />}
                        style={'text-gray-500 border-gray-500'}
                      />
                    )}
                  />
                </div>
                <div className="flex justify-center gap-4 my-10 mx-16 text-center">
                  <span className="w-full py-2 mx-4 border border-gray-300 rounded-full cursor-pointer transition-all duration-300 hover:bg-gray-200">
                    Hủy
                  </span>
                  <button className="w-full h-full py-2 bg-primary-500 text-white font-medium border rounded-full transition-all duration-300 hover:bg-white hover:border-primary-500 hover:text-primary-500">
                    Xác nhận
                  </button>
                </div>
              </form>
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default ChangePassword;
