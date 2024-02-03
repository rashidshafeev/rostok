import Advantages from '../../Home/Advantages';
import Brands from '../../Home/Brands';
import Promotions from '../../Home/Promotions';
import CatItemContent from './CatItemContent';
import CatItemSidebar from './CatItemSidebar';
import { useLocation } from 'react-router-dom';

const CatItem = () => {
  const { state } = useLocation();

  return (
    <div className='content pb-6 lining-nums proportional-nums'>
      <h3 className='font-semibold text-4xl text-colBlack pb-5'>
        {state?.catalog?.name}
      </h3>
      <div className='pb-16 min-h-[420px]'>
        <CatItemSidebar className='w-[220px]' state={state} />
        <CatItemContent />
      </div>
      <Promotions />
      <Brands />
      <Advantages />
    </div>
  );
};

export default CatItem;
