import { useEffect, useState } from 'react';
import { fetchProductsByCategory } from '../../../api/catalog';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import ProductCard from '../../ProductCard';
import { Loading } from '../../../helpers/Loader/Loader';
import { products } from '../../../constants/data';

const CatItemContent = () => {
  const [categoryItem, setCategoryItem] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const { success, data } = await fetchProductsByCategory();
      if (success) {
        setCategoryItem(data);
        setIsLoading(false);
      }
      setIsLoading(false);
    })();
  }, []);

  return (
    <div className='pl-8 slider'>
      <h1 className='text-colBlack text-4xl font-semibold pb-5'>Новинки</h1>
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
        {products?.map((el) => (
          <SwiperSlide key={el?.id}>
            <ProductCard product={el} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CatItemContent;
