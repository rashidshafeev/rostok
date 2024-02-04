import { useEffect, useState } from 'react';
import { Loading } from '../../../helpers/Loader/Loader';
import ProductCard from '../../ProductCard';
import { fetchCategoryProducts } from '../../../api/catalog';

const ProdContent = ({ catProducts, isLoading, state }) => {
  const [defaultProducts, setDefaultProducts] = useState([]);
  const [loading, setLoading] = useState(isLoading);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { success, data } = await fetchCategoryProducts(
        state?.category?.id
      );
      if (success) {
        setDefaultProducts(data);
        setLoading(false);
      }
      setLoading(false);
    })();
  }, [state?.category?.id]);

  return (
    <div className='w-full'>
      {loading ? (
        <Loading extraStyle='520px' />
      ) : (
        <div className='grid grid-cols-5 gap-5'>
          {catProducts?.length > 0
            ? catProducts?.map((el) => (
                <ProductCard key={el?.id} product={el} furniture={true} />
              ))
            : defaultProducts?.map((el) => (
                <ProductCard key={el?.id} product={el} furniture={true} />
              ))}
        </div>
      )}
    </div>
  );
};

export default ProdContent;
