import React, { useState } from 'react';
import { Button, Steps } from 'antd';
import IntroduceGuide from './IntroduceGuide';
import StepGuide from './StepGuide';

import ImageStep1 from '@/assets/HuongDanMuaVe1.png';
import ImageStep2 from '@/assets/Huongdanmuave2.png';
import ImageStep3 from '@/assets/Huongdanmuave3.png';
import ImageStep4 from '@/assets/Huongdanmuave4.png';
import ImageStep5 from '@/assets/Huongdanmuave5.png';
import ImageStep6 from '@/assets/Huongdanmuave6.png';

const steps = [
  {
    title: 'Bước 1',
    label: 'Truy cập vào website',
    content: [
      {
        step: 1,
        image: ImageStep1,
      },
    ],
  },
  {
    title: 'Bước 2',
    label: 'Chọn thông tin hành trình',
    content: [
      {
        step: 2,
        image: ImageStep2,
        subSteps: [
          {
            number: 1,
            label: 'Chọn điểm khởi hành',
          },
          {
            number: 2,
            label: 'Chọn điểm đến',
          },
          {
            number: 3,
            label: 'Chọn ngày đi',
          },
          {
            number: 4,
            label: 'Chọn ngày về',
          },
        ],
      },
      {
        step: 3,
        image: ImageStep3,
        subSteps: [
          {
            number: 1,
            label: 'Chọn giờ đi',
          },
          {
            number: 2,
            label: 'Chọn loại xe',
          },
          {
            number: 3,
            label: 'Chọn chuyến xe',
          },
        ],
      },
    ],
  },
  {
    title: 'Bước 3',
    label: 'Chọn ghế, địa điểm đón trả, thông tin hành khách',
    content: [
      {
        step: 4,
        image: ImageStep4,
      },
    ],
  },
  {
    title: 'Bước 4',
    content: 'Last-content',
    label: 'Thanh toán',
    content: [
      {
        step: 5,
        image: ImageStep5,
      },
    ],
  },
  {
    title: 'Bước 5',
    label: 'Mua vé thành công',
    content: [
      {
        step: 6,
        image: ImageStep6,
      },
    ],
  },
];

const TicketBookingGuide = () => {
  const [current, setCurrent] = useState(0);
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  return (
    <div className="bg-white p-8  shadow-mdCustom">
      <IntroduceGuide />
      {/* steps guide */}
      <div>
        <h3 className="pb-8 text-center text-28 text-primary-500 font-openSans font-bold">
          Những bước để giúp khách hàng trải nghiệm mua vé nhanh
        </h3>
        <Steps current={current} items={items} />
        <StepGuide
          title={steps[current].label}
          content={steps[current].content}
        />
        <div
          style={{
            marginTop: 24,
          }}
        >
          {current < steps.length - 1 && (
            <Button
              type="primary"
              onClick={() => {
                next();
                window.scrollTo({
                  top: 480,
                  left: 0,
                  behavior: 'smooth',
                });
              }}
            >
              Tiếp theo
            </Button>
          )}

          {current > 0 && (
            <Button
              style={{
                margin: '0 8px',
              }}
              onClick={() => {
                prev();
                window.scrollTo({
                  top: 480,
                  left: 0,
                  behavior: 'smooth',
                });
              }}
            >
              Trở lại
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
export default TicketBookingGuide;
