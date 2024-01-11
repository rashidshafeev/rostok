import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { brands } from '../../constants/data';

const Brands = () => {
  return (
    <div className='py-10 slider'>
      <h1 className='text-colBlack text-4xl font-semibold pb-5'>Бренды</h1>
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
        {brands?.map((el) => (
          <SwiperSlide key={el?.id}>
            <div className='h-[130px] rounded-lg border border-[#EBEBEB] overflow-hidden p-3'>
              <img
                className='w-full h-full object-contain'
                src={el?.img}
                alt='*'
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Brands;
