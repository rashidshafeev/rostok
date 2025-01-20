import { CategoryCard } from './CategoryCard';

export const CatalogMainContent = ({ categoryTree }) => {
  return (
    <div className="md:pl-6">
      <div className="grid grid-cols-2 mm:grid-cols-3 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-2">
        {categoryTree?.map((category) => (
          <CategoryCard category={category} key={category?.id} />
        ))}
      </div>
    </div>
  );
};
