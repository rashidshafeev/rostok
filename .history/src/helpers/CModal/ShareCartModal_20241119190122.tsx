import React, { useEffect, useState } from 'react';
import { Box, Modal } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useModal } from '../../context/ModalContext';
import { OKIcon, OKShareButton, TelegramIcon, TelegramShareButton, VKIcon, VKShareButton, WhatsappIcon, WhatsappShareButton } from 'react-share';
import CTextField from '../CustomInputs/CTextField';
import copyicon from "@assets/icons/copy-icon.svg"
import { toast } from 'sonner';
import { useGetCartShareCodeQuery, useGetCartShareItemsByCodeMutation } from '@/redux/api/cartEndpoints';
import { set } from 'js-cookie';
import LineNarrow from '@/components/ProductCard/LineNarrow';
import CardLine from '@/components/ProductCard/CardLine';

const ShareCartModal : React.FC = () => {
    
  const { hideModal, modalContent, isModalVisible } = useModal();
  
  if (!isModalVisible && modalContent?.type !== 'shareCart') {
    return null;
  }
  const location = useLocation()

  const { data: shareCode, isLoading, isSuccess, refetch } = useGetCartShareCodeQuery();
  const [getCart, { isLoading: sendIsLoading }] = useGetCartShareItemsByCodeMutation();
 
  const [url, setUrl] = useState('');
  const [sharedCart, setSharedCart] = useState([]);

  useEffect(() => {
    setUrl(``);
    refetch()
  }, []);

  useEffect(() => {
    setUrl(`https://rosstok.ru/shopping-cart/${shareCode?.code}`);

    if (isSuccess && shareCode?.code) {
      getSharedCart(shareCode?.code)
    }
  }, [modalContent, shareCode]);

  const getSharedCart = async (code) => {
    const sharedCart = await getCart({ code: code })
    setSharedCart(sharedCart?.data?.data)
  }


  return (
    <Modal
    open={isModalVisible && modalContent?.type === 'shareCart'}
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
              Поделиться
            </h1> 
            <div className='flex flex-col max-h-[60vh] overflow-y-auto'>
              { sharedCart?.length > 0 &&
              sharedCart?.map((item, index) => {
                return (
                  <div key={index} className='flex gap-3 items-center'>
                    <LineNarrow product={item} />
                  </div>
                )
              })


              }
            </div>
            <div className='flex gap-1 items-center'>
            <CTextField
                value={url || ''}
                onChange={(e) => setUrl(e.target.value)}
            />
              <img onClick={() => {navigator.clipboard.writeText(url || '')
                            toast('Ссылка скопирована')
                        }} src={copyicon} alt="" className='h-6 rounded-full cursor-pointer hover:opacity-80' /></div>
           
            <div className='flex pt-5 justify-center gap-1'>
              <OKShareButton url={url || ''}>
                    <OKIcon/>
                </OKShareButton>
                
                <VKShareButton url={url || ''}>
                    <VKIcon/>
                </VKShareButton>
                <TelegramShareButton url={url || ''}>
                    <TelegramIcon/>
                </TelegramShareButton>
                 <WhatsappShareButton url={url || ''}>
                   <WhatsappIcon/>
                 </WhatsappShareButton>
              {/* <button
                onClick={() => hideModal()}
                className='w-1/2 h-[38px] px-6 border border-colGreen bg-white rounded text-colGreen font-semibold'
              >
                Отменить
              </button>
              <button
                onClick={logout}
                className='w-1/2 h-[38px] px-6 bg-colGreen rounded text-white font-semibold'
              >
                Да
              </button> */}
            </div>
          </Box>
    </Modal>
  );
};

export default ShareCartModal;
