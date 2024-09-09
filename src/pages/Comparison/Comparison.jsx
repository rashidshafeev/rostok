// src/pages/Comparison.js
import { useEffect } from 'react';
import { ComDetail } from '../../components';
import ErrorEmpty from '../../helpers/Errors/ErrorEmpty';
import { scrollToTop } from '../../helpers/scrollToTop/scrollToTop';
import { useSelector } from 'react-redux';
import CustomBCrumbs from '../../helpers/BreadCrumbs/CustomBCrumbs';
import { comparisonBC } from '../../constants/breadCrumps';
import { getTokenFromCookies } from '../../helpers/cookies/cookies';
import { useGetComparisonQuery } from '../../redux/api/comparisonEndpoints';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const Comparison = () => {
  const token = getTokenFromCookies();
  const { comparison: localComparison } = useSelector((state) => state.comparison);

  // Fetching comparison data from the server if the user is logged in
  const { data: serverComparison, isLoading, error } = useGetComparisonQuery(undefined, { skip: !token });

  useEffect(() => {
    scrollToTop();
  }, []);

  const comparison = token ? serverComparison?.data : localComparison;

  return (
    <DndProvider backend={HTML5Backend}>
    <div className='pb-6 content'>
      <CustomBCrumbs breadCrumps={comparisonBC} />
      <h1 className='block text-2xl md:text-[40px] font-semibold text-colBlack pb-5'>
        Сравнение товаров
      </h1>
      <div>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error loading comparison data</p>
        ) : comparison?.length ? (
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
    </DndProvider>
  );
};

export default Comparison;
