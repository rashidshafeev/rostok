// import { AttributesValuesList, ModificationAttributeForDisplay } from './useModificationAttributesManager';
// src/hooks/useProductAttributes.ts

interface UseModificationAttributesSwitcherProps {
  attributesList: AttributesValuesList | null;
  updateCurrentProduct: (attributes: ModificationAttributeForDisplay[]) => void;
}

const useModificationAttributesSwitcher = ({ attributesList, updateCurrentProduct }: UseModificationAttributesSwitcherProps) => {
  const handleChangeAttribute = (id: number, value: string, text: string) => {
    if (!attributesList) return;

    const newAttributes = Object.values(attributesList).map(attr => {
      const updatedAttr = { ...attr };
      if (updatedAttr.id === id) {
        updatedAttr.values = updatedAttr.values.map(val => ({
          ...val,
          current: val.value === Number(value),
        }));
      }
      return updatedAttr.values.find(val => val.current) || updatedAttr.values[0];
    });

    updateCurrentProduct(newAttributes);
  };

  return { attributesList, handleChangeAttribute };
};

export default useModificationAttributesSwitcher;