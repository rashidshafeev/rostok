import { useEffect } from 'react'
import image from '@/shared/assets/images/404.svg'
import { NavLink } from 'react-router-dom'
import { scrollToTop } from '@/shared/lib/scrollToTop';

function PageNotFound() {

  useEffect(() => {
    scrollToTop();
  }, []);


  return (
    <div className='content flex flex-col items-center gap-10 '>
      <img className='p-20 w-[50%]' src={image} alt="" />
      <div className='font-semibold text-4xl'>К сожалению, запрашиваемая вами страница не найдена :</div>
      <div className='text-xl'>Давайте поищем что-то другое или вернёмся на главную</div>
      <div className='flex gap-10 mb-10'>
        <NavLink to='/'>
        <button className='py-3 px-8 bg-colGreen rounded cursor-pointer text-white font-semibold'>На главную</button>
        </NavLink>
        <NavLink to='/catalog'>
        <button className='py-3 px-8 border border-colGreen rounded cursor-pointer text-colGreen font-semibold'>В каталог</button>

        </NavLink>
      </div>
    </div>
  )
}

export default PageNotFound