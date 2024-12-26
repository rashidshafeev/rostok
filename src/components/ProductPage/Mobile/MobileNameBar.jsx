import star from '@/shared/assets/icons/adv1fill.svg';
import copyicon from '@/shared/assets/icons/copy-icon.svg';
import { toast } from 'sonner';
import CopyButton from '../../common/CopyButton';




function MobileNameBar({ name, reviews, sku}) {




  return (
    <div className='lg:hidden block w-full'>
        <div className=' text-xl font-semibold mb-[10px]'>{name}</div>
    <div className='flex justify-between'>
    <div className='flex'>
            <img className='mx-auto mr-1' src={star} alt='*' />
              <span className='text-xs pt-1 mr-2 font-normal text-colBlack'>
                {reviews.rating}
              </span>
              <span className='text-xs pt-1 font-medium text-colDarkGray'>
                {reviews.total_count_text}
              </span>
            </div>

            <div className='flex items-end leading-none shrink ml-1 text-colDarkGray text-xs'>
            Код товара: 
            <div className='flex items-center gap-1'>
                <span>{sku}</span>
                <CopyButton 
                    textToCopy={sku} 
                    toastMessage="Код товара скопирован"
                    iconClassName="w-3 h-3 rounded-full cursor-pointer hover:opacity-80"
                />
            </div>
            </div>
    </div>

    
    </div>
    
  )
}

export default MobileNameBar