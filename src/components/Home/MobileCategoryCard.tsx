// src/components/Catalog/MobileCategoryCard.tsx
import { NavLink } from 'react-router-dom';

import noImg from '@/shared/assets/images/no-image.png';

import type { CategoryBase } from '@/entities/category';

interface MobileCategoryCardProps {
  category: CategoryBase;
}

const generateRandomWidth = () => {
  const min = 70;
  const max = 150;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const MobileCategoryCard = ({ category }: MobileCategoryCardProps) => {
  return (
    <NavLink
      to={`/catalog/${category?.slug}`}
      state={{ category }}
      className="block relative rounded-lg overflow-hidden  h-[70px] bg-colLightGray   "
      style={{ width: `${generateRandomWidth()}px` }}
    >
      <img
        src={category?.image?.large || noImg}
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = noImg;
        }}
        alt={category?.name}
        className="absolute -bottom-1 right-3 w-8 h-8 object-cover"
      />
      <h3 className="absolute top-1 left-2   text-colBlack text-sm font-semibold line-clamp-2">
        {category?.name || 'Не указано'}
      </h3>
    </NavLink>
  );
};
// const MobileCategoryCard = ({ category }: MobileCategoryCardProps) => {
//   return (
//     <NavLink
//       to={`/catalog/${category?.slug}`}
//       state={{ category }}
//       className="block w-full aspect-[4/3] relative rounded-lg overflow-hidden"
//     >
//       <div className="relative w-full h-full">
//         <img
//           src={category?.image?.large || noImg}
//           onError={(e) => {
//             e.currentTarget.onerror = null;
//             e.currentTarget.src = noImg;
//           }}
//           alt={category?.name}
//           className="absolute inset-0 w-full h-full object-cover"
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
//         <h3 className="absolute bottom-3 left-3 right-3 text-white text-lg font-medium line-clamp-2">
//           {category?.name || 'Не указано'}
//         </h3>
//       </div>
//     </NavLink>
//   );
// };

export default MobileCategoryCard;
