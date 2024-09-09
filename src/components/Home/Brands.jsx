import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { brands } from '../../constants/data';
import { useGetMainPageDataQuery } from '../../redux/api/productEndpoints';

// const Brands = ({ data }) => { 
const Brands = () => { 

  const { data, isLoading, isSuccess } = useGetMainPageDataQuery()


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
            <div className='h-[130px] rounded-lg border border-[#EBEBEB] overflow-hidden p-3'>
              <img
                className='w-full h-full object-contain'
                src={el?.image[0]?.medium}
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
