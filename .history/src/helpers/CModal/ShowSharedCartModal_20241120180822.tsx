import React, { useEffect, useState } from 'react';
import { Box, Modal } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useModal } from '../../context/ModalContext';
import { OKIcon, OKShareButton, TelegramIcon, TelegramShareButton, VKIcon, VKShareButton, WhatsappIcon, WhatsappShareButton } from 'react-share';
import CTextField from '../CustomInputs/CTextField';
import copyicon from "@assets/icons/copy-icon.svg"
import { toast } from 'sonner';
import { useGetCartShareCodeMutation,
  //  useGetCartShareCodeQuery,
   useGetCartShareItemsByCodeMutation } from '@/redux/api/cartEndpoints';
import { set } from 'js-cookie';
import LineNarrow from '@/components/ProductCard/LineNarrow';
import CardLine from '@/components/ProductCard/CardLine';
const ShareCartModal : React.FC = () => {
    
  const { hideModal, modalContent, isModalVisible } = useModal();
  
  if (!isModalVisible && modalContent?.type !== 'showSharedCart') {
    return null;
  }
  const location = useLocation()


  const [getCode, { isLoading: getIsLoading }] = useGetCartShareCodeMutation()
  // const { data: shareCode, isLoading, isSuccess, refetch } = useGetCartShareCodeQuery();
  const [getCart, { isLoading: sendIsLoading }] = useGetCartShareItemsByCodeMutation();
 
  const [url, setUrl] = useState('');
  const [sharedCart, setSharedCart] = useState([]);

  useEffect(() => {
    getSharedCart()
  }, []);


  const getSharedCart = async () => {
    const code = await getCode()
    
    setUrl(`https://rosstok.ru/shopping-cart?cart=${code?.data?.code}`);

    const sharedCart = await getCart({ code: code?.data?.code })
    setSharedCart(sharedCart?.data?.data)
  }

  return (
    <Modal
    open={isModalVisible && modalContent?.type === 'showSharedCart'}
    onClose={() => {hideModal()
      setUrl(``)
    }}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
          <Box className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lining-nums proportional-nums bg-white rounded-lg border-none outline-none px-6 py-8'>
            <span
              onClick={() => {hideModal()
                setUrl(``)
              }}
              className='absolute top-0 right-0 text-4xl text-colGray font-light cursor-pointer pr-4'
            >
              &times;
            </span>
            <h1 className='pt-1 text-2xl mm:text-3xl text-colBlack font-semibold mb-5'>
              Поделиться корзиной
            </h1> 
            <div className='flex flex-col w-full max-h-[60vh] overflow-y-auto overflow-x-hidden'>
              { sharedCart?.length > 0 &&
              sharedCart?.map((item, index) => {
                return (
                  <div key={index} className='flex w-full gap-3 items-center justify-between'>
                    <LineNarrow product={item} showChangeQuantity={false} />
                  </div>
                )
              })


              }
            </div>

          </Box>
    </Modal>
  );
};

export default ShareCartModal;
