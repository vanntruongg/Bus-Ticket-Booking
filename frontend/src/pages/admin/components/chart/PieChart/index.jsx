import { Doughnut, Pie } from 'react-chartjs-2';
import { Chart } from '..';

const options = {
  plugins: {
    legend: {
      display: true,
      position: 'bottom',
      labels: {
        boxWidth: 40, // Chiều rộng của hộp chứa biểu tượng màu sắc
        title: {
          display: true, // Hiển thị tiêu đề
          font: {
            size: 16, // Kích thước font
          },
          padding: 10, // Khoảng cách giữa tiêu đề và chú thích
        },
      },
    },
    tooltip: {
      backgroundColor: 'rgba(0, 197, 167, 0.8)',
      intersect: false, // hovering over a column still shows the tooltip
    },
  },
  //maintainAspectRatio: false,
};

const NewChart = ({ type, label, dataSets, width, height }) => {
  const data = {
    labels: ['Cần Thơ - Hồ Chí Minh', 'Cần Thơ - Đà Lạt', 'Cần Thơ - Vũng Tàu'],
    datasets: [
      {
        label: label,
        data: dataSets,
        backgroundColor: [
          'rgba(0, 197, 167, 0.8)',
          'rgba(22, 161, 196, 0.8)',
          'rgba(168, 85, 247, 0.8)',
        ],
        // borderColor: '#00c5a7',
        // borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-full max-h-[400px] flex justify-center">
      <Doughnut datasetIdKey="id" data={data} width={width} options={options} />
      {/*
      <Pie datasetIdKey="id" data={data} width={width} options={options} />
      */}
    </div>
  );
};

export default NewChart;
