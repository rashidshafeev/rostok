import type React from 'react';
import { useEffect, useState } from 'react';
import { Box, Modal } from '@mui/material';
import { useGetCartShareItemsByCodeMutation, useAddSharedCartMutation } from '@/features/cart-share';
import { useModal } from '@/features/modals/model/context';
import { ProductCardLineSmall } from '@/widgets/product-card';

interface SharedCartItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  imageUrl?: string;
  sku: string;
}

export const ShowSharedCartModal: React.FC = () => {
  const { hideModal, modalContent, isModalVisible } = useModal();
  const [sharedCart, setSharedCart] = useState<SharedCartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [getCart] = useGetCartShareItemsByCodeMutation();
  const [addSharedCart, { isLoading: addIsLoading, isSuccess: addIsSuccess }] = useAddSharedCartMutation();

  useEffect(() => {
    let isMounted = true;
    
    const fetchCart = async () => {
      if (!isModalVisible || modalContent?.type !== 'showSharedCart' || !modalContent.code) return;
      
      try {
        setIsLoading(true);
        const result = await getCart({ code: modalContent.code }).unwrap();
        if (isMounted && result?.data) {
          setSharedCart(result.data);
        }
      } catch (error) {
        console.error('Failed to fetch shared cart:', error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchCart();

    return () => {
      isMounted = false;
    };
  }, [isModalVisible, modalContent, getCart]);

  if (!isModalVisible || modalContent?.type !== 'showSharedCart') {
    return null;
  }

  return (
    <Modal
      open={isModalVisible && modalContent?.type === 'showSharedCart'}
      onClose={() => {
        hideModal();
        setSharedCart([]);
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-2 lining-nums proportional-nums bg-white rounded-lg border-none outline-none px-6 py-8">
        <span
          onClick={() => {
            hideModal();
            setSharedCart([]);
          }}
          className="absolute top-0 right-0 text-4xl text-colGray font-light cursor-pointer pr-4"
        >
          &times;
        </span>
        <h1 className="pt-1 text-2xl mm:text-3xl text-colBlack font-semibold mb-5">
          Корзина
        </h1>
        <div className="flex flex-col w-full max-h-[60vh] overflow-y-auto overflow-x-hidden">
          {isLoading ? (
            <div>Загрузка...</div>
          ) : (
            sharedCart.length > 0 &&
            sharedCart.map((item) => (
              <div
                key={item.id}
                className="flex w-full gap-3 items-center justify-between"
              >
                <ProductCardLineSmall
                  product={item}
                  showChangeQuantity={false}
                />
              </div>
            ))
          )}
        </div>
        <button
          disabled={addIsSuccess || isLoading}
          onClick={() => addSharedCart({ code: modalContent.code })}
          className={`w-[300px] h-[38px] px-6 ${
            addIsSuccess ? 'bg-colDarkGray' : 'bg-colGreen'
          } rounded text-white font-semibold`}
        >
          {addIsSuccess ? 'Добавлено в корзину' : 'Добавить в корзину'}
        </button>
      </Box>
    </Modal>
  );
};
