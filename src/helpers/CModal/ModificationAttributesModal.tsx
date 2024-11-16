import ProductAttributeValue from '@components/ProductPage/Attributes/ProductAttributeValue'
import { useModal } from '@/context/ModalContext';
import { Box, Modal } from '@mui/material';
import React from 'react';

// Выносим содержимое в отдельный компонент
const ModalContent = ({ modalContent, hideModal }) => {
  const { attributesList, handleChangeAttribute, title } = modalContent;
  
  return (
    <Box className='absolute top-4 left-4  md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2  lining-nums proportional-nums
     bg-white rounded-lg border-none outline-none px-6 py-8 max-w-[calc(100vw-32px)] max-h-[calc(100vh-32px)] 
     md:max-w-[50vw]  md:w-full overflow-y-auto'>
      <span
        onClick={() => hideModal()}
        className='absolute top-0 right-0 text-4xl text-colGray font-light cursor-pointer pr-4'
      >
        &times;
      </span>
      <h1 className='pt-1 text-2xl mm:text-3xl text-colBlack font-semibold mb-4'>
        {title}
      </h1>
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