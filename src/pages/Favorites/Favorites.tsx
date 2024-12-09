import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ErrorEmpty from "@helpers/Errors/ErrorEmpty";
import { scrollToTop } from "@utils/scrollToTop";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { useGetFavoritesQuery } from "@api/favoritesEndpoints";
import { getTokenFromCookies } from "@helpers/cookies/cookies";
import { RootState } from "@store/store";
import FavDetail from "@components/Favorites/FavDetail";
import FavSidebar from "@components/Favorites/FavSidebar";
import CategorySwitcher from '@components/common/CategorySwitcher';



const Favorites = () => {
  const token = getTokenFromCookies();
  const { favorite: localFavorite, categories: localCategories } = useSelector((state: RootState) => state.favorite);
  const { data: serverFavorite, isLoading, isSuccess, error } = useGetFavoritesQuery(undefined, { skip: !token });
  const favoriteData = token && isSuccess ? serverFavorite?.data : localFavorite;
  const categories = token && isSuccess ? serverFavorite?.category_chain : localCategories;
  const [selectedFilter, setSelectedFilter] = useState('');

  useEffect(() => {
    scrollToTop();
  }, []);

  useEffect(() => {
    if (favoriteData?.length > 0 && categories?.length > 0) {
      setSelectedFilter(String(categories[0]?.chain[categories[0]?.chain?.length - 1]?.id));
    }
  }, [favoriteData, categories]);

  const filteredFavorites = selectedFilter 
    ? favoriteData?.filter((item) => item.category.id === parseInt(selectedFilter, 10))
    : favoriteData;

  const handleCategoryChange = (id: string | number) => {
    setSelectedFilter(String(id));
  };

  return (
    <div className="content pb-6">
      <Breadcrumbs/>
      <h1 className="block text-2xl md:text-[40px] font-semibold text-colBlack pb-5">
        Избранное
      </h1>
      {categories?.length > 0 && (
        <CategorySwitcher
          categories={categories}
          selectedCategory={selectedFilter}
          onCategoryChange={handleCategoryChange}
        />
      )}
      {token && favoriteData?.length > 0 && (
        <div className="md:flex">
          <FavSidebar
            favorite={serverFavorite}
            selectedFilter={{ type: 'category', filter: selectedFilter }}
            setSelectedFilter={setSelectedFilter}
          />
          <FavDetail favorite={filteredFavorites} user={token} />
        </div>
      )}
      {!token && favoriteData?.length > 0 && (
        <div className="md:flex">
          <FavDetail favorite={filteredFavorites} user={token} />
        </div>
      )}
      {favoriteData?.length === 0 && (
        <ErrorEmpty
          title="Еще не готовы к покупке?"
          desc="Добавляйте понравившийся товар в избранное, чтобы не потерять его."
          height="420px"
        />
      )}
    </div>
  );
};

export default Favorites;
