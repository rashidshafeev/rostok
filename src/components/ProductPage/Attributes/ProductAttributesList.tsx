import type React from 'react';
import { useEffect } from 'react';

import { useModal } from '@/features/modals/model/context';

import ProductAttributeValue from './ProductAttributeValue';

import type { ModificationAttribute } from '@/entities/product/ModificationAttribute';
import type { Product } from '@/entities/product/Product';

type ProductAttributesListProps = {
  current: Product | null;
  attributesList: AttributesValuesList;
  handleChangeAttribute: (event: React.MouseEvent<HTMLDivElement>) => void;
};
export interface ModificationAttributeForDisplay extends ModificationAttribute {
  current?: boolean;
  available?: boolean;
}
interface AttributeType {
  name: string;
  id: number;
  values: ModificationAttributeForDisplay[];
}
export interface AttributesValuesList {
  [key: string]: AttributeType;
}
const ProductAttributesList = ({
  current,
  attributesList,
  handleChangeAttribute,
}: ProductAttributesListProps) => {
  const { showModal, modalContent, isModalVisible } = useModal();
  const VISIBLE_VALUES_COUNT = 8;

  useEffect(() => {
    if (isModalVisible && modalContent?.type === 'modificationAttributes') {
      showModal({
        type: 'modificationAttributes',
        product: current,
        attributesList,
        handleChangeAttribute,
      });
    }
  }, [attributesList]);

  const handleShowAllValues = () => {
    showModal({
      type: 'modificationAttributes',
      product: current,
      attributesList: attributesList,
      handleChangeAttribute: (e) => {
        handleChangeAttribute(e);
      },
    });
  };
  return (
    <>
      {attributesList
        ? Object.keys(attributesList).map((attr) => {
            const values = attributesList[attr].values;
            const hasMoreValues = values.length > VISIBLE_VALUES_COUNT;
            const visibleValues = hasMoreValues
              ? values.slice(0, VISIBLE_VALUES_COUNT)
              : values;

            return (
              <div key={attr}>
                <div className="flex">
                  <p className="text-colDarkGray mr-1">{attr}:</p>
                  {attributesList[attr]?.values[0]?.type === 'color'
                    ? attributesList[attr]?.values?.find(
                        (value) => value.current
                      )?.text
                    : null}
                </div>
                <div className="flex flex-wrap gap-2">
                  {visibleValues.map((value) => (
                    <ProductAttributeValue
                      key={value.value}
                      id={attributesList[attr].id}
                      value={value}
                      handleChangeAttribute={handleChangeAttribute}
                    />
                  ))}
                  {hasMoreValues ? (
                    <div
                      onClick={() => handleShowAllValues()}
                      className="flex items-center justify-center px-3 py-1 border border-gray-300 rounded cursor-pointer hover:bg-gray-50"
                    >
                      +{values.length - VISIBLE_VALUES_COUNT}
                    </div>
                  ) : null}
                </div>
              </div>
            );
          })
        : null}
    </>
  );
};
export default ProductAttributesList;
