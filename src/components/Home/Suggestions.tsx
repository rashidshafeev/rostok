import { products } from '@constants/data';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { ProductCard } from '@/widgets/product-card';

export const Suggestions = () => {
  return (
    <div className="pt-10 pb-5 slider">
      <h1 className="text-colBlack text-2xl mm:text-4xl font-semibold pb-4">
        Лучшие предложения
      </h1>
      <Swiper
        modules={[Navigation]}
        navigation={window.innerWidth >= 576}
        autoHeight={true}
        spaceBetween={16}
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
        {products?.map((el) => (
          <SwiperSlide key={el?.id}>
            <ProductCard product={el} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
