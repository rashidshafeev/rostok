import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { useGetBasicFiltersQuery } from '@/entities/product/api/productApi';
import { NavLink } from 'react-router-dom';

const Brands = () => { 

  // const { data , isLoading, isSuccess } = useGetBasicFiltersQuery()
  const { data , isSuccess } = useGetBasicFiltersQuery()

  return (
    <div className='pt-10 slider brands'>
      <h1 className='text-colBlack text-4xl font-semibold pb-5'>Бренды</h1>
      <Swiper
        modules={[Navigation, Pagination]}
        navigation={window.innerWidth >= 576}
      autoHeight={true}

        pagination={true}
        spaceBetween={16}
        className='pb-16'
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
        {isSuccess && data?.brands?.map((el) => (
          <SwiperSlide key={el?.id}>
            <NavLink
            to={`/catalog/brands?brands=${el?.id}`}
            >
            <div className='h-[130px] rounded-lg border border-[#EBEBEB] overflow-hidden p-3'>
              <img
                className='w-full h-full object-contain'
                src={el?.image?.medium}
                alt='*'
              />
            </div>
            </NavLink>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Brands;
