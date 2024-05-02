import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import ProductCard from '../ProductCard';
import { products } from '../../constants/data';

const SaleProducts = () => {
  return (
    <div className='py-5 slider'>
      <h1 className='text-colBlack text-2xl mm:text-4xl font-semibold pb-4'>
        Со скидкой
      </h1>
      <div className=''>
        <Swiper
          modules={[Navigation]}
          navigation={window.innerWidth >= 576}
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
    </div>
  );
};

export default SaleProducts;
