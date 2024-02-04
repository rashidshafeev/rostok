import { useEffect, useState } from 'react';
import { fetchProductsByCategory } from '../../../api/catalog';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { ExpandMore } from '@mui/icons-material';
import ProductCard from '../../ProductCard';
import { Loading } from '../../../helpers/Loader/Loader';
import { NavLink, useLocation } from 'react-router-dom';

const CatItemContent = () => {
  const [categoryItem, setCategoryItem] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { state } = useLocation();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const { success, data } = await fetchProductsByCategory(
        state?.catalog?.id, 1
      );
      if (success) {
        setCategoryItem(data);
        setIsLoading(false);
      }
      setIsLoading(false);
    })();
  }, [state?.catalog?.id]);

  return (
    <>
      {isLoading ? (
        <Loading extraStyle='520px' />
      ) : (
        <div className='flex-1 slider'>
          {categoryItem?.map((item) => (
            <div key={item?.id}>
              <div className='flex justify-between items-center'>
                <h1 className='text-colBlack text-4xl font-semibold pb-5'>
                  {item?.name}
                </h1>
                <NavLink className='flex justify-end items-center'>
                  <span className='font-semibold'>Посмотреть все</span>
                  <ExpandMore className='rotate-[-90deg]' />
                </NavLink>
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
                      <ProductCard product={el} furniture={true} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default CatItemContent;
