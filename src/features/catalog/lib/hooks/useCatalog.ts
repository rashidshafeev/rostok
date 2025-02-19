// src/features/catalog/lib/hooks/useCatalog.ts

import { useCatalogFilters } from './useCatalogFilters';
import { useCatalogSort } from './useCatalogSort';
import { useCatalogView } from './useCatalogView';
import { useCatalogPagination } from './useCatalogPagination';

export const useCatalog = (categoryId: string | null) => {
  const filters = useCatalogFilters(categoryId);
  const sort = useCatalogSort();
  const view = useCatalogView();
  const pagination = useCatalogPagination();

  return {
    ...filters,
    ...sort,
    ...view,
    ...pagination,
  };
};

