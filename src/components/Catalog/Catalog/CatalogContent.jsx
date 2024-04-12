import CatalogCard from './CatalogCard';

const CatalogMain = ({ categoryTree }) => {
  return (
    <div className='pl-6'>
      <div className='grid grid-cols-3 gap-4'>
        {categoryTree?.map((category) => (
          <CatalogCard category={category} key={category?.id} />
        ))}
      </div>
    </div>
  );
};

export default CatalogMain;
