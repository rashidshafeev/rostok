import { NavLink } from 'react-router-dom';

const ErrorEmpty = ({ title, desc, height, hideBtn }) => {
  return (
    <div
      style={{ height: height }}
      className='flex justify-center items-center text-center h-full'
    >
      <div className='max-w-[460px] w-full mx-auto lining-nums proportional-nums'>
        <h3 className='text-2xl text-colBlack font-semibold'>{title}</h3>
        <p className='pb-6 pt-3'>{desc}</p>
        <NavLink
          className={`${
            hideBtn && 'hidden'
          } py-2 px-6 font-semibold text-colGreen border border-colGreen rounded`}
          to='/'
        >
          На главную
        </NavLink>
      </div>
    </div>
  );
};

export default ErrorEmpty;
