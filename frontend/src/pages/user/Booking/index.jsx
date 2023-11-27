import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Divider, Spin, Tooltip } from 'antd';

import { RiArrowGoBackLine } from 'react-icons/ri';
import SeatSelection from '@/pages/user/Booking/components/SeatSelection';
import { formatDateBooking } from '@/utils/dateUtils';
import { PathRoutesUser } from '@/constants/PathRoutes';
import ToastMessage from '@/components/Toast';
import InfoTicket from '@/pages/user/Booking/components/InfoTicket';
import PickUpDropOffInfo from '@/pages/user/Booking/components/PickUpDropOffInfo';
import { clearFromAndTo, setPickUp } from '@/redux/roundTripTicketSlice';
import { formatVND } from '@/utils/stringUtils';
import { useEffect, useState } from 'react';
import { routePointsApi } from '@/services/routePointsApi';
import InforPassenger from './components/InforPassenger';
import { paymentApi } from '@/services/paymentApi';

const commonValidation = yup.object({
  fullName: yup.string().required('Vui lòng nhập họ tên.'),
  phone: yup
    .string()
    .required('Vui lòng nhập số điện thoại.')
    .matches(
      /^(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/,
      'Số điện thoại không hợp lệ.',
    ),
  email: yup
    .string()
    .required('Vui lòng nhập email.')
    .email('Email không hợp lệ.'),
  notes: yup.string(),
});

const Booking = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [dataRoutePointsTrip, setDataRoutePointsTrip] = useState([]);
  const [dataRoutePointsRoundTrip, setDataRoutePointsRoundTrip] = useState([]);
  const [hasFetchedRoutePoints, setHasFetchedRoutePoints] = useState(false);
  // toast message global
  const { contextHolder, openNotification } = ToastMessage();
  const { trip, roundTrip } = useSelector((state) => state.roundTripTicket);
  const { from, to, fromTime, toTime, isReturn } = useSelector(
    (state) => state.trip,
  );

  const {
    control,
    setFocus,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(commonValidation),
  });

  const onSubmit = async (data) => {
    if (isReturn && (trip.seats <= 0 || roundTrip.seats <= 0)) {
      openNotification.error('Vui lòng chọn ghế');
    } else if (trip.seats <= 0) {
      openNotification.error('Vui lòng chọn ghế');
    } else {
      const tripRequests = [
        {
          tripId: trip.tripInfo.tripId,
          pickUp: trip.pickUp,
          totalPrice: trip.totalPrice,
          tripDate: trip.tripInfo.tripDate,
          seatCodes: trip.seatsCode,
        },
      ];
      // neu ve khu hoi thi them thong tin chuyen ve vao
      if (isReturn) {
        tripRequests.push({
          tripId: roundTrip?.tripInfo.tripId,
          pickUp: roundTrip?.pickUp,
          totalPrice: roundTrip?.totalPrice,
          tripDate: roundTrip?.tripInfo.tripDate,
          seatCodes: roundTrip?.seatsCode,
        });
      }

      const ticketInfo = {
        fullName: data.fullName,
        phone: data.phone,
        email: data.email,
        notes: data.notes,
        tripRequests,
      };

      // call API lấy link thanh toán, sau khi có res chuyển hướng thanh toán
      try {
        const res = await paymentApi.createOrderPayment(trip.totalPrice);
        localStorage.setItem('dataTicketBooking', JSON.stringify(ticketInfo));
        window.location.href = res;
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    if (!isReturn) {
      getDataRoutePointRouteTrip();
    } else {
      getDataRoutePointRouteRoundTrip();
    }
    setHasFetchedRoutePoints(true);
  }, [hasFetchedRoutePoints]);

  const getDataRoutePointRouteTrip = async () => {
    try {
      setIsLoading(true);
      const [routePointsData] = await Promise.all([
        routePointsApi.getAllByTRipId(trip.tripInfo.tripId),
      ]);
      setDataRoutePointsTrip(routePointsData);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getDataRoutePointRouteRoundTrip = async () => {
    try {
      setIsLoading(true);
      const [routePointsData, roundTripRoutePointData] = await Promise.all([
        routePointsApi.getAllByTRipId(trip.tripInfo.tripId),
        routePointsApi.getAllByTRipId(roundTrip.tripInfo.tripId),
      ]);
      setDataRoutePointsTrip(routePointsData);
      setDataRoutePointsRoundTrip(roundTripRoutePointData);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBackHome = () => {
    changeTrip();
  };

  const cancelBooking = () => {
    changeTrip();
  };

  const changeTrip = () => {
    dispatch(clearFromAndTo());
    navigate(PathRoutesUser.HOME_PAGE);
  };

  const pickUpTripChange = (pickUpValue) => {
    dispatch(setPickUp({ type: 'trip', pickUp: pickUpValue.pointId }));
  };

  const pickUpRoundTripChange = (pickUpValue) => {
    dispatch(setPickUp({ type: 'roundTrip', pickUp: pickUpValue.pointId }));
  };

  return (
    <div className="pt-[60px]">
      {contextHolder}
      {/** Header */}
      <div className="h-[100px] p-4 mb-2 flex items-center justify-between rounded-full">
        <Tooltip placement="right" title="Quay lại" color="#c0c0c0">
          <div
            className="flex items-center h-10 p-4 rounded-full cursor-pointer transition-all duration-300 hover:bg-opacity-50 hover:scale-110 hover:bg-primary-blue-50"
            onClick={handleBackHome}
          >
            <RiArrowGoBackLine />
          </div>
        </Tooltip>
        <div className="flex flex-col w-auto text-center font-medium">
          <div className="text-28 bg-gradient-to-r from-primary-300 to-primary-800 text-transparent bg-clip-text">
            {`${from.locationName} - ${to.locationName}`}
          </div>
          <span>
            {formatDateBooking(fromTime)}
            {isReturn && `- ${formatDateBooking(toTime)}`}
          </span>
        </div>
        <div className=""></div>
      </div>

      {/** Content */}
      <div className="bg-white p-4 w-full flex gap-8 justify-between rounded-lg">
        <div className="flex flex-col flex-1">
          <form onSubmit={handleSubmit(onSubmit)}>
            <SeatSelection />

            {/** PickUp & DropOff */}
            {isLoading ? (
              <div className="flex items-center justify-center min-h-[200px]">
                <Spin size="small" />
              </div>
            ) : (
              <div className="p-4 border w-full">
                {isReturn ? (
                  <div className="flex gap-8">
                    <PickUpDropOffInfo
                      desTrip={'Chuyến đi'}
                      dateTrip={formatDateBooking(fromTime)}
                      pickUpChange={pickUpTripChange}
                      dataRoutePoints={dataRoutePointsTrip}
                    />
                    <div className="border-r"></div>
                    <PickUpDropOffInfo
                      desTrip={'Chuyến về'}
                      dateTrip={formatDateBooking(toTime)}
                      pickUpChange={pickUpRoundTripChange}
                      dataRoutePoints={dataRoutePointsRoundTrip}
                    />
                  </div>
                ) : (
                  <PickUpDropOffInfo
                    pickUpChange={pickUpTripChange}
                    dataRoutePoints={dataRoutePointsTrip}
                  />
                )}
              </div>
            )}
            <InforPassenger
              control={control}
              errors={errors}
              setFocus={setFocus}
            />
            <div className="p-6 border flex items-center">
              <div className="flex flex-col gap-2">
                <div
                  className="
                  w-20 h-8 px-4 py-1 border rounded-full overflow-hidden relative
                  before:content-[''] before:absolute before:top-0 before:left-[-10%] before:h-full before:w-[60%] before:bg-red-500 before:skew-x-[45deg]
                  after:absolute after:top-0 after:left-[50%] after:h-full after:w-[60%] after:bg-blue-500 after:skew-x-[45deg]"
                >
                  <span className="absolute top-0 left-0 h-full w-full flex items-center justify-center text-white z-10">
                    VN Pay
                  </span>
                </div>
                <span className="font-medium text-22">
                  {formatVND(Number(trip.totalPrice + roundTrip.totalPrice))}
                </span>
              </div>
              <div className="flex flex-auto items-center justify-end">
                <span
                  className="border border-primary-500 mr-6 w-28 py-1.5 text-center font-semibold rounded-full cursor-pointer"
                  onClick={cancelBooking}
                >
                  Hủy
                </span>
                <button className="w-28 py-1.5 bg-primary-500 text-white font-semibold border rounded-full transition-all duration-300 hover:bg-primary-600">
                  Thanh toán
                </button>
              </div>
            </div>
          </form>
        </div>

        {/** info ticket */}
        <div className="min-w-[330px] flex flex-col gap-6">
          <InfoTicket title={'lượt đi'} trip={trip} tripInfo={trip.tripInfo} />
          {isReturn && (
            <InfoTicket
              title={'lượt về'}
              trip={roundTrip}
              tripInfo={roundTrip.tripInfo}
            />
          )}
          <div className="px-4 py-2 border rounded-md">
            <h3 className="text-20 font-medium py-2">Chi tiết giá</h3>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Giá vé lượt đi</span>
              <span className="text-14 font-medium text-primary-blue-500">
                {formatVND(trip.totalPrice)}
              </span>
            </div>
            {isReturn && (
              <div className="flex justify-between py-0.5">
                <span className="text-gray-500">Giá vé lượt về</span>
                <span className="text-14 font-medium text-primary-blue-500">
                  {formatVND(roundTrip.totalPrice)}
                </span>
              </div>
            )}
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Phí thanh toán</span>
              <span className="text-14 font-medium">{formatVND(0 * 0)}</span>
            </div>
            <Divider className="py-0" />
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Tổng tiền</span>
              <span className="text-14 font-medium text-primary-purple-500">
                {formatVND(Number(trip.totalPrice + roundTrip.totalPrice))}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
