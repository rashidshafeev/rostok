import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { ExpandMore } from '@mui/icons-material';
import ProductCard from '../../../ProductCard';
import { Loading } from '../../../../helpers/Loader/Loader';
import { NavLink, useParams } from 'react-router-dom';
import { useGetProductsByCategoryQuery } from '../../../../redux/api/api';
import ErrorEmpty from '../../../../helpers/Errors/ErrorEmpty';

const CatItemContent = () => {
  const { categoryId } = useParams();
  const { isLoading, data: products } =
    useGetProductsByCategoryQuery(categoryId);

  if (isLoading) return <Loading extraStyle='520px' />;

  return (
    <>
      {products?.data?.length ? (
        <div className='flex-1 slider'>
          {products?.data?.map((item) => (
            <div key={item?.id}>
              <div className='flex justify-between items-center'>
                <h1 className='text-colBlack text-4xl font-semibold pb-5'>
                  {item?.name}
                </h1>
                {item?.products?.length > 10 && (
                  <NavLink
                    to='products'
                    state={{ category: item }}
                    className='flex justify-end items-center'
                  >
                    <span className='font-semibold'>Посмотреть все</span>
                    <ExpandMore className='rotate-[-90deg]' />
                  </NavLink>
                )}
              </div>
              <div className='max-w-[1129px] mx-auto pb-8'>
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
                      slidesPerView: 5,
                    },
                  }}
                >
                  {item?.products?.slice(0, 10)?.map((el) => (
                    <SwiperSlide key={el?.id}>
                      <ProductCard product={el} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <ErrorEmpty
          title='Список пуст!'
          desc='К сожалению, по вашему запросу ничего не нашли.'
          height='420px'
        />
      )}
    </>
  );
};

export default CatItemContent;
