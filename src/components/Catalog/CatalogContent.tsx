import React from 'react';
import CatalogCard from './CatalogCard';
import { Category } from '../../types/Category/Category';

interface CatalogContentProps {
  categoryTree: Category[];
}

const CatalogContent: React.FC<CatalogContentProps> = ({ categoryTree }) => {
  return (
    <div className='md:pl-6'>
      <div className='grid grid-cols-2 mm:grid-cols-3 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-2'>
        {categoryTree?.map((category) => (
          <CatalogCard category={category} key={category?.id} />
        ))}
      </div>
    </div>
  );
};

export default CatalogContent; 