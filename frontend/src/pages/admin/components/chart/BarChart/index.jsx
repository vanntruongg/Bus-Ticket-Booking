import { Bar } from 'react-chartjs-2';
import { Chart } from '..';
import { useEffect, useState } from 'react';

Chart();

const options = {
  plugins: {
    legend: true,
    tooltip: {
      intersect: false, // hovering over a column still shows the tooltip
    },
  },
  scales: {
    x: {
      grid: {
        // display: false,
        color: '#f6e8ff',
      },
    },
    y: {
      grid: {
        // display: false,
        color: '#f6e8ff',
        opacity: 0.5,
      },
    },
  },
  maintainAspectRatio: false,
};

const BarChart = ({ label, dataChart }) => {
  const [dataSets, setDataSets] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    const dataSet = [];
    const label = [];
    dataChart?.map((data) => label.push(data.description));
    dataChart?.map((data) => dataSet.push(data.value));
    // tickets?.map((data) => dataSetTicket.push(data.value));
    setLabels(label);
    setDataSets(dataSet);
  }, [dataChart]);

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
          gradient.addColorStop(1, 'rgba(168, 85, 247, 0.6)');
          gradient.addColorStop(0, 'rgba(168, 85, 247, 0.4)');
          gradient.addColorStop(0, 'rgba(168, 85, 247, 0.2)');
          return gradient;
        },
        borderColor: '#a855f7',
        borderWidth: 2,
        fill: false,
        tensision: 0.4,
      },
      // {
      //   id: 2,
      //   label: 'Tổng doanh thu',
      //   data: dataSetsRevenue,
      //   backgroundColor: (context) => {
      //     const chart = context.chart;
      //     const { ctx, chartArea } = chart;

      //     if (!chartArea) {
      //       return null;
      //     }
      //     const gradient = ctx.createLinearGradient(
      //       0,
      //       chartArea.bottom,
      //       0,
      //       chartArea.top,
      //     );
      //     gradient.addColorStop(1, 'rgba(168, 85, 247, 0.6)');
      //     gradient.addColorStop(0, 'rgba(168, 85, 247, 0.4)');
      //     gradient.addColorStop(0, 'rgba(168, 85, 247, 0.2)');
      //     return gradient;
      //   },
      //   borderColor: '#a855f7',
      //   borderWidth: 2,
      //   fill: false,
      //   tensision: 0.4,
      // },
    ],
  };
  return (
    <div className="w-full min-h-[200px]">
      <Bar datasetIdKey="id" data={data} options={options} />
    </div>
  );
};

export default BarChart;
