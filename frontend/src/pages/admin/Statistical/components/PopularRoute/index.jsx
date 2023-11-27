import PieChart from '../../../components/chart/PieChart';

const data = [150, 75, 89];
const PopularRoute = () => {
  return (
    <div className="bg-white p-2">
      <div className="p-2 flex justify-between">
        <p className="text-14 text-gray-400">Các tuyến đường phổ biến</p>
        <span className="text-14 text-gray-400">Đơn vị: VÉ</span>
      </div>
      <PieChart label={'Đã bán'} width={200} height={50} dataSets={data} />
    </div>
  );
};

export default PopularRoute;
