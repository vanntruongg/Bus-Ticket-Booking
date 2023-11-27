import { Card } from 'antd';
import TimeSVG from '@/assets/time.svg';
import ChairSVG from '@/assets/chair.svg';
import ComfortableSVG from '@/assets/comfortable.svg';
import CommentSVG from '@/assets/comment.svg';

const IntroduceGuide = () => {
  return (
    <div className="p-4 mb-10">
      <h3 className="pb-8 text-center text-28 text-primary-500 font-openSans font-bold">
        Những trải nghiệm nổi bật mà Website mang lại.
      </h3>
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white p-8 flex flex-col items-center rounded-lg shadow-mdCustom">
          <img alt="time" src={TimeSVG} className="w-24" />
          <span className="mt-10 text-18 text-center text-gray-500 font-medium">
            Khách hàng chủ động về lịch trình của mình: Từ điểm đón, điểm trả
            khách đến thời gian hành trình.
          </span>
        </div>
        <div className="bg-white p-8 flex flex-col items-center rounded-lg shadow-mdCustom">
          <img alt="chair" src={ChairSVG} className="w-24" />
          <span className="mt-10 text-18 text-center text-gray-500 font-medium">
            Khách hàng được chọn và chủ động vị trí, số ghế ngồi trên xe.
          </span>
        </div>
        <div className="bg-white p-8 flex flex-col items-center rounded-lg shadow-mdCustom">
          <img alt="comfortable" src={ComfortableSVG} className="w-24" />
          <span className="mt-10 text-18 text-center text-gray-500 font-medium">
            Không phải xếp hàng những dịp Lễ, Tết.
          </span>
        </div>
        <div className="bg-white p-8 flex flex-col items-center rounded-lg shadow-mdCustom">
          <img alt="comment" src={CommentSVG} className="w-24" />
          <span className="mt-10 text-18 text-center text-gray-500 font-medium">
            Dễ dàng góp ý để nâng cao chất lượng dịch vụ.
          </span>
        </div>
      </div>
    </div>
  );
};

export default IntroduceGuide;
