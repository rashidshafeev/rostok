import type { Breadcrumb } from '../breadcrumb';
import type { CategoryBase } from '@/entities/category';

export const mapCategoryChainToBreadcrumbs = (
  categoryChain: CategoryBase[]
): Breadcrumb[] =>
  categoryChain.map((category) => ({
    name: category.name,
    slug: `/catalog/${category.slug}`,
  }));
