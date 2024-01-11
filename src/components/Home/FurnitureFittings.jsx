import { products } from '../../constants/data';
import ProductCard from '../ProductCard';

const FurnitureFittings = () => {
  return (
    <div className='pb-10'>
      <h1 className='text-colBlack text-4xl font-semibold pb-4'>
        Мебельная фурнитура
      </h1>
      <div className='flex space-x-5'>
        <div className='flex-grow'>
          <div className='grid grid-cols-4 gap-5'>
            {products?.map((el) => (
              <ProductCard key={el?.id} product={el} furniture={true} />
            ))}
          </div>
        </div>
        <div className='flex-grow-0 flex-shrink-0 h-full w-1/3 bg-[#CFE0D3] px-5 py-3 rounded-xl'>
          <h3 className='text-lg font-semibold text-colBlack pb-4'>
            Рекомендуем для вас
          </h3>
          <div className='grid grid-cols-2 gap-5'>
            {products?.slice(0, 4)?.map((el) => (
              <ProductCard key={el?.id} product={el} recommended={true} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FurnitureFittings;
