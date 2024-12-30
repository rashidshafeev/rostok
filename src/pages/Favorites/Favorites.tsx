import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';

import { useGetFavoritesQuery } from '@/features/favorite/api/favoritesEndpoints';
import { getTokenFromCookies } from '@/shared/lib';
import { scrollToTop } from '@/shared/lib/scrollToTop';
import { Breadcrumbs } from '@/widgets/breadcrumbs';
import CategorySwitcher from '@/widgets/category-switcher/ui/CategorySwitcher';
import FavDetail from '@components/Favorites/FavDetail';
import FavSidebar from '@components/Favorites/FavSidebar';
import ErrorEmpty from '@helpers/Errors/ErrorEmpty';

import type { RootState } from '@store/store';

const Favorites = () => {
  const token = getTokenFromCookies();
  const { favorite: localFavorite, categories: localCategories } = useSelector(
    (state: RootState) => state.favorite
  );
  const {
    data: serverFavorite,
    isLoading,
    isSuccess,
    error,
  } = useGetFavoritesQuery(undefined, { skip: !token });
  const favoriteData =
    token && isSuccess ? serverFavorite?.data : localFavorite;
  const categories =
    token && isSuccess ? serverFavorite?.category_chain : localCategories;
  const [selectedFilter, setSelectedFilter] = useState('');

  useEffect(() => {
    scrollToTop();
  }, []);

  useEffect(() => {
    if (favoriteData?.length > 0 && categories?.length > 0) {
      setSelectedFilter(
        String(categories[0]?.chain[categories[0]?.chain?.length - 1]?.id)
      );
    }
  }, [favoriteData, categories]);

  const filteredFavorites = selectedFilter
    ? favoriteData?.filter(
        (item) => item.category.id === parseInt(selectedFilter, 10)
      )
    : favoriteData;

  const handleCategoryChange = (id: string | number) => {
    setSelectedFilter(String(id));
  };

  return (
    <div className="content pb-6">
      <Breadcrumbs />
      <h1 className="block text-2xl md:text-[40px] font-semibold text-colBlack pb-5">
        Избранное
      </h1>
      {categories?.length > 0 ? (
        <CategorySwitcher
          categories={categories}
          selectedCategory={selectedFilter}
          onCategoryChange={handleCategoryChange}
        />
      ) : null}
      {token && favoriteData?.length > 0 ? (
        <div className="md:flex">
          <FavSidebar
            favorite={serverFavorite}
            selectedFilter={{ type: 'category', filter: selectedFilter }}
            setSelectedFilter={setSelectedFilter}
          />
          <FavDetail favorite={filteredFavorites} user={token} />
        </div>
      ) : null}
      {!token && favoriteData?.length > 0 ? (
        <div className="md:flex">
          <FavDetail favorite={filteredFavorites} user={token} />
        </div>
      ) : null}
      {favoriteData?.length === 0 ? (
        <ErrorEmpty
          title="Еще не готовы к покупке?"
          desc="Добавляйте понравившийся товар в избранное, чтобы не потерять его."
          height="420px"
        />
      ) : null}
    </div>
  );
};

export default Favorites;
