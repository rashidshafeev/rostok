import { NavLink } from 'react-router-dom';
import noImg from '../../../assets/images/no-image.png';
import CategoryCard from './CategoryCard';

const CatMainContent = ({ categoryTree }) => {

  return (
    <div className='pl-6'>
      <div className='grid grid-cols-3 gap-4'>
        {categoryTree?.map((category) => (
          <CategoryCard category={category} key={category?.id}></CategoryCard>
        ))}
      </div>
    </div>
  );
};

export default CatMainContent;
