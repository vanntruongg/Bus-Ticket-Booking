import { Line } from 'react-chartjs-2';
import { Chart } from '..';
import { useEffect, useState } from 'react';
const labels = {
  monthInYear: [
    'TH01',
    'TH02',
    'TH03',
    'TH04',
    'TH05',
    'TH06',
    'TH07',
    'TH08',
    'TH09',
    'TH10',
    'TH11',
    'TH12',
  ],
  daysInMonth: ['Tuần 1', 'Tuần 2', 'Tuần 3', 'Tuần 4', 'Tuần 5'],
  daysInWeek: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
};

const options = {
  plugins: {
    legend: false,
    tooltip: {
      backgroundColor: '#00c5a7',
      intersect: false, // hovering over a column still shows the tooltip
    },
  },
  scales: {
    x: {
      grid: {
        // display: false,
        color: '#00c5a7',
      },
    },
    y: {
      grid: {
        display: false,
      },
    },
  },
  // responsive: true,
  maintainAspectRatio: false,
};

const LineChart = ({ type, label, mainData, width, height }) => {
  const [dataSets, setDataSets] = useState([]);
  const [labels, setLabels] = useState([]);
  useEffect(() => {
    const dataSet = [];
    const dataSet1 = [];
    const labels = [];
    mainData?.map((data) => {
      dataSet.push(data.value);
      labels.push(data.description);
    });
    setDataSets(dataSet);
    setLabels(labels);
  }, [mainData]);
  const data = {
    labels: labels,
    datasets: [
      {
        id: 1,
        label: label,
        data: dataSets,
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) {
            return null;
          }
          const gradient = ctx.createLinearGradient(
            0,
            chartArea.bottom,
            0,
            chartArea.top,
          );
          gradient.addColorStop(1, 'rgba(0, 197, 167, 0.2)');
          gradient.addColorStop(0.05, 'rgba(0, 197, 167, 0)');
          gradient.addColorStop(0, 'rgba(0, 197, 167, 0)');
          return gradient;
        },
        borderWidth: 1.5,
        borderColor: '#00c5a7',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  return (
    <div className="w-full  min-h-[200px]">
      <Line
        datasetIdKey="id"
        data={data}
        width={width}
        height={height}
        options={options}
      />
    </div>
  );
};

export default LineChart;
