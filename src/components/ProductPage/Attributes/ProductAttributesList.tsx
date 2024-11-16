import React, { useRef, useEffect } from "react";
import ProductAttributeValue from "./ProductAttributeValue";
import { AttributesValuesList } from "@hooks/useModificationAttributesManager";
import { Modal, Box, CircularProgress } from "@mui/material";

type ProductAttributesListProps = {
  attributesList: AttributesValuesList;
  handleChangeAttribute: (event: React.MouseEvent<HTMLDivElement>) => void;
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  isChanging: boolean;
};

const ProductAttributesList = ({
  attributesList,
  handleChangeAttribute,
  isModalOpen,
  setIsModalOpen,
  isChanging
}: ProductAttributesListProps) => {
  // Keep previous attributes list during loading
  const prevAttributesListRef = useRef(attributesList);

  useEffect(() => {
    if (!isChanging && attributesList) {
      prevAttributesListRef.current = attributesList;
    }
  }, [attributesList, isChanging]);

  const handleAttributeChangeWithCheck = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isChanging) {
      handleChangeAttribute(event);
    }
  };

  // Always use previous content, update it only when not changing
  const displayAttributes = prevAttributesListRef.current || attributesList;

  // Render single attribute group
  const AttributeGroup = ({ attr, values }) => (
    <div className="mb-4">
      <div className="flex mb-2">
        <p className="text-colDarkGray mr-1">{attr}:</p>
        {values?.values[0]?.type === "color" &&
          values?.values?.find((value) => value.current)?.text}{" "}
      </div>
      <div className={`flex flex-wrap gap-2 ${isChanging ? 'pointer-events-none opacity-50' : ''}`}>
        {values.values.map((value) => (
          <ProductAttributeValue
            key={`${value.value}-${value.current}`}
            id={values.id}
            value={value}
            handleChangeAttribute={handleAttributeChangeWithCheck}
          />
        ))}
      </div>
    </div>
  );
  
  return (
    <>
      {/* Main Attributes List */}
      <div className={isChanging ? 'pointer-events-none opacity-50' : ''}>
        {displayAttributes &&
          Object.keys(displayAttributes).map((attr) => (
            <AttributeGroup 
              key={attr} 
              attr={attr} 
              values={displayAttributes[attr]} 
            />
          ))}
      </div>

      {/* Show All Attributes Button */}
      <button 
        onClick={() => setIsModalOpen(true)}
        className="mt-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
      >
        Показать все атрибуты
      </button>

      {/* Modal */}
      <Modal
        open={isModalOpen}
        onClose={() => !isChanging && setIsModalOpen(false)}
        aria-labelledby="attributes-modal-title"
      >
        <Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lining-nums proportional-nums bg-white rounded-lg border-none outline-none px-6 py-8 max-w-[90vw] md:max-w-[50vw] max-h-[90vh] mm:w-full overflow-y-auto">
          {/* Close Button */}
          <button
            onClick={() => !isChanging && setIsModalOpen(false)}
            className={`absolute top-2 right-2 text-4xl text-gray-500 hover:text-gray-700 transition-colors
              ${isChanging ? 'pointer-events-none opacity-50' : ''}`}
          >
            &times;
          </button>

          {/* Modal Title */}
          <h2 
            id="attributes-modal-title" 
            className="text-2xl font-semibold mb-6"
          >
            Все атрибуты
          </h2>

          {/* Modal Content */}
          <div className="space-y-6 relative">
            {isChanging && (
              <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-10">
                <CircularProgress />
              </div>
            )}
            <div className={isChanging ? 'pointer-events-none' : ''}>
              {displayAttributes &&
                Object.keys(displayAttributes).map((attr) => (
                  <AttributeGroup 
                    key={attr} 
                    attr={attr} 
                    values={displayAttributes[attr]} 
                  />
                ))}
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default ProductAttributesList;