import type { Breadcrumb } from '../types/breadcrumb';
import type { CategoryBase } from '@/entities/category';

export const mapCategoryChainToBreadcrumbs = (
  categoryChain: CategoryBase[]
): Breadcrumb[] =>
  categoryChain.map((category) => ({
    name: category.name,
    slug: `/catalog/${category.slug}`,
  }));
