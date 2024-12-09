import React from 'react';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import clsx from 'clsx';
import { useGetCategoryTreeQuery } from '@/redux/api/productEndpoints';
import { Skeleton } from '@/components/ui/skeleton';

interface BreadcrumbsProps {
  className?: string;
}

const routeNameMap = {
  'profile': 'Мой профиль',
  'orders': 'Мои заказы',
  'personal-data': 'Личные данные',
  'organizations': 'Мои организации',
  'change-password': 'Изменить пароль',
  'favorites': 'Избранное',
  'shopping-cart': 'Корзина',
  'comparison': 'Сравнение'
};

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ className = '' }) => {
  const { pathname } = useLocation();
  const params = useParams();
  const { categoryId } = useParams();

  const { data: categoryTree, isLoading } = useGetCategoryTreeQuery(categoryId, {
    skip: !categoryId || !pathname.startsWith('/catalog/')
  });

  const generateBreadcrumbs = () => {
    const defaultHome = { name: 'Главная', slug: '/' };

    // If we're in catalog with category tree
    if (categoryTree?.category_chain) {
      return [
        defaultHome,
        { name: 'Каталог', slug: '/catalog' },
        ...categoryTree.category_chain.map(category => ({
          name: category.name,
          slug: `/catalog/${category.slug}`
        }))
      ];
    }

    // If we're in catalog without category
    if (pathname.startsWith('/catalog')) {
      return [
        defaultHome,
        { name: 'Каталог', slug: '/catalog' }
      ];
    }

    // For other pages (favorites, cart, etc)
    const pageName = routeNameMap[pathname.split('/')[1]];
    if (pageName) {
      return [
        defaultHome,
        { name: pageName, slug: pathname }
      ];
    }

    // Fallback to just home
    return [defaultHome];
  };

  const breadcrumbs = generateBreadcrumbs();
  
  if (isLoading) {
    return (
      <nav 
        aria-label="Breadcrumbs"
        className={clsx('flex items-center flex-wrap py-3', className)}
      >
        <Skeleton className="h-4 w-16 mr-3 mt-2" />
        <Skeleton className="h-1 w-1 rounded-full mr-3 mt-2" />
        <Skeleton className="h-4 w-24 mr-3 mt-2" />
        <Skeleton className="h-1 w-1 rounded-full mr-3 mt-2" />
        <Skeleton className="h-4 w-32 mr-3 mt-2" />
      </nav>
    );
  }

  return (
    <nav 
      aria-label="Breadcrumbs"
      className={clsx('flex items-center flex-wrap py-3', className)}
    >
      {breadcrumbs.map((item, index) => (
        <React.Fragment key={item.slug}>
          {index > 0 && (
            <span className="min-w-[5px] w-[5px] h-[5px] mr-3 mt-2 rounded-full bg-colGreen" />
          )}
          <NavLink
            to={item.slug}
            className={clsx(
              'mr-3 mt-2 text-xs text-colBlack hover:opacity-100 duration-200',
              pathname === item.slug ? 'opacity-100' : 'opacity-60'
            )}
          >
            {item.name}
          </NavLink>
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
