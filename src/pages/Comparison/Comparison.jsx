import { useEffect } from 'react';
import { ComDetail } from '../../components';
import ErrorEmpty from '../../helpers/Errors/ErrorEmpty';
import { scrollToTop } from '../../helpers/scrollToTop/scrollToTop';
import { useSelector } from 'react-redux';

const Comparison = () => {
  useEffect(() => {
    scrollToTop();
  }, []);


  const  { comparison } = useSelector((state) => state.comparison);
  console.log(comparison);
  return (
    <>
    <div className='content pb-6'>
      <h1 className='  text-[40px] font-semibold text-colBlack'>
        Сравнение товаров
      </h1>
      <div className=' '>
      { comparison?.length ? (
        <ComDetail comparison={comparison}/>
      ) : (
        <ErrorEmpty
          title='Еще не готовы к покупке?'
          desc='Добавляйте понравившийся товар в сравнение, чтобы сравнить его с аналогами.'
          height='420px'
        />
      )}
      </div>
      
    </div>
    </>
  );
};

export default Comparison;
