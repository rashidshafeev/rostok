import clsx from 'clsx';

import categoryIcon from '@/shared/assets/icons/category.svg';

import { CategorySwitcherItem } from './CategorySwitcherItem';

import type { ProductListCategoryChain } from '@/entities/category';

interface CategorySwitcherProps {
  categories: ProductListCategoryChain[];
  selectedCategory: string | number;
  onCategoryChange: (categoryId: string | number) => void;
}

export const CategorySwitcher = ({
  categories,
  selectedCategory,
  onCategoryChange,
}: CategorySwitcherProps) => {
  if (!categories?.length) return null;

  const totalCount = categories.reduce((sum, cat) => sum + (cat.count || 0), 0);

  return (
    <div className="overflow-x-scroll md:overflow-x-hidden scrollable flex py-3 md:grid md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 gap-3 pr-2">
      <button
        className={clsx(
          'shadow-[0_1px_2px_0_rgba(0,0,0,.1)] p-1 lg:p-2 rounded-md',
          'flex justify-center items-center outline-none min-w-[120px]',
          'transition-colors duration-200',
          selectedCategory === '' ? 'bg-gray-200' : 'bg-white'
        )}
        onClick={() => onCategoryChange('')}
      >
        <img className="w-4 mr-1" src={categoryIcon} alt="All categories" />
        All
        <span className="absolute top-[-12px] right-[-12px] border-4 border-gray-100 bg-colGreen text-white text-xs rounded-[50px] min-w-[28px] h-[28px] p-[3px] block lining-nums proportional-nums">
          {totalCount}
        </span>
      </button>

      {categories.map((el) => {
        const lastCategory = el.chain[el.chain.length - 1];
        return (
          <CategorySwitcherItem
            key={lastCategory.id}
            category={lastCategory}
            count={el.count}
            isSelected={String(selectedCategory) === String(lastCategory.id)}
            onClick={() => onCategoryChange(lastCategory.id)}
          />
        );
      })}
    </div>
  );
};
