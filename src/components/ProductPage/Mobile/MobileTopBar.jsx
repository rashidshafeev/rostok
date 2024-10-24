import favoriteiconactive from "../../../assets/icons/favorite-green-full.svg";
import favoriteicon from "../../../assets/icons/favorite-gray.svg";
import comparisoniconactive from "../../../assets/icons/comparison-card-active.svg";
import comparisonicon from "../../../assets/icons/comparison-card-inactive.svg";
import share from "../../../assets/icons/share-gray.svg";
import { useModal } from "../../../context/ModalContext";
import ComparisonButton from "../../../helpers/ComparisonButton/ComparisonButton";
import FavoriteButton from "../../../helpers/FavoriteButton/FavoriteButton";

function MobileTopBar({ product }) {
  const { showModal } = useModal();

  return (
    <div className="flex justify-end gap-3 my-2">
        <button
          className="text-center flex flex-row justify-between items-center"
          onClick={() => showModal({ type: "share" })}
        >
          <img className="" src={share} alt="*" />
        </button>

        <ComparisonButton product={product}>
          {({ isInComparison, handleComparisonClick }) => (
            <button
              className="text-center flex flex-row justify-between items-center"
              onClick={handleComparisonClick}
            >
              <img
                className={`w-6`}
                src={isInComparison ? comparisoniconactive : comparisonicon}
                alt="*"
              />
            </button>
          )}
        </ComparisonButton>

        <FavoriteButton product={product}>
          {({ isInFavorite, handleFavoriteClick }) => (
            <button
              className="text-center flex flex-row justify-between items-center"
              onClick={handleFavoriteClick}
            >
              <img
                className="w-6 h-6"
                src={isInFavorite ? favoriteiconactive : favoriteicon}
                alt="*"
              />
            </button>
          )}
        </FavoriteButton>
    </div>
  );
}

export default MobileTopBar;
