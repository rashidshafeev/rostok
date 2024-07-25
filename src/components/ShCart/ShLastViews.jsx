import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import ProductCard from '../ProductCard/ProductCard';
import { products } from '../../constants/data';

const ShLastViews = () => {
  return (
    <div className='py-10 slider'>
      <h1 className='text-colBlack text-4xl font-semibold pb-5'>
        Вы недавно смотрели
      </h1>
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
  );
};

export default ShLastViews;
