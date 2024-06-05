import { useEffect } from 'react';
import { ComDetail } from '../../components';
import ErrorEmpty from '../../helpers/Errors/ErrorEmpty';
import { scrollToTop } from '../../helpers/scrollToTop/scrollToTop';
import { useSelector } from 'react-redux';
import CustomBCrumbs from '../../helpers/BreadCrumbs/CustomBCrumbs';
import { comparisonBC } from '../../constants/breadCrumps';

const Comparison = () => {
  const { comparison } = useSelector((state) => state.comparison);

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <div className=' pb-6 content'>
      <CustomBCrumbs breadCrumps={comparisonBC} />
      <h1 className='block text-2xl md:text-[40px] font-semibold text-colBlack'>
        Сравнение товаров
      </h1>
      <div>
        {comparison?.length ? (
          <ComDetail comparison={comparison} />
        ) : (
          <ErrorEmpty
            title='Еще не готовы к покупке?'
            desc='Добавляйте понравившийся товар в сравнение, чтобы сравнить его с аналогами.'
            height='420px'
          />
        )}
      </div>
    </div>
  );
};

export default Comparison;
