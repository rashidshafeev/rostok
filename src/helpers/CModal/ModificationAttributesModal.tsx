import ProductAttributeValue from '@components/ProductPage/Attributes/ProductAttributeValue'
import { useModal } from '@/context/ModalContext'
import { Box, Modal } from '@mui/material'
import React, { useEffect, useRef } from 'react'
import { AttributesValuesList } from '@hooks/useModificationAttributesManager'

type ModificationAttributesModalProps = {}

const ModificationAttributesModal = (props: ModificationAttributesModalProps) => {
  const { hideModal, modalContent, isModalVisible } = useModal()
  const prevAttributesRef = useRef<AttributesValuesList | null>(null);
  
  useEffect(() => {
    console.log("prevAttributesRef")
    if (modalContent?.attributesList && 
        JSON.stringify(prevAttributesRef.current) !== JSON.stringify(modalContent.attributesList)) {
      prevAttributesRef.current = modalContent.attributesList;
    }
  }, [modalContent?.attributesList]);

  if (!isModalVisible || !modalContent) return null;

  const attributes = modalContent.attributesList;
  const handleChangeAttribute = modalContent.handleChangeAttribute;
  
  return (
    <Modal
      open={isModalVisible && modalContent.type === 'modificationAttributes'}
      onClose={hideModal}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lining-nums proportional-nums bg-white rounded-lg border-none outline-none px-6 py-8 max-w-[90vw] md:max-w-[50vw] max-h-[90vh] mm:w-full overflow-y-auto'>
        <span
          onClick={hideModal}
          className='absolute top-0 right-0 text-4xl text-colGray font-light cursor-pointer pr-4'
        >
          &times;
        </span>
        <h1 className='pt-1 text-2xl mm:text-3xl text-colBlack font-semibold'>
          {modalContent.title || 'Все атрибуты'}
        </h1>
        {attributes &&
          Object.keys(attributes).map((attr) => (
            <div key={`${attr}-${Date.now()}`} className="mb-4">
              <div className="flex mb-2">
                <p className="text-colDarkGray mr-1">{attr}:</p>
                {attributes[attr]?.values[0]?.type === "color" &&
                  attributes[attr]?.values?.find((value) => value.current)
                    ?.text}{" "}
              </div>
              <div className="flex flex-wrap gap-2">
                {attributes[attr].values.map((value) => (
                  <ProductAttributeValue
                    key={`${value.value}-${value.current}-${Date.now()}`}
                    id={attributes[attr].id}
                    value={value}
                    handleChangeAttribute={handleChangeAttribute}
                  />
                ))}
              </div>
            </div>
          ))}
      </Box>
    </Modal>
  )
}

export default ModificationAttributesModal