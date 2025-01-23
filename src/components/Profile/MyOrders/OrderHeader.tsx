import type React from 'react';
import { useState } from 'react';

import { IconButton } from '@mui/material';

import { CopyButton } from '@/shared/ui';

import { OrderActionsMobile } from './OrderActionsMobile';

import type { Order } from '@/entities/order';

interface OrderHeaderProps {
  order: Order;
}

export const OrderHeader = ({ order }: OrderHeaderProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  return (
    <div className="flex justify-between w-full items-start">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <div className="flex justify-between items-start w-full">
            <div className="flex items-center gap-1">
              <span>№{order.order_number}</span>
              <CopyButton
                textToCopy={order.order_number.toString()}
                toastMessage="Номер заказа скопирован"
                iconClassName="!w-4 cursor-pointer !mr-3"
              />
            </div>
          </div>
        </div>
        <span
          className="px-2 sm:px-3 lg:px-5 py-[2px] sm:py-1 lg:py-2 rounded-[100px] text-xs sm:text-xs lg:text-sm font-semibold text-center"
          style={{
            color: order.status.text_color,
            backgroundColor: order.status.background_color,
          }}
        >
          {order.status.name}
        </span>
        <span className="text-colBlack">Создан: {order.date}</span>
        <div className="flex gap-2">
          <span className="text-colBlack mr-1 leading-[120%]">
            Сумма заказа:
          </span>
          <span className="text-colBlack leading-[120%] font-bold">
            {order.total.amount} {order?.total?.currency?.symbol || '₽'}
          </span>
        </div>
      </div>

      <OrderActionsMobile orderNumber={order.order_number} />
    </div>
  );
};
