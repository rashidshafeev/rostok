import type React from 'react';
import { useState } from 'react';

import { ExpandMore } from '@mui/icons-material';


import { OrderDetails } from './OrderDetails';
import { OrderHeader } from './OrderHeader';

import type { Order } from '@/entities/order';

interface OrderItemProps {
  order: Order;
}

export const OrderItem = ({ order }: OrderItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="rounded-[10px] overflow-hidden border border-[#EBEBEB]">
      <div className="lg:flex justify-between lg:space-x-3 bg-colSuperLight p-2 sm:p-3 lg:p-5">
        <OrderHeader order={order} />
        <div className="mm:hidden"></div>
      </div>
      <div className="grid lg:grid-cols-2 gap-3 lg:gap-5 sm:p-2 p-3 lg:p-4">
        <div className="lg:flex flex-col justify-between items-start">
          <div className="flex lg:justify-end items-start space-x-3">
            {order.items.map((item) => (
              <div
                key={item.sku}
                className="w-[50px] min-w-[50px] h-[50px] rounded-md overflow-hidden bg-colSuperLight p-1"
              >
                <img
                  className="w-full h-full object-contain"
                  src={item.files[0]?.small}
                  alt={item.fullName}
                />
              </div>
            ))}
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center outline-none mt-2"
          >
            <span className="text-sm font-semibold text-colBlack">
              Посмотреть заказ
            </span>
            <ExpandMore
              className={`transform transition-transform ${
                isExpanded ? 'rotate-180' : ''
              }`}
            />
          </button>
        </div>
      </div>
      {isExpanded ? <OrderDetails order={order} /> : null}
    </div>
  );
};
