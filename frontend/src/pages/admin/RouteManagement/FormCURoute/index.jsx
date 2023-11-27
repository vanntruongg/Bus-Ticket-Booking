import InputLabel from '@/components/InputLabel';
import { ACTIONS } from '@/constants/commonConstant';
import locationApi from '@/services/locationApi';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Select } from 'antd';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
const { Option } = Select;

const shema = yup.object({
  originId: yup.string().required('Vui lòng chọn điểm đầu'),
  destinationId: yup.string().required('Vui lòng chọn điểm cuối'),
  journeyDuration: yup.string().required('Vui lòng nhập thời gian.'),
  routeLength: yup.string().required('Vui lòng nhập độ dài'),
  price: yup.string().required('Vui lòng nhập giá'),
});

const FormCURoute = ({ type, route = null, setOpen, handleRoute, loading }) => {
  const [listLocation, setListLocation] = useState([]);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(shema) });

  const getAllLocation = async () => {
    try {
      const res = await locationApi.getAllProvince();
      setListLocation(res.data);
    } catch (err) {
      throw new Error(err);
    }
  };
  useEffect(() => {
    getAllLocation();
  }, []);
  const handleSubmitForm = (data) => {
    // cập nhật thì cần thêm routeId
    const formData =
      type === ACTIONS.UPDATE ? { routeId: route?.routeId, ...data } : data;

    handleRoute(formData);
  };

  return (
    <form action="" onSubmit={handleSubmit(handleSubmitForm)}>
      <Controller
        control={control}
        name="originId"
        defaultValue={route?.originId?.locationId}
        render={({ field }) => (
          <>
            <div className="flex items-center">
              <span className="w-40">Chọn điểm đầu: </span>
              <Select
                {...field}
                placeholder={'Chọn điểm đầu'}
                className="w-full"
              >
                {listLocation.map((location) => (
                  <Option key={location.locationId} value={location.locationId}>
                    {location.locationName}
                  </Option>
                ))}
              </Select>
            </div>
            {errors.originId && (
              <span className="text-12 text-red-500">
                {errors.originId.message}
              </span>
            )}
          </>
        )}
      />
      <div className="my-2">
        <Controller
          control={control}
          name="destinationId"
          defaultValue={route?.destinationId?.locationId}
          render={({ field }) => (
            <>
              <div className="flex items-center">
                <span className="w-40">Chọn điểm cuối: </span>
                <Select
                  {...field}
                  placeholder={'Chọn điểm cuối'}
                  className="w-full"
                >
                  {listLocation.map((location) => (
                    <Option
                      key={location.locationId}
                      value={location.locationId}
                    >
                      {location.locationName}
                    </Option>
                  ))}
                </Select>
              </div>
              {errors.destinationId && (
                <span className="text-12 text-red-500">
                  {errors.destinationId.message}
                </span>
              )}
            </>
          )}
        />
      </div>
      <Controller
        control={control}
        name="journeyDuration"
        defaultValue={route?.journeyDuration}
        render={({ field }) => (
          <InputLabel
            field={field}
            label={'Nhập thời gian:'}
            suffix="Giờ"
            placeholder={'Nhập thời gian'}
            errors={errors.journeyDuration}
          />
        )}
      />

      <Controller
        control={control}
        name="routeLength"
        defaultValue={route?.routeLength}
        render={({ field }) => (
          <InputLabel
            field={field}
            label={'Nhập độ dài:'}
            placeholder={'Nhập độ dài'}
            errors={errors.routeLength}
          />
        )}
      />
      <Controller
        control={control}
        name="price"
        defaultValue={route?.price}
        render={({ field }) => (
          <InputLabel
            field={field}
            label={'Nhập giá:'}
            placeholder={'Nhập giá'}
            errors={errors.price}
          />
        )}
      />
      <div className="flex justify-end gap-4 mt-4">
        <Button onClick={() => setOpen(false)}>Hủy</Button>
        <Button
          type="primary"
          loading={loading}
          onClick={() => handleSubmit(handleSubmitForm)()}
        >
          {type === 'update' ? 'Cập nhật' : 'Thêm'}
        </Button>
      </div>
    </form>
  );
};

export default FormCURoute;
