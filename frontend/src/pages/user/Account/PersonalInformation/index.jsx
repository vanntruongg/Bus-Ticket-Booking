import { useEffect, useRef, useState } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';

import AvatarDetault from '@/assets/avatar-default.png';
import Input from './Input';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import InputLabel from '@/components/InputLabel';
import { Button, DatePicker, Spin } from 'antd';
import dayjs from 'dayjs';
import ToastMessage from '@/components/Toast';
import { userApi } from '@/services/userApi';
import axios from 'axios';
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';
import { ThreeBodyLoading } from '@/components/Loading';
import { getUser, setCurrentUser } from '@/redux/authSlice';
import authApi from '@/services/authApi';

const createUserShema = yup.object({
  firstName: yup.string().required('Vui lòng nhập tên.'),
  lastName: yup.string().required('Vui lòng nhập họ.'),
  phone: yup
    .string()
    .required('Vui lòng nhập số điện thoại.')
    .matches(/^(?:0[1-9]|84[1-9])(?:\d{8,9})$/, 'Số điện thoại không hợp lệ.'),
  birthday: yup.dayjs,
  address: yup.string().nullable(),
  email: yup
    .string()
    .required('Vui lòng nhập email.')
    .email('Email không hợp lệ.'),
  imgUrl: yup.mixed().nullable(),
});

const PersonalInformation = () => {
  const {
    control,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(createUserShema) });
  const { currentUser } = useSelector((state) => state.auth);
  const [avatarPreview, setAvatarPreview] = useState(
    currentUser?.imgUrl || AvatarDetault,
  );
  const [loading, setLoading] = useState(false);
  const { contextHolder, openNotification } = ToastMessage();

  useEffect(() => {
    return () => avatarPreview && URL.revokeObjectURL(avatarPreview.preview);
  }, [avatarPreview]);

  const handlePerviewAvatar = (e) => {
    // console.log(e);
    const file = e.target.files[0];
    setImageSelected(file);
    file.preview = URL.createObjectURL(file);
    setAvatarPreview(file.preview);
  };

  const [imageSelected, setImageSelected] = useState(null);

  const handleUploadImage = async (file) => {
    if (imageSelected !== null) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'vefligkj');

      return await axios
        .post(
          'https://api.cloudinary.com/v1_1/dbasr47sq/image/upload',
          formData,
        )
        .then((res) => {
          // console.log('res upload: ', res.data.secure_url);
          return res.data.secure_url;
        });
    } else {
      return avatarPreview;
    }
  };

  const dispatch = useDispatch();

  const handleUpdate = async (data) => {
    setLoading(true);
    const imgUrl = await handleUploadImage(imageSelected);
    // console.log(imgUrl);
    if (typeof imgUrl === 'string') {
      setValue('imgUrl', null);
    }
    const birthday =
      data.birthday !== null ? dayjs(data.birthday).format('DD-MM-YYYY') : null;

    const formData = {
      imgUrl: imgUrl,
      lastName: data.lastName,
      firstName: data.firstName,
      email: data.email,
      phone: data.phone,
      birthday: birthday,
      address: data.address,
    };
    console.log('formData: ', formData);
    try {
      const res = await userApi.updateUser(formData);
      console.log(res);
      openNotification.success(res.message);
      const userUpdate = await authApi.getUser();
      dispatch(setCurrentUser(userUpdate));
    } catch (err) {
      openNotification.error(err.response.data.message);
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  };
  // console.log(currentUser);
  return (
    <>
      {contextHolder}
      {loading ? (
        <ThreeBodyLoading />
      ) : (
        <div className="rounded-md">
          <section className="mb-4">
            <h2 className="text-24 font-semibold">Thông tin tài khoản</h2>
            <span className="text-gray-500 text-14">
              Quản lý thông tin hồ sơ của bạn
            </span>
          </section>
          <section className="grid grid-cols-6 gap-1 py-8 px-1 border rounded-md">
            <div className="col-span-2 flex flex-col items-center">
              <div className="w-[160px] border rounded-full overflow-hidden">
                <img
                  src={avatarPreview ? avatarPreview : currentUser?.imgUrl}
                  alt="Ảnh đại diện"
                  className="w-full"
                />
              </div>
              <input
                id="chooseAvatar"
                type="file"
                accept="png, jpeg"
                onChange={handlePerviewAvatar}
                className="border sr-only"
              />
              <label
                htmlFor="chooseAvatar"
                className="mt-8 mb-4 cursor-pointer"
              >
                <span className="px-4 py-2 border border-gray-500 rounded-full">
                  Chọn ảnh
                </span>
              </label>
              <span className="text-14 text-gray-500">
                Định dạng: PNG, JPEG
              </span>
            </div>
            <div className="col-span-4">
              <form
                onSubmit={handleSubmit(handleUpdate)}
                encType="multipart/form-data"
              >
                <Controller
                  name="lastName"
                  control={control}
                  defaultValue={currentUser?.lastName}
                  render={({ field }) => (
                    <InputLabel
                      placeholder={'Vd: Nguyễn'}
                      type={'text'}
                      label={'Họ:'}
                      field={field}
                      errors={errors.lastName}
                    />
                  )}
                />
                <Controller
                  name="firstName"
                  control={control}
                  defaultValue={currentUser?.firstName}
                  render={({ field }) => (
                    <InputLabel
                      placeholder={'Vd: Văn A'}
                      type={'text'}
                      label={'Tên:'}
                      field={field}
                      errors={errors.firstName}
                    />
                  )}
                />
                <Controller
                  name="phone"
                  control={control}
                  defaultValue={currentUser?.phone}
                  render={({ field }) => (
                    <InputLabel
                      placeholder={'Nhập số điện thoại'}
                      type={'number'}
                      label={'Số điện thoại:'}
                      field={field}
                      errors={errors.phone}
                    />
                  )}
                />
                <div
                // className={`${type === 'update' && 'hidden'}`}
                >
                  <Controller
                    name="email"
                    control={control}
                    defaultValue={currentUser?.email}
                    render={({ field }) => (
                      <InputLabel
                        placeholder={'Nhập email'}
                        type={'email'}
                        label={'Email:'}
                        field={field}
                        className={'pointer-events-none cursor-not-allowed'}
                        errors={errors.email}
                      />
                    )}
                  />
                </div>
                <Controller
                  name="birthday"
                  control={control}
                  defaultValue={
                    currentUser?.birthday
                      ? dayjs(currentUser?.birthday, 'DD/MM/YYYY')
                      : null
                  }
                  render={({ field, form }) => (
                    // <InputLabel
                    //   placeholder={'Vd: 12/10/2002'}
                    //   type={'date'}
                    //   label={'Ngày sinh:'}
                    //   field={field}
                    //   errors={errors.phone}
                    // />
                    <div className="flex">
                      <div className="w-40">Ngày sinh:</div>
                      <DatePicker
                        {...field}
                        placeholder="Chọn ngày sinh"
                        format={'DD/MM/YYYY'}
                        className="w-full"
                      />
                    </div>
                  )}
                />
                <Controller
                  name="address"
                  control={control}
                  defaultValue={currentUser?.address}
                  render={({ field }) => (
                    <InputLabel
                      placeholder={'Vd: An Khánh, Ninh Kiều, Cần Thơ'}
                      type={'text'}
                      label={'Địa chỉ:'}
                      field={field}
                      errors={errors.address}
                    />
                  )}
                />
                <div className="flex justify-end gap-4 mt-4">
                  <Button
                    type="primary"
                    // loading={loading}
                    onClick={handleSubmit(handleUpdate)}
                  >
                    {/* {type === 'update' ? 'Cập nhật' : 'Thêm'} */}
                    Cập nhật
                  </Button>
                </div>
              </form>
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default PersonalInformation;
