import { IconButton, Menu } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React, { useState } from 'react';
import { OrderHeader } from './OrderHeader';
import { OrderOptions } from './OrderOptions';
import { ExpandMore } from '@mui/icons-material';
import { OrderDetails } from './OrderDetails';
import PriceDisplay from '@/components/ProductCard/PriceDisplay';
import { Order } from '@/types/Orders/Order';

interface OrderItemProps {
  order: Order;
}

export const OrderItem = ({ order }: OrderItemProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <div className='rounded-[10px] overflow-hidden border border-[#EBEBEB]'>
      <div className='lg:flex justify-between lg:space-x-3 bg-colSuperLight p-2 sm:p-3 lg:p-5'>
        <OrderHeader order={order} />
        <div className='flex mm:justify-end'>
          <span className='text-colBlack mr-1 leading-[120%]'>
            Сумма заказа:
          </span>
          <span className='text-colBlack leading-[120%] font-bold'>
            {order.total.amount} {order?.total?.currency?.symbol || '₽'}
          </span>
        </div>
        <div className='mm:hidden'>
          <IconButton
            aria-label='more'
            id='long-button'
            aria-controls={open ? 'long-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup='true'
            onClick={handleClick}
            sx={{ paddingTop: '0', paddingRight: '0' }}
          >
            <MoreVertIcon />
          </IconButton>
          <OrderOptions anchorEl={anchorEl} open={open} onClose={handleClose} />
        </div>
      </div>
      <div className='grid lg:grid-cols-2 gap-3 lg:gap-5 sm:p-2 p-3 lg:p-4'>
        <div className='lg:flex flex-col justify-between items-start'>
          <div className='flex lg:justify-end items-start space-x-3'>
            {order.items.map((item) => (
              <div
                key={item.sku}
                className='w-[50px] min-w-[50px] h-[50px] rounded-md overflow-hidden bg-colSuperLight p-1'
              >
                <img
                  className='w-full h-full object-contain'
                  src={item.files[0]?.small}
                  alt={item.fullName}
                />
              </div>
            ))}
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className='flex items-center outline-none mt-2'
          >
            <span className='text-sm font-semibold text-colBlack'>
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
      {isExpanded && <OrderDetails order={order} />}
    </div>
  );
};
