import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ErrorEmpty from "../../helpers/Errors/ErrorEmpty";
import { scrollToTop } from "../../helpers/scrollToTop/scrollToTop";
import CustomBreadcrumbs from "../../helpers/Breadcrumbs/CustomBreadcrumbs";
import { favoritesBC } from "../../constants/breadcrumbs";
import { useGetFavoritesQuery } from "@api/favoritesEndpoints";
import { getTokenFromCookies } from "../../helpers/cookies/cookies";
import { RootState } from "@store/store";
import FavDetail from "@components/Favorites/FavDetail";
import FavSidebar from "@components/Favorites/FavSidebar";

const Favorites = () => {
  const token = getTokenFromCookies();

  const { favorite: localFavorite } = useSelector((state : RootState) => state?.favorite);
  
  const { data: serverFavorite, isLoading, isSuccess, error } = useGetFavoritesQuery(undefined, { skip: !token });

  const favorite = token && isSuccess ? serverFavorite?.data : localFavorite;

  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    scrollToTop();
  }, []);

  const [selectedFilter, setSelectedFilter] = useState({
    type: null,
    filter: null,
  });

  const filteredFavorites = favorite?.filter((item) => {
    return item.category.id === selectedFilter.filter;
  });

  useEffect(() => {
    if (token && favorite?.length > 0) {
      setSelectedFilter({
        type: "category",
        filter:
        serverFavorite?.categories[0]?.chain[
          serverFavorite?.categories[0]?.chain?.length - 1
          ]?.id,
      });
    }
    
  }, [favorite]);
console.log("favorite");
console.log(favorite);
  return (
    <div className="content pb-6">
      <CustomBreadcrumbs breadcrumbs={favoritesBC} />
      <h1 className="block text-2xl md:text-[40px] font-semibold text-colBlack pb-5">
        Избранное
      </h1>
      {/* {token && favorite && favorite?.data?.length > 0 && (
        <div className={`${token && "md:pl-[240px]"}`}>
          <div className="flex items-center space-x-2 mm:space-x-3 overflow-x-scroll hide-scrollable pt-3 md:pt-6 w-full">
            <button className="min-h-10 mm:min-h-[44px] outline-none border border-colSuperLight rounded-lg p-[5px] bg-white flex justify-between items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
              >
                <rect width="32" height="32" rx="4" fill="#F5F5F5" />
                <rect
                  x="15"
                  y="7"
                  width="2"
                  height="18"
                  rx="1"
                  fill="#B5B5B5"
                />
                <rect
                  x="25"
                  y="15"
                  width="2"
                  height="18"
                  rx="1"
                  transform="rotate(90 25 15)"
                  fill="#B5B5B5"
                />
              </svg>
              <span className="px-2 text-sm font-medium text-colBlack whitespace-nowrap">
                Создать список
              </span>
            </button>
            <button className="min-h-10 mm:min-h-[44px] outline-none border border-colSuperLight rounded-lg p-[5px] bg-white flex justify-between items-center">
              <img
                className="w-8 h-8 min-w-[32px] rounded object-contain"
                src={chair}
                alt="*"
              />
              <span className="px-2 text-sm font-medium text-colBlack whitespace-nowrap">
                Двери
              </span>
            </button>
            <button className="min-h-10 mm:min-h-[44px] outline-none border border-colSuperLight rounded-lg p-[5px] bg-white flex justify-between items-center">
              <img
                className="w-8 h-8 min-w-[32px] rounded object-contain"
                src={chair}
                alt="*"
              />
              <span className="px-2 text-sm font-medium text-colBlack whitespace-nowrap">
                Столешницы
              </span>
            </button>
          </div>
        </div>
      )} */}
      {token && favorite?.length > 0 && (
        <div className="md:flex">
          <FavSidebar
            favorite={serverFavorite}
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
          />
          <FavDetail favorite={filteredFavorites} user={token} />
        </div>
      )}
      {!token && favorite?.length > 0 && (
        <div className="md:flex">
          <FavDetail favorite={favorite} user={token} />
        </div>
      )}
      {favorite?.length === 0 && (
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
