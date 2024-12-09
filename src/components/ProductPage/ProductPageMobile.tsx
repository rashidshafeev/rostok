import React, { useEffect, useRef, useState } from "react";
import ProductAttributesList, { AttributesValuesList } from "./Attributes/ProductAttributesList";
import CharacteristicsList from "./CharacteristicsList";
import ProductGallery from "./ProductGallery";
import ProductTabs from "./ProductTabs/ProductTabs";
import RightBar from "./RightBar";
import TopControls from "./TopControls";
import { useIntersection } from "react-use";
import MobileAddToCartBar from "./Mobile/MobileAddToCartBar";
import MobileInfo from "./Mobile/MobileProductInfo/MobileInfo";
import MobileProductInfo from "./Mobile/MobileProductInfo/MobileProductInfo";
import MobileTopBar from "./Mobile/MobileTopBar";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { ProductGroup } from "@/types/ProductGroup/ProductGroup";
import { Product } from "@/types/Product/Product";
import MobileCharacteristics from "./Mobile/MobileProductInfo/MobileCharacteristics";
import MobileNameBar from "./Mobile/MobileNameBar";

type ProductPageMobileProps = {
  group: ProductGroup;
  currentProduct: Product | null;
  attributesList: AttributesValuesList;
  handleChangeAttribute: (event: React.MouseEvent<HTMLDivElement>) => void;
};

const ProductPageMobile = ({ group, currentProduct, attributesList, handleChangeAttribute }: ProductPageMobileProps) => {
  const addCard = useRef(null);
  const addCardVisible = useIntersection(addCard, {
    root: null,
    rootMargin: "0px",
    threshold: 1,
  });


  const [tabIndex, setTabIndex] = useState<number>(0);
    const [displayedProduct, setDisplayedProduct] = useState<Product | null>(currentProduct);

    useEffect(() => {
        if (currentProduct) {
            setDisplayedProduct(currentProduct);
        }
    }, [currentProduct]);

  return (
    <div className="content lining-nums proportional-nums">
      <Breadcrumbs breadcrumbs={group?.category_chain} />
      <div className="lg:hidden">
        <MobileTopBar product={currentProduct} />
      </div>
      <div className=" sticky top-[75px] pb-1 bg-white w-full z-10">
        <MobileNameBar name={`${group.name} ${currentProduct?.name}`} reviews={group?.reviews} sku={currentProduct?.sku} />
      </div>

      <div className="flex  flex-wrap pb-5 min-h-[420px] gap-5">
        <div className="w-[100vw]">
          <ProductGallery
            files={currentProduct?.files}
            tags={currentProduct?.tags}
          />
        </div>
        
        <div className="flex flex-col gap-[10px] basis-full">
        <ProductAttributesList
              current={currentProduct}
              attributesList={attributesList} handleChangeAttribute={handleChangeAttribute}
              />

        </div>

        <div ref={addCard} className="lg:basis-[calc(25%-40px/3)] basis-full">
          <RightBar product={currentProduct} />
        </div>
      </div>

      <MobileProductInfo current={currentProduct} product={group} />

      {addCardVisible && addCardVisible.intersectionRatio < 1 && (
        <MobileAddToCartBar product={currentProduct} />
      )}
    </div>
  );
};

export default ProductPageMobile;
