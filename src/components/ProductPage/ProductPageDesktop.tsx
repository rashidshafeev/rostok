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
import dummylogo from "@assets/images/dummy-logo.png";
import { addToRecentItems } from "@store/slices/recentItemsSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@store/store";
import useAddToRecentItems from "@hooks/useAddToRecentItems";
import { AttributesValuesList } from "@hooks/useModificationAttributesManager";

type ProductPageDesktopProps = {
  group: ProductGroup;
  currentProduct: Product | null;
  attributesList: AttributesValuesList;
  handleChangeAttribute: (event: React.MouseEvent<HTMLDivElement>) => void;
};
const ProductPageDesktop = ({
  group,
  currentProduct,
  attributesList,
  handleChangeAttribute,
}: ProductPageDesktopProps) => {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [displayedProduct, setDisplayedProduct] = useState<Product | null>(
    currentProduct
  );

  useEffect(() => {
    if (currentProduct) {
      setDisplayedProduct(currentProduct);
    }
  }, [currentProduct]);

  return (
    <>
      <div className="content lining-nums proportional-nums">
        <Breadcrumbs breadcrumbs={group?.category_chain} />
        <div className="lg:block hidden">
          <div className=" text-xl font-semibold mb-[10px]">
            {displayedProduct?.fullName}
          </div>
          <TopControls product={displayedProduct} reviews={group?.reviews} />
        </div>
        <div className="flex  flex-wrap pb-5 min-h-[420px] gap-5">
          <div className="lg:basis-[calc(42%-40px/3)] basis-full">
            <ProductGallery
              files={displayedProduct?.files}
              tags={displayedProduct?.tags}
            />
          </div>
          <div className="lg:basis-[calc(33%-40px/3)] flex flex-col gap-[10px] basis-full">
            <ProductAttributesList
              current={currentProduct}
              attributesList={attributesList}
              handleChangeAttribute={handleChangeAttribute}
            />
            <div className="lg:block hidden">
              <CharacteristicsList
                current={currentProduct}
                product={group}
                setTabIndex={setTabIndex}
              />
            </div>
          </div>
          <div className="lg:basis-[calc(25%-40px/3)] basis-full">
            <RightBar product={displayedProduct} />
          </div>
        </div>
        <div className="lg:block hidden pb-5 min-h-[420px] gap-5">
          <ProductTabs
            current={displayedProduct}
            group={group}
            tabIndex={tabIndex}
            setTabIndex={setTabIndex}
          ></ProductTabs>
        </div>
      </div>
    </>
  );
};
export default ProductPageDesktop;
