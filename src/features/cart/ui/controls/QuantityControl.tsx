// src/features/cart/ui/controls/QuantityControl.tsx
import { AddOutlined, RemoveOutlined } from '@mui/icons-material';
import { useQuantityControl } from '@/features/cart';
import type { CartProduct } from '@/features/cart';

interface QuantityControlProps {
  product: CartProduct;
  enableRemove?: boolean;
  className?: string;
}

export const QuantityControl = ({
  product,
  enableRemove = false,
  className = '',
}: QuantityControlProps) => {
  const { 
    quantity, 
    isLoading, 
    handleIncrease, 
    handleDecrease, 
    isMinQuantity 
  } = useQuantityControl({ 
    product, 
    enableRemove 
  });

  return (
    <div className={`flex justify-between items-center grow ${className}`}>
      <button
        className={`${isLoading ? 'cursor-wait' : 'cursor-pointer'} w-10 h-10 bg-colLightGray rounded-full flex items-center justify-center`}
        onClick={handleDecrease}
        disabled={isMinQuantity || isLoading}
      >
        <RemoveOutlined
          className={`${isMinQuantity ? 'text-colGray' : 'text-colGreen'}`}
        />
      </button>

      <span className="text-colGreen font-semibold px-5">
        {quantity}
      </span>

      <button
        className={`${isLoading ? 'cursor-wait' : 'cursor-pointer'} w-10 h-10 bg-colLightGray rounded-full flex items-center justify-center`}
        onClick={handleIncrease}
        disabled={isLoading}
      >
        <AddOutlined className="text-colGreen" />
      </button>
    </div>
  );
};