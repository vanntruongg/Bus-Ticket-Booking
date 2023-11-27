import { Spin } from 'antd';

const ThreeBodyLoading = () => {
  return (
    <div className="bg-white bg-opacity-50 fixed inset-0 flex justify-center items-center cursor-pointer z-50">
      <div className="text-purple-600 absolute top-[50%] left-[50%] ">
        <Spin />
      </div>
    </div>
  );
};

export default ThreeBodyLoading;
