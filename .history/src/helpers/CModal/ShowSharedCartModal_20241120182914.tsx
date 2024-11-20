import React, { useEffect, useState } from 'react';
import { Box, Modal } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useModal } from '../../context/ModalContext';
import { OKIcon, OKShareButton, TelegramIcon, TelegramShareButton, VKIcon, VKShareButton, WhatsappIcon, WhatsappShareButton } from 'react-share';
import CTextField from '../CustomInputs/CTextField';
import copyicon from "@assets/icons/copy-icon.svg"
import { toast } from 'sonner';
import { 
 useAddSharedCartMutation,
   useGetCartShareItemsByCodeMutation } from '@/redux/api/cartEndpoints';
import { set } from 'js-cookie';
import LineNarrow from '@/components/ProductCard/LineNarrow';
import CardLine from '@/components/ProductCard/CardLine';
const ShareCartModal : React.FC = () => {
    
  const { hideModal, modalContent, isModalVisible } = useModal();
  
  if (!isModalVisible && modalContent?.type !== 'showSharedCart') {
    return null;
  }

  const [getCart, { isLoading: sendIsLoading }] = useGetCartShareItemsByCodeMutation();
  const [addSharedCart, { isLoading: addIsLoading }] = useAddSharedCartMutation();
 
  const [sharedCart, setSharedCart] = useState([]);

  useEffect(() => {
    getSharedCart(modalContent.code)
  }, []);


  const getSharedCart = async (code) => {

    const sharedCart = await getCart({ code: code })
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
          <Box className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-2 lining-nums proportional-nums bg-white rounded-lg border-none outline-none px-6 py-8'>
            <span
              onClick={() => {hideModal()}}
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
            <button
                onClick={() => addSharedCart({ code: modalContent.code })}
                className='w-1/2 h-[38px] px-6 bg-colGreen rounded text-white font-semibold'
              >
                Добавить в корзину
              </button> 
          </Box>
    </Modal>
  );
};

export default ShareCartModal;
