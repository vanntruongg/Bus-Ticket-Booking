import { useEffect, useRef, useState } from 'react';
import { AiOutlineSwap } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Radio } from 'antd';

import {
  setFrom,
  setTo,
  setIsReturn,
  setToTime,
  setFromTime,
} from '@/redux/tripSlice';
import DropDownSelectDate from '../SelectDate';
import ToastMessage from '@/components/Toast';
import { ThreeBodyLoading } from '@/components/Loading';
import DropDownSelectLocation from '../SelectLocation';
import { searchTrip } from '@/services/apiUtils';

const SearchTrip = () => {
  const { from, to, fromTime, toTime, isReturn } = useSelector(
    (state) => state.trip,
  );
  const dispatch = useDispatch();
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // toast message
  const { contextHolder, openNotification } = ToastMessage();
  const [isOpenOrigin, setIsOpenOrigin] = useState(false);
  const [isOpenDestination, setIsOpenDestination] = useState(false);

  const handleOriginChange = (name, code) => {
    dispatch(
      setFrom({
        locationName: name,
        locationCode: code,
      }),
    );
    setIsOpenOrigin(!isOpenOrigin); // chọn xong đóng dropdown
    setIsOpenDestination(!isOpenDestination); // và mở dropdown chọn điểm đến
  };

  const handleDestinationChange = (name, code) => {
    dispatch(
      setTo({
        locationName: name,
        locationCode: code,
      }),
    );
    setIsOpenDestination(!isOpenDestination); // chọn xong đóng dropdown
  };

  const handleFromTimeChange = (dateString) => {
    if (isReturn) {
      dispatch(setFromTime(dateString));
      // when reset fromTime, reset toTime
      dispatch(setToTime(''));
    } else {
      dispatch(setFromTime(dateString));
    }
  };

  const handleToTimeChange = (dateString) => {
    dispatch(setToTime(dateString));
  };

  const handleOpenOrigin = () => {
    setIsOpenOrigin(!isOpenOrigin);
  };

  const handleOpenDestination = () => {
    setIsOpenDestination(!isOpenDestination);
  };

  // swap value origin & destination
  const handleSwapOriginWithDestination = (e) => {
    e.stopPropagation();
    if (from.locationName === undefined) {
      setIsOpenOrigin(true);
    }
    dispatch(setFrom(to));
    dispatch(setTo(from));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (from.locationName === '') {
      openNotification.error('Vui lòng thêm điểm đi và điểm đến.');
    } else if (isReturn && toTime === '') {
      openNotification.error('Vui lòng thêm ngày về.');
    } else {
      handleSearchTrip();
    }
  };

  useEffect(() => {
    if (location.pathname === '' || location.pathname === '/') {
      return;
    } else {
      handleSearchTrip();
    }
  }, [location.pathname]);

  const handleSearchTrip = () => {
    setLoading(true);
    searchTrip(dispatch, navigate, from, to, fromTime, toTime, isReturn)
      .then(() => {
        setLoading(false);
      })
      .catch((err) => {
        setLoading(true);
        console.log(err);
      });
  };

  const handleChangeRoundTrip = (e) => {
    dispatch(setIsReturn(e.target.value));
    dispatch(setToTime(''));
  };

  return (
    <section
      style={{ outline: '6px solid rgba(0, 197, 167, 0.2)' }}
      className="bg-white p-4 pb-6 mx-16 my-4 mb-10 border-[1.5px] border-primary-600 rounded-2xl shadow-mdCustom relative"
    >
      {contextHolder}
      {loading && <ThreeBodyLoading />}
      <form
        ref={formRef}
        onSubmit={(e) => handleSubmit(e)}
        className="relative"
      >
        <Radio.Group
          value={isReturn}
          onChange={(e) => handleChangeRoundTrip(e)}
        >
          <Radio value={false}>Một chiều</Radio>
          <Radio value={true}>Khứ hồi</Radio>
        </Radio.Group>
        <div className="my-4">
          <div
            className={`grid gap-8 ${
              isReturn ? 'grid-cols-4 ' : 'grid-cols-3'
            }`}
          >
            <div className="relative">
              <DropDownSelectLocation
                title={'Điểm đi'}
                value={from.locationName}
                onChangeSelect={handleOriginChange}
                isOpen={isOpenOrigin}
                setIsOpen={setIsOpenOrigin}
                handleOpen={handleOpenOrigin}
              />
              <div
                className="absolute top-[80%] translate-y-[-50%] p-2 -right-8 bg-white bg-opacity-50 text-primary-500 rounded-full z-10 group cursor-pointer"
                onClick={(e) => handleSwapOriginWithDestination(e)}
              >
                <AiOutlineSwap className="transition-all duration-300 group-hover:rotate-180" />
              </div>
            </div>
            <DropDownSelectLocation
              title={'Điểm đến'}
              value={to.locationName}
              originSelected={from.locationName}
              onChangeSelect={handleDestinationChange}
              isOpen={isOpenDestination}
              setIsOpen={setIsOpenDestination}
              handleOpen={handleOpenDestination}
            />

            <div className="relative">
              <h3 className={`px-4 py-1 ${!fromTime ? 'invisible' : ''}`}>
                Ngày đi
              </h3>
              <div className="w-full p-3 border-b-2 border-primary-500 cursor-pointer">
                <span className="text-20 text-gray-900 absolute cursor-pointer">
                  {fromTime !== '' ? fromTime : 'Chọn ngày đi'}
                </span>
                <DropDownSelectDate
                  placeholder={'Chọn ngày đi'}
                  onChangeSelect={handleFromTimeChange}
                />
              </div>
            </div>
            {isReturn && (
              <div className="relative">
                <h3 className={`px-4 py-1 ${!toTime ? 'invisible' : ''}`}>
                  Ngày về
                </h3>
                <div className="w-full p-3 border-b-2 border-primary-500 cursor-pointer">
                  <span className="text-20 text-gray-900 absolute cursor-pointer">
                    {toTime !== '' ? toTime : 'Chọn ngày về'}
                  </span>
                  <DropDownSelectDate
                    placeholder={'Chọn ngày về'}
                    disAbleFrom={fromTime}
                    onChangeSelect={handleToTimeChange}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="absolute right-0 outline-none">
          <button className="w-[150px] h-[40px] border rounded-full transition-all duration-300 relative group hover:before:bg-primary-100 overflow-hidden before:content-[''] before:absolute before:left-0 before:top-0 before:w-[55%] before:h-full before:bg-primary-100 before:skew-x-[45deg] before:-translate-x-2 before:transition-all before:duration-1000 hover:before:translate-x-[100%] hover:before:skew-x-[225deg]">
            <span className="absolute top-0 left-0 flex justify-center items-center w-full h-full font-medium text-primary-600 transition-all hover:text-primary-700 duration-300 backdrop-blur-3xl">
              Tìm chuyến xe
            </span>
          </button>
        </div>
      </form>
    </section>
  );
};

export default SearchTrip;
