// src/features/catalog/ui/CatalogSort/CatalogSort.tsx

import { memo } from 'react';

import type { OrderBy, SortOrder } from '@/entities/filter';

interface SortOption {
  orderBy: OrderBy;
  sortOrder: SortOrder;
  label: string;
}

const sortOptions: SortOption[] = [
  { orderBy: 'popularity', sortOrder: 'desc', label: 'По популярности' },
  { orderBy: 'price', sortOrder: 'asc', label: 'Сначала дешёвые' },
  { orderBy: 'price', sortOrder: 'desc', label: 'Сначала дорогие' },
  { orderBy: 'rating', sortOrder: 'desc', label: 'Высокий рейтинг' },
  { orderBy: 'discount', sortOrder: 'desc', label: 'По размеру скидки' },
];

interface CatalogSortProps {
  currentSort: { orderBy: OrderBy; sortOrder: SortOrder };
  onSortChange: (orderBy: OrderBy, sortOrder: SortOrder) => void;
  className?: string;
}

export const CatalogSort = memo(
  ({ currentSort, onSortChange, className = '' }: CatalogSortProps) => {
    return (
      <div className={`flex space-x-4 ${className}`}>
        {sortOptions.map((option) => (
          <button
            key={`${option.orderBy}-${option.sortOrder}`}
            onClick={() => onSortChange(option.orderBy, option.sortOrder)}
            className={`text-sm font-medium ${
              currentSort.orderBy === option.orderBy &&
              currentSort.sortOrder === option.sortOrder
                ? 'text-colGreen'
                : 'text-colBlack hover:text-colGreen'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    );
  }
);

CatalogSort.displayName = 'CatalogSort';
