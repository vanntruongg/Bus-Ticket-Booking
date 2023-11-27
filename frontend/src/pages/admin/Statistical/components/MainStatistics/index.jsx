import { memo, useEffect, useMemo, useState } from 'react';
import { Button, Radio, Segmented } from 'antd';
import { GiMoneyStack } from 'react-icons/gi';
import { TbFileExport } from 'react-icons/tb';
import CountUp from 'react-countup';

import LineChart from '../../../components/chart/LineChart';
import statisticApi from '@/services/statisticApi';
import { getCurrentMonthAndYear } from '@/utils/dateUtils';
import {
  monthInYear,
  optionsStatistical,
  weeksInMonth,
} from '@/constants/defaultData';
import axiosInstance from '@/services/axiosInstance';
import { STATISTIC } from '@/constants/ApiEndpoint';

const MainStatictis = () => {
  console.log('Re-render main statistic');
  const { month, year } = getCurrentMonthAndYear();
  const [selectedPeriodType, setSelectedPeriodType] = useState('year');
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [dataMainChart, setDataMainChart] = useState([]);
  const [valueWeeksInMonth, setValueWeeksInMonth] = useState(weeksInMonth);

  const getDataRevenue = async (periodType, selectedMonth, selectedWeek) => {
    try {
      if (periodType === 'year') {
        const data = await statisticApi.getYearlyRevenue();
        setDataMainChart(data);
      } else if (periodType === 'quarter') {
        const data = await statisticApi.getQuarterRevenue();
        setDataMainChart(data);
      } else if (periodType === 'month' && selectedMonth && !selectedWeek) {
        const data = await statisticApi.getMonthlyRevenue(selectedMonth);
        setDataMainChart(data);
      } else if (periodType === 'month' && selectedWeek) {
        const data = await statisticApi.getWeeklyRevenue(
          selectedMonth,
          selectedWeek,
        );
        setDataMainChart(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (selectedMonth !== 2) {
      setValueWeeksInMonth([
        ...weeksInMonth,
        {
          value: 5,
          label: 'Tuần 5',
        },
      ]);
    } else {
      setValueWeeksInMonth(weeksInMonth);
    }
    getDataRevenue(selectedPeriodType, selectedMonth, selectedWeek);
  }, [selectedPeriodType, selectedMonth, selectedWeek]);

  const handleChangePeriodType = (value) => {
    setSelectedPeriodType(value);
    setSelectedMonth(parseInt(month));
  };

  const handleChangeSelectedMonth = (e) => {
    setSelectedWeek(null);
    setSelectedMonth(e.target.value);
  };

  const handleChangeSelectedWeek = (e) => {
    console.log(e.target.value);
    setSelectedWeek(e.target.value);
  };

  const totalRevenue = useMemo(() => {
    return dataMainChart?.reduce((acc, curr) => acc + curr.value, 0);
  }, [dataMainChart]);

  const handleExportFile = () => {
    const path =
      selectedPeriodType === 'year'
        ? STATISTIC.EXPORT_REVENUE_REPORT_YEAR
        : selectedPeriodType === 'quarter'
        ? STATISTIC.EXPORT_REVENUE_REPORT_QUARTER
        : STATISTIC.EXPORT_REVENUE_REPORT_MONTH + `?month=${selectedMonth}`;

    axiosInstance
      .get(path, {
        responseType: 'blob',
      })
      .then((res) => {
        const url = window.URL.createObjectURL(new Blob([res]));
        console.log('res: ', res);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute(
          'download',
          `revenue_report_${selectedPeriodType}.xlsx`,
        );
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => {
        console.error('Error downloading file:', error);
      });
    console.log('Handle export file: ');
  };

  return (
    <div className="bg-white p-2">
      <div className="flex justify-between p-2">
        <div>
          <p className="text-14 text-gray-400">Tổng doanh thu (VND)</p>
          <div className="flex items-center gap-2">
            <GiMoneyStack color="#08675d" size={20} />
            <span className="text-24">
              <CountUp end={totalRevenue} separator="," />
            </span>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <Segmented
            options={optionsStatistical}
            // optionType="button"
            // buttonStyle="solid"
            defaultValue={selectedPeriodType}
            onChange={handleChangePeriodType}
            className="ml-4 my-1"
          />
          {selectedPeriodType === 'month' && (
            <>
              <Radio.Group
                options={monthInYear}
                optionType="button"
                value={selectedMonth}
                defaultValue={selectedMonth}
                onChange={handleChangeSelectedMonth}
                className="ml-4 my-1 animate-fadeInToLeft"
              />
              <Radio.Group
                options={valueWeeksInMonth}
                optionType="button"
                buttonStyle="solid"
                value={selectedWeek}
                onChange={handleChangeSelectedWeek}
                className="ml-4 my-1 animate-fadeInToLeft"
              />
            </>
          )}
        </div>
      </div>
      <LineChart
        type={
          selectedPeriodType === 'year'
            ? 'monthInYear'
            : selectedWeek
            ? 'daysInWeek'
            : 'daysInMonth'
        }
        label={'Tổng doanh thu'}
        mainData={dataMainChart}
        width={200}
        height={100}
      />
      <div className="flex justify-end mt-6 mb-2">
        <Button
          className="flex items-center gap-2 justify-end"
          onClick={handleExportFile}
        >
          <TbFileExport size={20} />
          <span className="text=18 font-semibold">Xuất File</span>
        </Button>
      </div>
    </div>
  );
};

export default memo(MainStatictis);
