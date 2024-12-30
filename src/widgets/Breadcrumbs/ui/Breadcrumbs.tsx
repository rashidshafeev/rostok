import { useLocation, useParams } from 'react-router-dom';

import { useGetCategoryTreeQuery } from '@/entities/category';

import { ROUTE_NAMES } from '../lib/constants';
import { mapCategoryChainToBreadcrumbs } from '../lib/mappers/category';

import { BreadcrumbsItem } from './BreadcrumbsItem';
import { BreadcrumbsSkeleton } from './BreadcrumbsSkeleton';

interface BreadcrumbsProps {
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ className = '' }) => {
  const { pathname } = useLocation();
  const { categoryId } = useParams();

  const { data: categoryTree, isLoading } = useGetCategoryTreeQuery(
    categoryId,
    {
      skip: !categoryId || !pathname.startsWith('/catalog/'),
    }
  );

  const generateBreadcrumbs = () => {
    const defaultHome = { name: 'Главная', slug: '/' };

    if (categoryTree?.category_chain) {
      return [
        defaultHome,
        { name: 'Каталог', slug: '/catalog' },
        ...mapCategoryChainToBreadcrumbs(categoryTree.category_chain),
      ];
    }

    if (pathname.startsWith('/catalog')) {
      return [defaultHome, { name: 'Каталог', slug: '/catalog' }];
    }

    const pageName = ROUTE_NAMES[pathname.split('/')[1]];
    if (pageName) {
      return [defaultHome, { name: pageName, slug: pathname }];
    }

    return [defaultHome];
  };

  if (isLoading) {
    return <BreadcrumbsSkeleton />;
  }

  const breadcrumbs = generateBreadcrumbs();

  return (
    <nav
      aria-label="Breadcrumbs"
      className={clsx('flex items-center flex-wrap py-3', className)}
    >
      {breadcrumbs.map((item, index) => (
        <BreadcrumbsItem
          key={item.slug}
          name={item.name}
          slug={item.slug}
          isActive={pathname === item.slug}
          isLast={index === breadcrumbs.length - 1}
        />
      ))}
    </nav>
  );
};
