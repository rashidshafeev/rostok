import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { useGetMainPageDataQuery } from '@/redux/api/contentEndpoints';
import { ProductCard, ProductCardSkeleton } from '@/widgets/product-card';

export const News = () => {
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
        {isSuccess && data
          ? data?.newProducts?.map((el) => (
              <SwiperSlide key={el?.id}>
                <ProductCard product={el} />
              </SwiperSlide>
            ))
          : null}
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <SwiperSlide key={index}>
                <ProductCardSkeleton />
              </SwiperSlide>
            ))
          : null}
      </Swiper>
    </div>
  );
};

export default News;
