// hooks/useProductAttributes.ts

import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Product, ModificationAttribute } from '@customTypes/Product/Product';

export const useProductAttributes = (
  variants: Product[],
  setCurrentProduct: (product: Product) => void
): UseProductAttributesReturn => {
  const [attributesList, setAttributesList] = useState<AttributesList>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  
  const { productId } = useParams();
  const navigate = useNavigate();

  // Get full list of attributes from all variants
  const getAttributesValuesMap = useCallback((products: Product[]): AttributeTypeMap => {
    const attributeTypes: AttributeTypeMap = {};
    
    products.forEach(product => {
      product.attributes.forEach(attribute => {
        if (!attributeTypes[attribute.name]) {
          attributeTypes[attribute.name] = {
            name: attribute.name,
            id: attribute.id,
            values: [],
          };
        }

        if (!attributeTypes[attribute.name].values.some(
          val => val.text === attribute.text && val.value === attribute.value
        )) {
          attributeTypes[attribute.name].values.push({
            ...attribute
          });
        }
      });
    });

    return attributeTypes;
  }, []);

  // Find product matching attribute combination
  const getProductByAttributes = useCallback((
    attributes: ModificationAttribute[], 
    productList: Product[]
  ): Product | undefined => {
    return productList.find(product => 
      attributes.every(attribute => 
        product.attributes.some(prodAttribute => 
          Number(prodAttribute.id) === Number(attribute.id) && 
          Number(prodAttribute.value) === Number(attribute.value)
        )
      )
    );
  }, []);

  // Get available products based on selected attributes
  const getAvailableProducts = useCallback((
    attributes: ModificationAttribute[], 
    productList: Product[]
  ): Product[] => {
    return productList.filter(product => {
      const matchingAttributes = product.attributes.filter(attr =>
        attributes.some(selectedAttr => 
          Number(selectedAttr.id) === Number(attr.id) && 
          Number(selectedAttr.value) === Number(attr.value)
        )
      ).length;

      return matchingAttributes >= (product.attributes.length - 1);
    });
  }, []);

  // Find first available product with selected attribute value
  const findAvailableProductByValue = useCallback((
    id: number,
    value: string,
    productList: Product[]
  ): Product | undefined => {
    return productList.find(product => 
      product.attributes?.some(attr => 
        Number(attr.id) === Number(id) && 
        Number(attr.value) === Number(value)
      )
    );
  }, []);

  // Set available/unavailable state for attributes
  const setAvailableState = useCallback((
    fullList: AttributeTypeMap, 
    availableList: AttributeTypeMap
  ): AttributesList => {
    const newList = { ...fullList } as AttributesList;

    for (const key in newList) {
      if (newList.hasOwnProperty(key) && availableList.hasOwnProperty(key)) {
        newList[key].values.forEach(value => {
          value.available = availableList[key].values.some(
            availableValue => availableValue.value === value.value
          );
        });
      }
    }

    return newList;
  }, []);

  // Set current selected state for attributes
  const setCurrentState = useCallback((
    fullList: AttributesList, 
    selectedAttributes: ModificationAttribute[]
  ): AttributesList => {
    const newList = { ...fullList };
    const selectedMap = selectedAttributes.reduce((acc, curr) => ({
      ...acc,
      [curr.id]: curr.value
    }), {});

    for (const key in newList) {
      if (newList.hasOwnProperty(key) && selectedMap.hasOwnProperty(newList[key].id)) {
        const selectedValue = selectedMap[newList[key].id];
        newList[key].values.forEach(value => {
          value.current = value.value === selectedValue;
        });
      }
    }

    return newList;
  }, []);

  // Extract currently selected attributes
  const extractCurrentValues = useCallback((
    attributesList: AttributesList
  ): ModificationAttribute[] => {
    const current: ModificationAttribute[] = [];

    for (const key in attributesList) {
      const currentValue = attributesList[key].values.find(
        value => value.current === true
      );

      if (currentValue) {
        current.push({ ...currentValue });
      }
    }

    return current;
  }, []);

  const handleAttributeChange = useCallback(async (
    id: number,
    value: string,
    text: string
  ) => {
    try {
      setIsLoading(true);

      const currentValues = extractCurrentValues(attributesList);
      const updatedValues = currentValues.map(attr => 
        Number(attr.id) === Number(id) 
          ? { ...attr, value, text }
          : attr
      );

      let targetProduct = getProductByAttributes(updatedValues, variants);

      if (!targetProduct) {
        const alternativeProduct = findAvailableProductByValue(id, value, variants);
        if (alternativeProduct) {
          targetProduct = alternativeProduct;
        }
      }

      if (targetProduct) {
        navigate(`../${targetProduct.slug}`, { replace: true });
      }

    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error occurred'));
    } finally {
      setIsLoading(false);
    }
  }, [attributesList, variants, navigate, getProductByAttributes, findAvailableProductByValue, extractCurrentValues]);

  // Initialize attributes on mount or when variants/productId changes
  useEffect(() => {
    if (!variants?.length || !productId) return;

    try {
      setIsLoading(true);

      const currentProduct = variants.find(v => v.slug === productId);
      if (!currentProduct) return;

      const fullAttributesList = getAttributesValuesMap(variants);
      const availableProducts = getAvailableProducts(currentProduct.attributes, variants);
      const availableAttributesList = getAttributesValuesMap(availableProducts);

      const attributesWithAvailability = setAvailableState(fullAttributesList, availableAttributesList);
      const finalAttributesList = setCurrentState(attributesWithAvailability, currentProduct.attributes);

      setAttributesList(finalAttributesList);
      setCurrentProduct(currentProduct);

    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to initialize attributes'));
    } finally {
      setIsLoading(false);
    }
  }, [variants, productId, getAttributesValuesMap, getAvailableProducts, setAvailableState, setCurrentState]);

  return {
    attributesList,
    handleAttributeChange,
    isLoading,
    error
  };
};