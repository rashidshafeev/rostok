import favoriteiconactive from "@/shared/assets/icons/favorite-green-full.svg";
import favoriteicon from "@/shared/assets/icons/favorite-gray.svg";
import comparisoniconactive from "@/shared/assets/icons/comparison-card-active.svg";
import comparisonicon from "@/shared/assets/icons/comparison-card-inactive.svg";
import share from "@/shared/assets/icons/share-gray.svg";
import { useModal } from '@/features/modals/model/context';
import ComparisonButton from "@/features/comparison/ui/controls/ComparisonButton";
import FavoriteButton from "@/features/favorite/ui/controls/FavoriteButton";

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
