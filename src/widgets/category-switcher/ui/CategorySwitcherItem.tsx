import clsx from 'clsx';

import noImg from '@/shared/assets/images/no-image.png';

import type { CategoryBase } from '@/entities/category';

interface CategorySwitcherItemProps {
  category: CategoryBase;
  count: number;
  isSelected: boolean;
  onClick: () => void;
}

export const CategorySwitcherItem = ({
  category,
  count,
  isSelected,
  onClick,
}: CategorySwitcherItemProps) => (
  <button
    className={clsx(
      'shadow-[0_1px_2px_0_rgba(0,0,0,.1)] p-1 lg:p-2 rounded-md',
      'flex items-center relative outline-none',
      'whitespace-nowrap md:whitespace-normal md:min-w-[auto]',
      'transition-colors duration-200',
      isSelected ? 'bg-gray-200' : 'bg-white'
    )}
    onClick={onClick}
  >
    {count > 0 ? (
      <span className="absolute top-[-12px] right-[-12px] border-4 border-gray-100 bg-colGreen text-white text-xs rounded-[50px] min-w-[28px] h-[28px] p-[3px] block lining-nums proportional-nums">
        {count}
      </span>
    ) : null}
    <div className="min-w-[40px] w-10 h-8 overflow-hidden rounded">
      <img
        className="w-full h-full object-cover"
        src={category.image || noImg}
        onError={(e) => {
          (e.target as HTMLImageElement).src = noImg;
        }}
        alt={category.name}
      />
    </div>
    <span className="px-2 text-colBlack text-sm leading-[115%] text-left break-all line-clamp-2">
      {category.name}
    </span>
  </button>
);
