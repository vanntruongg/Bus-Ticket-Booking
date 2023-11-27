import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import Input from '@/components/Input';
import { ticketApi } from '@/services/ticketApi';
import { useState } from 'react';
import { ThreeBodyLoading } from '@/components/Loading';

import TicketInfor from '@/components/TicketInfor';
import ToastMessage from '@/components/Toast';

const searchTicketValidationShema = yup.object({
  phone: yup
    .string()
    .required('Vui lòng nhập số điện thoại.')
    .matches(
      /^(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/,
      'Số điện thoại không hợp lệ.',
    ),
  ticketId: yup.string().required('Vui lòng nhập mã vé'),
});

const SearchTicket = () => {
  const [loading, setLoading] = useState(false);
  const [ticket, setTicket] = useState([]);
  const { contextHolder, openNotification } = ToastMessage();
  const {
    control,
    setFocus,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(searchTicketValidationShema),
  });

  const onSubmit = async (data) => {
    console.log('Search Ticket Info: ', data);
    // handle submit
    setLoading(true);
    try {
      const res = await ticketApi.getTicketByPhoneAndTicketid(
        data.phone,
        data.ticketId,
      );
      setTicket([...ticket, res.data]);
      console.log('res: ', [...res.data]);
      openNotification.success(res.message);
    } catch (err) {
      console.log('err: ', err);
      openNotification.error(err.response.data.message);
      // throw new Error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 mt-60">
      {contextHolder}
      <div className="bg-white mx-16 py-4 rounded-xl -translate-y-32 shadow-md">
        {loading && <ThreeBodyLoading />}
        <section className="w-[50%] mx-auto mb-12">
          <div className="py-4 bg-gradient-to-r from-primary-400 via-primary-500 to-primary-400 text-transparent bg-clip-text">
            <h2 className="text-center text-24 uppercase">
              Tra Cứu Thông tin đặt vé
            </h2>
          </div>
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-8">
              <Controller
                name="phone"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Input
                    field={field}
                    name={'phone'}
                    setFocus={setFocus}
                    errors={errors.phone}
                    type="number"
                    title={'Số điện thoại'}
                  />
                )}
              />
              <Controller
                name="ticketId"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Input
                    field={field}
                    name={'ticketId'}
                    setFocus={setFocus}
                    errors={errors.ticketId}
                    title={'Mã vé'}
                  />
                )}
              />
              <div className="flex justify-center cursor-pointer">
                <button
                  type="submit"
                  className="px-12 py-1.5 bg-white text-primary-500 font-medium border border-primary-500 rounded-full transition-all duration-300 hover:bg-primary-500 hover:text-white"
                >
                  Tra cứu
                </button>
              </div>
            </div>
          </form>
        </section>
        {ticket.length != 0 && <TicketInfor ticket={ticket} />}
      </div>
    </div>
  );
};

export default SearchTicket;
