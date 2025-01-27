import type React from 'react';
import { useEffect, useState } from 'react';

import { Box, Modal } from '@mui/material';
import { useLocation } from 'react-router-dom';
import {
  OKIcon,
  OKShareButton,
  TelegramIcon,
  TelegramShareButton,
  VKIcon,
  VKShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from 'react-share';
import { toast } from 'sonner';

import { useCartSelection } from '@/features/cart/model/hooks/useCartSelection';
import {
  useGetCartShareCodeMutation,
  useGetCartShareItemsByCodeMutation,
} from '@/features/cart-share'; // Updated import
import { useModal } from '@/features/modals';
import { CTextField, CopyButton } from '@/shared/ui';
import { ProductCardLineSmall } from '@/widgets/product-card';

export const ShareCartModal: React.FC = () => {
  const { hideModal, modalContent, isModalVisible } = useModal();
  const { selectedItems } = useCartSelection();
  const location = useLocation();

  const [getCode] = useGetCartShareCodeMutation();
  const [getCart] = useGetCartShareItemsByCodeMutation();

  const [url, setUrl] = useState('');
  const [sharedCart, setSharedCart] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getSharedCart = async () => {
      try {
        setIsLoading(true);

        // Get share code first
        const codeResponse = await getCode().unwrap();
        if (!codeResponse?.code) {
          console.log('codeResponse', codeResponse);

          throw new Error('Failed to get share code');
        }

        // Validate selected items after getting code
        if (!selectedItems?.length) {
          toast.error('Нет выбранных товаров для шаринга');
          return; // Don't hide modal - let user fix selection
        }

        // Get shared cart items
        const cartResponse = await getCart({ code: codeResponse?.code}).unwrap();
        console.log('cartResponse', cartResponse);
        setSharedCart(cartResponse?.data || []);

        // Generate share URL
        const baseUrl = window.location.origin;
        setUrl(`${baseUrl}/shopping-cart?cart=${codeResponse?.code}`);
      } catch (error) {
        if (error?.data?.err_code === 'productscart_share__no_items_selected') {
          toast.error('Выберите товары для шаринга');
        } else if (error?.data?.err_code) {
          toast.error(error.data.err);
        } else {
          toast.error('Ошибка при создании ссылки для шаринга');
          console.error('Sharing error:', error);
          hideModal();
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (isModalVisible && modalContent?.type === 'shareCart') {
      getSharedCart();
    }
  }, [isModalVisible]);

  if (!isModalVisible || modalContent?.type !== 'shareCart') {
    return null;
  }

  return (
    <Modal
      open={true}
      onClose={hideModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lining-nums proportional-nums bg-white rounded-lg border-none outline-none px-6 py-8">
        <span
          onClick={hideModal}
          className="absolute top-0 right-0 text-4xl text-colGray font-light cursor-pointer pr-4"
        >
          &times;
        </span>
        <h1 className="pt-1 text-2xl mm:text-3xl text-colBlack font-semibold mb-5">
          Поделиться корзиной
        </h1>

        {isLoading ? (
          <div className="text-center py-4">Загрузка...</div>
        ) : (
          <>
            <div className="flex flex-col w-full max-h-[60vh] overflow-y-auto overflow-x-hidden">
              {sharedCart.map((item, index) => (
                <div
                  key={index}
                  className="flex w-full gap-3 items-center justify-between"
                >
                  <ProductCardLineSmall
                    product={item}
                    showChangeQuantity={false}
                  />
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 mt-4">
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={url}
                readOnly
              />
              <CopyButton
                textToCopy={url}
                toastMessage="Ссылка скопирована"
                iconClassName="w-6 h-6 rounded-full cursor-pointer hover:opacity-80"
                containerClassName="flex-shrink-0"
              />
            </div>

            <div className="flex pt-5 justify-center gap-1">
              <OKShareButton url={url}>
                <OKIcon />
              </OKShareButton>
              <VKShareButton url={url}>
                <VKIcon />
              </VKShareButton>
              <TelegramShareButton url={url}>
                <TelegramIcon />
              </TelegramShareButton>
              <WhatsappShareButton url={url}>
                <WhatsappIcon />
              </WhatsappShareButton>
            </div>
          </>
        )}
      </Box>
    </Modal>
  );
};
