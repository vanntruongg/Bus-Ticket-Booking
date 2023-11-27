import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import InputLabel from '@/components/InputLabel';
import { Button, Checkbox, DatePicker } from 'antd';
import { rolesData, rolesMapValue } from '@/constants/defaultData';
import dayjs from 'dayjs';
import { useState } from 'react';

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
  roles: yup
    .array()
    .required('Vui lòng chọn ít nhất 1 vai trò.')
    .of(yup.string().oneOf(['1', '2', '3'], 'Vui lòng chọn vai trò hợp lệ.')),
});

// form create & update user
const FormCUUser = ({
  type,
  user = null,
  setOpenModal,
  handleUser,
  loading,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(createUserShema) });
  const [birthday, setBirthday] = useState(user?.birthday);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <form onSubmit={handleSubmit(handleUser)}>
      <Controller
        name="lastName"
        control={control}
        defaultValue={user?.lastName}
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
        defaultValue={user?.firstName}
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
        defaultValue={user?.phone}
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
      <div className={`${type === 'update' && 'hidden'}`}>
        <Controller
          name="email"
          control={control}
          defaultValue={user?.email}
          render={({ field }) => (
            <InputLabel
              placeholder={'Nhập email'}
              type={'email'}
              label={'Email:'}
              field={field}
              errors={errors.email}
            />
          )}
        />
      </div>
      <Controller
        name="birthday"
        control={control}
        defaultValue={birthday ? dayjs(birthday, 'DD/MM/YYYY') : null}
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
        defaultValue={user?.address}
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
      <div className="flex gap-4">
        <span className="w-20">Phân quyền:</span>
        <Controller
          name="roles"
          control={control}
          defaultValue={user?.roles.map((role) => role.id)}
          render={({ field }) => (
            <Checkbox.Group options={rolesData} {...field} />
          )}
        />
      </div>
      {errors.roles && (
        <p className="text-12 text-red-500">{errors.roles.message}</p>
      )}
      <div className="flex justify-end gap-4 mt-4">
        <Button onClick={() => handleCloseModal()}>Hủy</Button>
        <Button
          type="primary"
          loading={loading}
          onClick={() => handleSubmit(handleUser)()}
        >
          {type === 'update' ? 'Cập nhật' : 'Thêm'}
        </Button>
      </div>
    </form>
  );
};

export default FormCUUser;
