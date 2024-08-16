import { useState, useRef, useEffect } from "react";
import ErrorEmpty from "../../../../../helpers/Errors/ErrorEmpty";
import ProductCard from "../../../../ProductCard/ProductCard";
import CardLine from "../../../TypesOfCards/CardLine";
import LineNarrow from "../../../TypesOfCards/LineNarrow";
import { CustomPagination } from "../../../../../helpers/Pagination/CustomPagination";
import filterIcon from "../../../../../assets/icons/filter.svg";
import ProductCardSkeleton from "../../../../ProductCard/ProductCardSkeleton";
import CardLineSkeleton from "../../../TypesOfCards/CardLineSkeleton";
import LineNarrowSkeleton from "../../../TypesOfCards/LineNarrowSkeleton";
import CardTypeControls from "./CardTypeControls";
import SortControls from "./SortControls";
import MobileSortControls from "./MobileSortControls";
import { useGetVariantsMutation } from "../../../../../redux/api/productEndpoints";
import { useParams } from "react-router-dom";
import { useQueryParams } from "../../../../../utils/queryParamUtils";
import { useProducts } from "../../../../../hooks/useProducts";
import { CircularProgress, Grid } from "@mui/material";

const CatProdContent = ({
  // products,
  // getVariantsIsLoading,
  // handlePagination,
  // sort,
  // setSort
}) => {


//   const cardView = localStorage.getItem("cardView");

//   const [cardType, setTypeCard] = useState(cardView ? cardView : "tile");

//   const [activeSort, setActiveSort] = useState(
//     window.innerWidth > 1024
//       ? null
//       : { orderBy: "popularity", sortOrder: "desc", name: "По популярности" }
//   );

// ///

// const { categoryId } = useParams();
// const previousFilters = useRef({});



//   const getSendFiltersObject = () => {
//     const brands = filters?.basics?.brands?.reduce((acc, brand) => {
//       if (brand.is_selected) {
//         acc.push(brand.id);
//       }
//       return acc;
//     }, []);

//     const tags = filters?.basics?.tags?.reduce((acc, tag) => {
//       console.log(tag);
//       if (tag.is_selected) {
//         acc.push(tag.tag);
//       }
//       return acc;
//     }, []);

//     const dynamicFilters = filters?.dynamics
//       ?.filter((filter) => filter.values.some((value) => value.is_selected))
//       .reduce((acc, filter) => {
//         acc[filter.id] = filter.values
//           .filter((value) => value.is_selected)
//           .map((value) => value.id);
//         return acc;
//       }, {});

//     return {
//       category_id: categoryId,
//       min_price: filters?.basics?.price?.current_values?.min || 0,
//       max_price: filters?.basics?.price?.current_values?.max || 0,
//       brands: brands || [],
//       tags: tags || [],
//       filters: dynamicFilters || {},
//       last_changed: filters?.lastChanged || {},
//     };
//   };



//   return (
//     <div className="w-full">
//       <div className="sticky ll:static top-[64px] ll:top-auto flex justify-between items-center pb-3 xl:pb-0 bg-white z-[99]">
//         <SortControls
//           sort={sort}
//           setSort={setSort}
//         />
//         <CardTypeControls cardType={cardType} setTypeCard={setTypeCard} />

//         <MobileSortControls
//           sort={sort}
//           setSort={setSort}
//         />
//         <button
//           onClick={() => setOpen(true)}
//           className="flex md:hidden items-center outline-none bg-transparent"
//         >
//           <img src={filterIcon} alt="*" />
//           <span className="text-colBlack text-xs font-medium">Фильтры</span>
//         </button>
//       </div>

//       {cardType === "tile" && (
//         <div className="grid grid-cols-2 mm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 ll:grid-cols-4 gap-3 xl:grid-cols-5">
//           {getVariantsIsLoading &&
//             Array.from({ length: 40 }).map((_, index) => (
//               <ProductCardSkeleton key={index} />
//             ))}
//           {!getVariantsIsLoading &&
//             products?.data &&
//             products?.data?.map((el) => (
//               <ProductCard key={el?.id} product={el} />
//             ))}
//         </div>
//       )}
//       {cardType === "line" && (
//         <div className="space-y-4">
//           {getVariantsIsLoading &&
//             Array.from({ length: 20 }).map((_, index) => (
//               <CardLineSkeleton key={index} />
//             ))}
//           {!getVariantsIsLoading &&
//             products?.data &&
//             products?.data?.map((el) => (
//               <CardLine key={el?.id} product={el} />
//             ))}
//         </div>
//       )}
//       {cardType === "lineNarrow" && (
//         <div className="space-y-4">
//           {getVariantsIsLoading &&
//             Array.from({ length: 20 }).map((_, index) => (
//               <LineNarrowSkeleton key={index} />
//             ))}
//           {!getVariantsIsLoading &&
//             products?.data &&
//             products?.data?.map((el) => (
//               <LineNarrow key={el?.id} product={el} />
//             ))}
//         </div>
//       )}
//       {!getVariantsIsLoading && !products?.data?.length === 0 && (
//         <ErrorEmpty
//           title="Список пуст!"
//           desc="К сожалению, по вашему запросу ничего не нашли."
//           height="420px"
//         />
//       )}
//       {products?.count > 20 && (
//         <CustomPagination
//           count={products?.count}
//           handlePagination={handlePagination}
//         />
//       )}
//     </div>
//   );

const { products, isLoading, fetchProducts } = useProducts();
  const { getQueryParams } = useQueryParams();

  useEffect(() => {
    const filters = getQueryParams();
    fetchProducts(filters);
  }, [fetchProducts]);

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <Grid container spacing={2}>
      {products.map((product) => (
        <Grid item key={product.id} xs={12} sm={6} md={4}>
          {/* Render your product card here */}
          <div>{product.name}</div>
        </Grid>
      ))}
    </Grid>
  );

};

export default CatProdContent;