import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { useGetMainPageDataQuery } from '@/redux/api/contentEndpoints';
import { ProductCard } from '@/widgets/product-card';

export const SaleProducts = () => {
  const { data, isLoading, isSuccess } = useGetMainPageDataQuery();

  return (
    <div className="py-5 slider">
      <h1 className="text-colBlack text-2xl mm:text-4xl font-semibold pb-4">
        Со скидкой
      </h1>
      <div className="">
        <Swiper
          // className='flex h-full'
          modules={[Navigation]}
          navigation={window.innerWidth >= 576}
          // autoHeight={true}

          wrapperClass="flex grow"
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
          {isSuccess
            ? data?.withDiscount?.map((el) => (
                <SwiperSlide key={el?.id}>
                  <ProductCard product={el} />
                </SwiperSlide>
              ))
            : null}
        </Swiper>
      </div>
    </div>
  );
};
