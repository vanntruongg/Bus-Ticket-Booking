import { useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import unidecode from 'unidecode';
import { v4 as uuidv4 } from 'uuid';
import { MdOutlineSwapHoriz } from 'react-icons/md';

import ListSchedule from '@/pages/user/Schedule/components/ListSchedule';
import Search from './components/Input';
import Input from './components/Input';
import { scheduleApi } from '@/services/scheduleApi';
import { ThreeBodyLoading } from '@/components/Loading';

const Schedule = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [dataFiltered, setDataFiltered] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const res = await scheduleApi.getAllSchedule();
      setSchedules(res);
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    setDataFiltered(
      schedules.map((shedule) => {
        return shedule
          .filter((item) =>
            unidecode(item.originId.locationName.toLowerCase()).includes(
              unidecode(origin.toLowerCase()),
            ),
          )
          .filter((item) =>
            unidecode(item.destinationId.locationName.toLowerCase()).includes(
              unidecode(destination.toLowerCase()),
            ),
          );
      }),
    );
  }, [origin, destination, loading]);

  const handleSwapValueOriginWithDestination = () => {
    setOrigin(destination);
    setDestination(origin);
  };

  const handleChangeOrigin = (value) => {
    setOrigin(value);
  };
  const handleChangeDestination = (value) => {
    setDestination(value);
  };

  return (
    <div className="px-16 pt-20">
      {loading && <ThreeBodyLoading />}
      <div className="flex justify-between gap-4 px-32 relative">
        <Input
          placeholder={'Nhập điểm đi'}
          value={origin}
          onChange={handleChangeOrigin}
        />
        <button
          className="absolute flex-center p-2 bg-gray-300 outline-none border rounded-full shadow-mdCustom group z-10"
          onClick={handleSwapValueOriginWithDestination}
        >
          <MdOutlineSwapHoriz className="text-gray-700 transition-all duration-300 group-hover:rotate-[180deg]" />
        </button>
        <Input
          placeholder={'Nhập điểm đến'}
          value={destination}
          onChange={handleChangeDestination}
        />

        {/* <Search value={destination} onChange={handleChangeDestination} /> */}
      </div>
      <div className="bg-white mt-6 mb-4 p-4 border rounded-lg">
        <Row className="font-medium ">
          <Col span={6}>Tuyến xe</Col>
          <Col span={2}>Loại xe</Col>
          <Col span={3}>Quãng đường</Col>
          <Col span={4}>Thời gian hành trình</Col>
          <Col span={2}>Giá vé</Col>
        </Row>
      </div>

      {/** routes */}
      {dataFiltered.map(
        (schedule) =>
          schedule.length > 0 && (
            <ListSchedule key={uuidv4()} schedule={schedule} />
          ),
      )}
    </div>
  );
};

export default Schedule;
