import React, { useEffect, useState } from "react";
import ProductAttributeValue from "./ProductAttributeValue";
import { ModificationAttribute } from "@customTypes/Product/ModificationAttribute";

type ProductAttributesListProps = {
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
  attributesList,
  handleChangeAttribute
}: ProductAttributesListProps) => {
  

  return (
    <>
      {attributesList &&
        Object.keys(attributesList).map((attr) => {
          console.log(attributesList[attr]);
          return (
            <div key={attr}>
              <div className="flex">
                <p className="text-colDarkGray mr-1">{attr}:</p>
                {attributesList[attr]?.values[0]?.type === "color" &&
                  attributesList[attr]?.values?.find((value) => value.current)
                    ?.text}{" "}
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
          );
        })}
    </>
  );
};

export default ProductAttributesList;
