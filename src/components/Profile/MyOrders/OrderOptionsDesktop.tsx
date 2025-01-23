import React from 'react';
import { Close, Cached, DescriptionOutlined } from '@mui/icons-material';
import { useOrderOptions } from './useOrderActions';

interface OrderOptionsDesktopProps {
  orderNumber: string;
}

export const OrderOptionsDesktop = ({ orderNumber }: OrderOptionsDesktopProps) => {
  const { handleCancelClick, handleRepeatClick, handleDownloadClick } = useOrderOptions(orderNumber);

  return (
    <div className="flex space-x-4 mb-4 p-2">
      <button
        className="flex items-center cursor-pointer"
        onClick={() => void handleCancelClick()}
      >
        <Close className="!w-[18px] font-light text-colGreen mr-1" />
        <p className="text-sm font-semibold text-colBlack leading-[120%]">
          Отменить
        </p>
      </button>
      <button
        className="flex items-center cursor-pointer"
        onClick={() => void handleRepeatClick()}
      >
        <Cached className="!w-[18px] font-light text-colGreen mr-1" />
        <p className="text-sm font-semibold text-colBlack leading-[120%]">
          Повторить заказ
        </p>
      </button>
      <button
        className="flex items-center cursor-pointer"
        onClick={() => void handleDownloadClick()}
      >
        <DescriptionOutlined className="!w-4 font-light text-colGreen mr-1" />
        <p className="text-sm font-semibold text-colBlack leading-[120%]">
          Скачать документы
        </p>
      </button>
    </div>
  );
};