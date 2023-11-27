import checkOutApi from '@/services/checkoutApi';
import { MediumButton } from '@/components/Buttons';
import { useState } from 'react';

const CheckOut = () => {
  const [price, setPrice] = useState(20);

  const handleCheckOut = () => {
    checkOutApi.createOrder(price);
  };
  return (
    <div className="">
      <div className="border w-[50%] my-2">
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Nhập số tiền"
          className="w-full p-2"
        />
      </div>
      <div className="" onClick={handleCheckOut}>
        <MediumButton>Thanh toán</MediumButton>
      </div>
    </div>
  );
};

export default CheckOut;
