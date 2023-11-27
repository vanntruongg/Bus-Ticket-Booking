import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
export const Chart = () => {
  return ChartJS.register(
    LineElement,
    BarElement,
    ArcElement,
    Tooltip,
    Legend,
    Filler,
    CategoryScale, // x axis
    LinearScale, // y axis
    PointElement,
  );
};
