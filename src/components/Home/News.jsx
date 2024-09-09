import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import ProductCard from "../ProductCard/ProductCard";
import { useGetMainPageDataQuery } from "../../redux/api/productEndpoints";
import ProductCardSkeleton from "../ProductCard/ProductCardSkeleton";
const News = () => {
  const { data, isLoading, isSuccess } = useGetMainPageDataQuery();

  return (
    <div className="py-10 slider">
      <h1 className="text-colBlack text-2xl mm:text-4xl font-semibold pb-5">
        Новинки
      </h1>
      <Swiper
        modules={[Navigation]}
        navigation={window.innerWidth >= 576}
        spaceBetween={16}
      autoHeight={true}

        breakpoints={{
          260: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          992: {
            slidesPerView: 4,
          },
          1200: {
            slidesPerView: 6,
          },
        }}
      >
        {isSuccess &&
          data &&
          data?.newProducts?.map((el) => (
            <SwiperSlide key={el?.id}>
              <ProductCard product={el} />
            </SwiperSlide>
          ))}
        {isLoading &&
          Array.from({ length: 6 }).map((_, index) => (
            <SwiperSlide key={index}>
              <ProductCardSkeleton />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default News;
