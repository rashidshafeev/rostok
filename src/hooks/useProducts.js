import { useDispatch, useSelector } from 'react-redux';
import { useGetVariantsMutation } from '../redux/api/productEndpoints';
import { setIsLoading, setIsSuccess, setProducts } from '../redux/slices/productsSlice';

export const useProducts = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const isLoading = useSelector((state) => state.products.isLoading);
  const isSuccess = useSelector((state) => state.products.isSuccess);

  const [getVariants] = useGetVariantsMutation();

  const fetchProducts = (filters) => {
    dispatch(setIsLoading(true));
    // getVariants(filters).then((response) => {
    //   if (response.data) {
    //     dispatch(setProducts(response.data.variants)); // Adjust according to actual data structure
    //     dispatch(setIsSuccess(true));
    //   }
    //   dispatch(setIsLoading(false));
    // });
  };

  return {
    products,
    isLoading,
    isSuccess,
    fetchProducts,
  };
};
