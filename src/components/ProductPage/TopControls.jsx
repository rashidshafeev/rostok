import favoriteiconactive from '@/shared/assets/icons/favorite-green-full.svg';
import favoriteicon from '@/shared/assets/icons/favorite-green.svg';
import comparisoniconactive from '@/shared/assets/icons/comparison-card-active.svg';
import comparisonicon from '@/shared/assets/icons/comparison-green.svg';
import star from '@/shared/assets/icons/adv1fill.svg';
import share from '@/shared/assets/icons/share.svg';
import downloadpdf from '@/shared/assets/icons/download-pdf.svg';
import print from '@/shared/assets/icons/print.svg';
import { useModal } from '@/features/modals/model/context';
import ComparisonButton from '@helpers/ComparisonButton/ComparisonButton';
import FavoriteButton from '@helpers/FavoriteButton/FavoriteButton';

function TopControls({product, reviews}) {

  const {showModal } = useModal();

  
  return (
    <>
    <div className='flex justify-between mb-[10px]'>
      
          <div className='flex gap-[10px]'>

            <button className='flex items-end proportional-nums  lining-nums'>
            <img className='mx-auto mr-1' src={star} alt='*' />
              <span className='text-xs pt-1 mr-2 font-normal text-colBlack'>
                {reviews.rating}
              </span>
              <span className='text-xs pt-1 font-medium text-colDarkGray'>
                {reviews.total_count_text}
              </span>
            </button>
            

            <ComparisonButton product={product}>
            {({isInComparison, handleComparisonClick }) => (
              <button
              className='text-center flex flex-row justify-between items-center'
              onClick={handleComparisonClick}
            >
              <img className='mx-auto mr-1' src={isInComparison ? comparisoniconactive : comparisonicon  } alt='*' />

              <span className='text-xs pt-1 font-medium text-colBlack'>
                Сравнить
              </span>
            </button>
            )}
          </ComparisonButton>

            <FavoriteButton product={product}>
              {({ isInFavorite, handleFavoriteClick }) => (
                <button 
                className='text-center flex flex-row justify-between items-center'
                onClick={handleFavoriteClick}
              >
                <img className='mx-auto mr-1' src={isInFavorite ?  favoriteiconactive  : favoriteicon} alt='*' />
                <span className='text-xs pt-1 font-medium text-colBlack'>
                  В избранное
                </span>
              </button>
              )}
            </FavoriteButton>

            <button 
              className='text-center flex flex-row justify-between items-center'
              onClick={() => showModal({ type: 'share'})}
            >
              <img className='mx-auto mr-1' src={share} alt='*' />
              <span className='text-xs pt-1 font-medium text-colBlack'>
                Поделиться
              </span>
            </button>

          </div>

          <div className='flex gap-[10px]'>
            <button 
              className='text-center flex flex-row justify-between items-center'
            >
              <img className='mx-auto mr-1' src={downloadpdf} alt='*' />
              <span className='text-xs pt-1 font-medium text-colBlack'>
                Скачать PDF
              </span>
            </button>
            <button 
              className='text-center flex flex-row justify-between items-center'
            >
              <img className='mx-auto mr-1' src={print} alt='*' />
              <span className='text-xs pt-1 font-medium text-colBlack'>
                Распечатать
              </span>
            </button>
          </div>




        </div>
    </>
  )
}

export default TopControls