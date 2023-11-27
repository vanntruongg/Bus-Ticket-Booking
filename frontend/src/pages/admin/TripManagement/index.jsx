import { Button, Collapse, Drawer, Segmented, Spin } from 'antd';
import { monthInYear } from '@/constants/defaultData';
import ListTrip from './ListTrip';
import { useEffect, useState } from 'react';
import { getCurrentMonthAndYear } from '@/utils/dateUtils';
import FormAddTrip from './FormAddTrip';
import tripApi from '@/services/tripApi';
import { getDaysInMonth } from '@/utils/calendarUtil';

const TripManagement = () => {
  // list days in month used for Collapse
  const [items, setItems] = useState([]);
  const [daysInMonth, setDaysInMonth] = useState([]);
  // const [loading, setLoading] = useState(false);
  const { month, year } = getCurrentMonthAndYear();
  const [selectedMonth, setSelectedMonth] = useState(month);

  console.log('re-render TripManagement');
  useEffect(() => {
    const days = getDaysInMonth(selectedMonth, year);
    setDaysInMonth(days);
  }, [selectedMonth]);

  useEffect(() => {
    const items = daysInMonth.map((date) => {
      return {
        key: date,
        label: `Các chuyến xe ngày ${date}`,
        children: (
          // <div className="min-h-[200px] flex justify-center items-center">
          //   <Spin />
          // </div>
          <div className=""></div>
        ),
      };
    });
    setItems(items);
  }, [daysInMonth]);

  const handleChangeWeek = (e) => {
    setSelectedMonth(e);
    // console.log('Week: ', e);
  };

  // console.log(listTrip);
  const getAllTripByDate = async (date) => {
    try {
      const data = await tripApi.getAllTripByDate(date);
      return data;
    } catch (err) {
      console.log(err);
    }
  };
  const handleChangeDayInMonth = async (key) => {
    const promises = items.map(async (item) => {
      if (key.includes(item.key)) {
        // if item.children.type === 'div' (ListTrip has not been set up yet) then call API and set item.children is ListTrip
        if (item.children.type === 'div') {
          const listTrip = await getAllTripByDate(item.key);
          return {
            ...item,
            children: <ListTrip data={listTrip} tripDate={item.key} />,
          };
        }
      }
      return item;
    });
    try {
      const updatedItems = await Promise.all(promises);
      // fake delay to allow the ListTrip to completely load
      setTimeout(() => {
        setItems(updatedItems);
      }, 200);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <h2 className="text-24 font-openSans font-semibold uppercase">
        Danh sách chuyến xe
      </h2>
      <div className="flex items-center gap-4 mb-2">
        <Segmented
          options={monthInYear}
          onChange={handleChangeWeek}
          className="bg-gray-200"
        />
        <FormAddTrip />
      </div>
      <Collapse
        items={items}
        onChange={handleChangeDayInMonth}
        className="overflow-auto"
      />
      {/* {loading ? (
        <ThreeBodyLoading />
      ) : (
        <ListTrip data={listTrip} handleOpenEditTrip={handleOpenEditTrip} />
      )} */}
    </>
  );
};

export default TripManagement;
