// src/pages/Comparison.js
import React, { useEffect, useState } from 'react';

import ErrorEmpty from '../../helpers/Errors/ErrorEmpty';
import { scrollToTop } from '../../helpers/scrollToTop/scrollToTop';
import { useSelector } from 'react-redux';
import CustomBreadcrumbs from '../../helpers/Breadcrumbs/CustomBreadcrumbs';
import { comparisonBC } from '../../constants/breadcrumbs';
import { getTokenFromCookies } from '../../helpers/cookies/cookies';
import { useGetComparisonQuery } from '@api/comparisonEndpoints';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { RootState } from '@store/store';
import ComDetail from "@components/Comparison/ComDetail";

const Comparison = () => {
  const token = getTokenFromCookies();

  const { comparison: localComparison } = useSelector((state : RootState) => state.comparison);
  
  const { data: serverComparison, isLoading, isSuccess, error } = useGetComparisonQuery(undefined, { skip: !token });

  const comparison = token && isSuccess ? serverComparison?.data : localComparison;


const [selectedFilter, setSelectedFilter] = useState(null);

useEffect(() => {
  if (token && comparison?.length > 0) {
    setSelectedFilter(serverComparison?.categories[0]?.chain[serverComparison?.categories[0]?.chain?.length - 1]?.id);
  }
}, [comparison])


const filteredComparison = comparison?.filter((item) => { return item.category.id === selectedFilter })


useEffect(() => {
  scrollToTop();
}, []);

  return (
    <DndProvider backend={HTML5Backend}>
    <div className='pb-6 content'>
      <CustomBreadcrumbs breadcrumbs={comparisonBC} />
      <h1 className='block text-2xl md:text-[40px] font-semibold text-colBlack pb-5'>
        Сравнение товаров
      </h1>
      
      {token && serverComparison?.categories?.length > 0 && 
        <div className={``}>
          <div className="flex items-center space-x-2 mm:space-x-3 overflow-x-scroll hide-scrollable w-full">
          {serverComparison?.categories?.map((category) => {
        return <button 
        onClick={() => {
          setSelectedFilter(category?.chain[category?.chain?.length - 1].id);
        }}
        className="min-h-10 mm:min-h-[44px] outline-none border border-colSuperLight rounded-lg p-[5px] bg-white flex justify-between items-center">
        <span className={`px-2  text-sm ${
                selectedFilter ===
                category?.chain[category?.chain?.length - 1].id
                  ? "font-bold"
                  : ""
              }  text-colBlack whitespace-nowrap`}>
          {category?.chain[category?.chain?.length - 1].name}
        </span>
      </button>
        })}
          </div>
        </div>
      }
      {comparison?.length > 0 &&
          <ComDetail comparison={token ? filteredComparison : comparison} />
      }

      <div>
        {/* {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error loading comparison data</p>
        ) :  */}
        {comparison?.length === 0 &&  <ErrorEmpty
          title='Еще не готовы к покупке?'
          desc='Добавляйте понравившийся товар в сравнение, чтобы сравнить его с аналогами.'
          height='420px'
        />}
          
      </div>
    </div>
    </DndProvider>
  );
};

export default Comparison;
