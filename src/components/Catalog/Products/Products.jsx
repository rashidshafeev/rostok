import Advantages from '../../Home/Advantages';
import Brands from '../../Home/Brands';
import Promotions from '../../Home/Promotions';
import { useLocation } from 'react-router-dom';
import ProdSidebar from './ProdSidebar';
import ProdContent from './ProdContent';

const Products = () => {
  const { state } = useLocation();

  return (
    <div className='content lining-nums proportional-nums'>
      <h3 className='font-semibold text-4xl text-colBlack pb-5'>
        {state?.catalog?.name}
      </h3>
      <div className='flex pb-5 min-h-[420px]'>
        <ProdSidebar state={state} />
        <ProdContent />
      </div>
      <Promotions />
      <Brands />
      <Advantages />
    </div>
  );
};

export default Products;
