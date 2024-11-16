// ProductPageDesktop.tsx
import React, { useEffect, useState } from "react";
import ProductAttributesList from "./Attributes/ProductAttributesList";
import CharacteristicsList from "./CharacteristicsList";
import MobileAddToCartBar from "./Mobile/MobileAddToCartBar";
import MobileInfo from "./Mobile/MobileProductInfo/MobileInfo";
import MobileProductInfo from "./Mobile/MobileProductInfo/MobileProductInfo";
import MobileTopBar from "./Mobile/MobileTopBar";
import ProductGallery from "./ProductGallery";
import ProductTabs from "./ProductTabs/ProductTabs";
import RightBar from "./RightBar";
import TopControls from "./TopControls";
import { ProductGroup } from "@customTypes/ProductGroup/ProductGroup";
import { Product } from "@customTypes/Product/Product";
import Breadcrumbs from "@helpers/Breadcrumbs/Breadcrumbs";
import dummylogo from '@assets/images/dummy-logo.png';
import useAddToRecentItems from "@hooks/useAddToRecentItems";
import { useModificationAttributesManager } from "@hooks/useModificationAttributesManager";

type ProductPageDesktopProps = {
  group: ProductGroup;
};

const ProductPageDesktop = ({ 
  group, 
  isModalOpen, 
  setIsModalOpen,
  isChanging 
}: ProductPageDesktopProps) => {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  
  const { attributesList, handleChangeAttribute } = useModificationAttributesManager(group, setCurrentProduct);

  useAddToRecentItems(currentProduct);

  return (
    <>
      <div className="content lining-nums proportional-nums">
        <Breadcrumbs breadcrumbs={group?.category_chain} />

        <div className="lg:block hidden">
          <div className="text-xl font-semibold mb-[10px]">
            {currentProduct?.fullName}
          </div>
          <TopControls product={currentProduct} reviews={group?.reviews} />
        </div>
        <div className="flex flex-wrap pb-5 min-h-[420px] gap-5">
          <div className="lg:basis-[calc(42%-40px/3)] basis-full">
            <ProductGallery
              files={currentProduct?.files}
              tags={currentProduct?.tags}
            />
          </div>
          <div className="lg:basis-[calc(33%-40px/3)] flex flex-col gap-[10px] basis-full">
            <div>
              <img className="h-6" src={dummylogo} alt="*" />
            </div>
            <ProductAttributesList
            attributesList={attributesList}
            handleChangeAttribute={handleChangeAttribute}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            isChanging={isChanging}
          />
          </div>

          <div className="lg:basis-[calc(25%-40px/3)] basis-full">
            <RightBar product={currentProduct} />
          </div>
        </div>

        <div className="lg:block hidden pb-5 min-h-[420px] gap-5">
          <ProductTabs
            current={currentProduct}
            group={group}
            tabIndex={tabIndex}
            setTabIndex={setTabIndex}
          />
        </div>
      </div>
    </>
  );
};

export default ProductPageDesktop;