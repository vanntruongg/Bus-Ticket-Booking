import { Radio } from 'antd';
const PickUpDropOff = ({ dataRoutePoints, handleChangeSelect }) => {
  const onChange = (e) => {
    console.log(e.target.value);
    handleChangeSelect(e.target.value);
  };
  return (
    <div className="w-[440px]">
      <ul className="w-full">
        <Radio.Group defaultValue={dataRoutePoints[0]}>
          {dataRoutePoints.map((point) => (
            <Radio
              key={point.pointId}
              onChange={onChange}
              value={point}
              className="px-4 border-b"
            >
              <div className="py-4">
                {/* <span className="font-medium text-16">{`${point.pickUpTime} - ${point.pointName}`}</span> */}
                <span className="font-medium text-16">{`${point.pointName}`}</span>
                <div className="flex justify-between gap-4 text-[13px]">
                  <p className="text-gray-400">{point.addressDetail}</p>
                  <a
                    href={point.linkGoogleMap}
                    target="_blank"
                    className="text-blue-500  whitespace-nowrap"
                  >
                    Xem vị trí
                  </a>
                </div>
              </div>
            </Radio>
          ))}
        </Radio.Group>
      </ul>
    </div>
  );
};

export default PickUpDropOff;
