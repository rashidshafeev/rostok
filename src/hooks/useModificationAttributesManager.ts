import { useEffect, useState } from 'react';

import { useParams, useNavigate } from 'react-router-dom';

import type { ModificationAttribute } from '@/entities/product/ModificationAttribute';
import type { Product } from '@/entities/product/Product';
import type { ProductGroup } from '@/entities/product/ProductGroup/ProductGroup';

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

export const useModificationAttributesManager = (
  group: ProductGroup,
  setCurrentProduct: (product: Product) => void
) => {
  const [attributesList, setAttributesList] =
    useState<AttributesValuesList | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  const getAttributesListAndValuesListFromProductsList = (
    list: Product[]
  ): AttributesValuesList => {
    const attributeTypes: AttributesValuesList = {};
    list.forEach((product) => {
      product.attributes.forEach((attribute) => {
        if (!attributeTypes[attribute.name]) {
          attributeTypes[attribute.name] = {
            name: attribute.name,
            id: attribute.id,
            values: [],
          };
        }
        if (
          !attributeTypes[attribute.name].values.some(
            (val) =>
              val.text === attribute.text && val.value === attribute.value
          )
        ) {
          attributeTypes[attribute.name].values.push({ ...attribute });
        }
      });
    });
    return attributeTypes;
  };

  const getProductByAttributes = (
    attributes: ModificationAttribute[],
    productList: Product[]
  ): Product => {
    const product = productList.filter((product) => {
      return attributes?.every((attribute) => {
        return product.attributes.some((prodAttribute) => {
          return (
            prodAttribute.id === attribute.id &&
            prodAttribute.value === attribute.value
          );
        });
      });
    });
    return product[0];
  };

  const setAvailableProperty = (
    fullList: AttributesValuesList,
    availableList: AttributesValuesList
  ): AttributesValuesList => {
    const newList = { ...fullList };
    for (const key in newList) {
      if (newList.hasOwnProperty(key) && availableList.hasOwnProperty(key)) {
        const values1 = newList[key].values;
        const values2 = availableList[key].values;
        values1.forEach((value) => {
          value.available = false;
        });
        for (let i = 0; i < values1.length; i++) {
          for (let j = 0; j < values2.length; j++) {
            if (values1[i].value === values2[j].value) {
              values1[i].available = true;
              break;
            }
          }
        }
      }
    }
    return newList;
  };

  const setCurrentProperty = (
    fullList: AttributesValuesList,
    attributesArray: ModificationAttribute[]
  ): AttributesValuesList => {
    const newList = { ...fullList };
    const selectedValuesMap = attributesArray.reduce((acc, curr) => {
      acc[curr.id] = curr.value;
      return acc;
    }, {});
    for (const key in newList) {
      if (
        newList.hasOwnProperty(key) &&
        selectedValuesMap.hasOwnProperty(newList[key].id)
      ) {
        const selectedValue = selectedValuesMap[newList[key].id];
        newList[key].values.forEach((value) => {
          value.current = value.value === selectedValue;
        });
      }
    }
    return newList;
  };

  const extractCurrentValues = (
    obj: AttributesValuesList
  ): ModificationAttribute[] => {
    const current: ModificationAttribute[] = [];
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const currentValue = obj[key].values.find(
          (value) => value.current === true
        );
        if (currentValue) {
          current.push({ ...currentValue });
        }
      }
    }
    return current;
  };

  const handleChangeAttribute = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isUpdating) return;
    setIsUpdating(true);

    const id = Number(event.currentTarget.getAttribute('data-id'));
    const value = Number(event.currentTarget.getAttribute('data-value'));
    const text = event.currentTarget.getAttribute('data-text');

    const newAttributes = JSON.parse(
      JSON.stringify(extractCurrentValues(attributesList))
    );
    newAttributes.find((attr) => Number(attr.id) === Number(id)).value = value;
    newAttributes.find((attr) => Number(attr.id) === Number(id)).text = text;

    const targetProduct =
      getProductByAttributes(newAttributes, group.variants) ||
      findAvailableProductByValue(id, value, group.variants);

    if (targetProduct) {
      navigate(`../${targetProduct.slug}`, { replace: true });
    }
  };

  const getAvailableProductsByAttributeValues = (
    attributes: ModificationAttribute[],
    productList: Product[]
  ): Product[] => {
    const availableProducts: Product[] = [];
    productList.forEach((product) => {
      let checks = 0;
      product?.attributes?.forEach((attr) => {
        if (
          attributes.some(
            (attribute) =>
              Number(attribute.id) === Number(attr.id) &&
              Number(attribute.value) === Number(attr.value)
          )
        ) {
          checks++;
        }
      });
      if (checks >= product.attributes.length - 1) {
        availableProducts.push(product);
      }
    });
    return availableProducts;
  };

  const findAvailableProductByValue = (
    id: number,
    value: number,
    productList: Product[]
  ): Product => {
    const available: Product[] = [];
    productList.forEach((product) => {
      if (
        product.attributes?.find(
          (attr) => attr.id === id && attr.value === value
        )
      ) {
        available.push(product);
      }
    });
    return available[0];
  };

  useEffect(() => {
    if (!group || !params.productId) return;

    const fullList = getAttributesListAndValuesListFromProductsList(
      group.variants
    );
    const currentAttributes = group.variants?.find(
      (variant) => variant.slug === params.productId
    )?.attributes;
    const currentProduct = getProductByAttributes(
      currentAttributes,
      group.variants
    );

    if (currentAttributes?.length === 0 || group.variants.length === 1) {
      setCurrentProduct(group.variants[0]);
    } else if (currentProduct) {
      setCurrentProduct(currentProduct);
    }

    const availableProductsList = getAvailableProductsByAttributeValues(
      currentAttributes,
      group.variants
    );
    const availableValuesList = getAttributesListAndValuesListFromProductsList(
      availableProductsList
    );

    const readyAttributesList = setAvailableProperty(
      setCurrentProperty(fullList, currentProduct.attributes),
      availableValuesList
    );
    setAttributesList(readyAttributesList);
    setIsUpdating(false);
  }, [params, group, setCurrentProduct]);

  return { attributesList, handleChangeAttribute };
};
