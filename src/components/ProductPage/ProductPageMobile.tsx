import React, { useRef } from "react";
import ProductAttributesList from "./Attributes/ProductAttributesList";
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
import Breadcrumbs from "@helpers/Breadcrumbs/Breadcrumbs";
import { ProductGroup } from "@/types/ProductGroup/ProductGroup";

type ProductPageMobileProps = {
  group: ProductGroup;
};

const ProductPageMobile = ({ group }: ProductPageMobileProps) => {
  const addCard = useRef(null);
  const addCardVisible = useIntersection(addCard, {
    root: null,
    rootMargin: "0px",
    threshold: 1,
  });

  return (
    <div className="content lining-nums proportional-nums">
      <Breadcrumbs breadcrumbs={group?.category_chain} />
      <div className="lg:hidden">
        <MobileTopBar product={currentProduct} />
      </div>
      <div className=" sticky top-[75px] bg-white w-full z-10">
        <MobileInfo
          name={`${group.name} ${currentProduct?.name}`}
          reviews={group?.reviews}
          sku={currentProduct?.sku}
          group={group}
          currentProduct={currentProduct}
        />
      </div>

      <div className="flex  flex-wrap pb-5 min-h-[420px] gap-5">
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
            variants={group?.variants}
            setCurrentProduct={setCurrentProduct}
          />

          <div className="lg:block hidden">
            <CharacteristicsList
              current={currentProduct}
              product={group}
              setTabIndex={setTabIndex}
            />
          </div>
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
