import { Controller } from 'react-hook-form';
import Input from '@/components/Input';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { PathRoutesUser } from '@/constants/PathRoutes';

const InforPassenger = ({ control, errors, setFocus }) => {
  const { currentUser } = useSelector((state) => state.auth);

  return (
    <div className="p-4 border w-full flex justify-between gap-8">
      <section className="flex flex-col gap-4 p-4 w-full">
        <div className="flex justify-between items-end">
          <h3 className="">
            Thông tin khách hàng <span className="text-red-500">(*)</span>
          </h3>
          {!currentUser && (
            <Link to={PathRoutesUser.LOGIN}>
              <span className="text-14 text-blue-400 hover:text-blue-600 hover:underline">
                Đăng nhập
              </span>
            </Link>
          )}

        </div>
        <div className="flex flex-col gap-10">
          <Controller
            name="fullName"
            control={control}
            defaultValue={
              currentUser ? `${currentUser?.lastName} ${currentUser?.firstName}` : ''
            }
            render={({ field }) => (
              <Input
                field={field}
                name={'fullName'}
                setFocus={setFocus}
                errors={errors.fullName}
                title={'Họ và tên'}
              />
            )}
          />
          <Controller
            name="phone"
            control={control}
            defaultValue={currentUser ? currentUser?.phone : ''}
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
            name="email"
            control={control}
            defaultValue={currentUser ? currentUser?.email : ''}
            render={({ field }) => (
              <Input
                field={field}
                name={'email'}
                setFocus={setFocus}
                errors={errors.email}
                type="email"
                title={'Email'}
              />
            )}
          />
          <Controller
            name="notes"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <textarea
                {...field}
                name={'notes'}
                placeholder="Ghi chú (vd: Địa chỉ trung chuyển)"
                className="border p-2 outline-none placeholder:text-[13px] focus-within:border-primary-purple-500"
              />
            )}
          />
        </div>
      </section>

      {/** terms & conditons */}
      <section className="w-full">
        <h3 className="text-center text-primary-purple-500 uppercase">
          Điều khoản & Lưu ý
        </h3>
        <p className="text-14 font-medium">
          (*) Quý khách vui lòng có mặt tại bến xuất phát của xe trước ít nhất
          30 phút giờ xe khởi hành, mang theo thông báo đã thanh toán vé thành
          công có chứa mã vé được gửi từ hệ thống ONLINE BUS TICKET BOOKING. Vui
          lòng liên hệ Trung tâm tổng đài 8080 3030 để được hỗ trợ.
        </p>
        <p className="text-14 font-medium">
          (*) Nếu quý khách có nhu cầu trung chuyển, vui lòng liên hệ Tổng đài
          trung chuyển 3030 8080 trước khi đặt vé. Chúng tôi không đón/trung
          chuyển tại những điểm xe trung chuyển không thể tới được.
        </p>
      </section>
    </div>
  );
};

export default InforPassenger;
