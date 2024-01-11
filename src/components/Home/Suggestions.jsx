import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import ProductCard from '../ProductCard';
import { products } from '../../constants/data';

const Suggestions = () => {
  return (
    <div className='pt-10 pb-5 slider'>
      <h1 className='text-colBlack text-4xl font-semibold pb-4'>
        Лучшие предложения
      </h1>
      <div className=''>
        <Swiper
          modules={[Navigation]}
          navigation={true}
          spaceBetween={20}
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
    </div>
  );
};

export default Suggestions;
