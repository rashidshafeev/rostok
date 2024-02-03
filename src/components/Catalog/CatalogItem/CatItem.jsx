import { useSelector } from 'react-redux';
import CatItemContent from './CatItemContent';
import CatItemSidebar from './CatItemSidebar';

const CatItem = () => {
  const { catalog } = useSelector((state) => state?.catalog);
  return (
    <div className='content pb-6 lining-nums proportional-nums min-h-[520px]'>
      <div className='flex'>
        <CatItemSidebar catalog={catalog} />
        <CatItemContent />
      </div>
    </div>
  );
};

export default CatItem;
