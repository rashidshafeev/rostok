import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ErrorEmpty from "../../helpers/Errors/ErrorEmpty";
import { scrollToTop } from "../../helpers/scrollToTop/scrollToTop";
import { FavDetail, FavSidebar } from "../../components";
import chair from "../../assets/temp-images/chair.png";
import CustomBCrumbs from "../../helpers/BreadCrumbs/CustomBCrumbs";
import { favoritesBC } from "../../constants/breadCrumps";
import { useGetFavoritesQuery } from "../../redux/api/favoritesEndpoints";
import { getTokenFromCookies } from "../../helpers/cookies/cookies";

const Favorites = () => {
  const token = getTokenFromCookies();

  const [isOpen, setIsOpen] = useState(true);

  const localFavorite = useSelector((state) => state?.favorite?.favorite);

  // Fetching cart data from the server if the user is logged in
  const {
    data: serverFavorite,
    isLoading,
    error,
  } = useGetFavoritesQuery(undefined, { skip: !token });
  const favorite = token ? serverFavorite?.data : localFavorite;

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
      <CustomBCrumbs breadCrumps={favoritesBC} />
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
