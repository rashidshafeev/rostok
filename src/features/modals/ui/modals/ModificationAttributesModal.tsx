import ProductAttributeValue from '@/components/ProductPage/Attributes/ProductAttributeValue'
import { useModal } from '@/features/modals/model/context';
import { Box, Modal } from '@mui/material';
import React from 'react';
import AddToCartButton from '@/helpers/AddToCartButton/AddToCartButton';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { LoadingSmall } from '@/shared/ui/Loader';
import ChangeQuantityGroup from '@/helpers/ChangeQuantityButton/ChangeQuantityGroup';

// Выносим содержимое в отдельный компонент
const ModalContent = ({ modalContent, hideModal }) => {
  const { attributesList, handleChangeAttribute, product } = modalContent;

  
  const { cart } = useSelector((state : RootState) => state.cart);

  const productInCart = cart.find((el) => el.id === product.id);
  
  return (
    <Box className='absolute top-4 left-4  md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2  lining-nums proportional-nums
     bg-white rounded-lg border-none outline-none max-w-[calc(100vw-32px)] max-h-[calc(100vh-32px)] 
     md:max-w-[50vw]  md:w-full overflow-y-auto flex flex-col'>
      <span
        onClick={() => hideModal()}
        className='absolute top-0 right-0 text-4xl text-colGray font-light cursor-pointer pr-4'
      >
        &times;
      </span>
      <h1 className='text-2xl mm:text-3xl text-colBlack font-semibold mt-7 px-2'>
        {product?.fullName}
      </h1>
      <div className='max-h-[60vh] lg:h-auto overflow-auto w-full p-2'>
      {attributesList &&
        Object.keys(attributesList).map((attr) => (
          <div key={attr} className="mb-4">
            <div className="flex mb-2">
              <p className="text-colDarkGray mr-1">{attr}:</p>
              {attributesList[attr]?.values[0]?.type === "color" &&
                attributesList[attr]?.values?.find((value) => value.current)
                  ?.text}
            </div>
            <div className="flex flex-wrap gap-2">
              {attributesList[attr].values.map((value) => (
                <ProductAttributeValue
                  key={value.value}
                  id={attributesList[attr].id}
                  value={value}
                  handleChangeAttribute={handleChangeAttribute}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
        <div className='mx-auto lg:mx-3 self-end w-[300px]   my-3'>
        {!productInCart && (
          <AddToCartButton product={product}>
            {({ handleAddToCartClick, isLoading, isSuccess, buttonText, disabled }) => (
              <button
                disabled={disabled || isLoading}
                onClick={handleAddToCartClick}
                className={`transition-all flex justify-center items-center min-h-10 xs:text-sm sm:text-base duration-200 ${
                  disabled  ? "bg-colGray " : "bg-colGreen cursor-pointer"
                }  text-white rounded-md p-2 font-semibold w-full ${
                  isLoading && !disabled  ? "cursor-wait" : ""
                } lining-nums proportional-nums`}
              >
                {isLoading && !isSuccess ? (
                  <LoadingSmall extraStyle={"white"} />
                ) : (
                  buttonText
                )}
              </button>
            )}
          </AddToCartButton>
        )}
        {productInCart && (
          <div className="flex justify-between gap-2">
            <ChangeQuantityGroup product={productInCart} enableRemove={true} />
          </div>
        )}
        </div>

       
         
    </Box>
  );
};

const ModificationAttributesModal = () => {
  const { hideModal, modalContent, isModalVisible } = useModal();

  if (
    !isModalVisible ||
    !modalContent ||
    modalContent.type !== 'modificationAttributes'
  ) {
    return null;
  }

  return (
    <Modal
      open={true}
      onClose={hideModal}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <ModalContent
        key={JSON.stringify(modalContent.attributesList)}
        modalContent={modalContent}
        hideModal={hideModal}
      />
    </Modal>
  );
};

export default ModificationAttributesModal;