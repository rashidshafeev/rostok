
import ProductCard from '../ProductCard';
import { products } from '../../constants/data';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import ComparisonProductCard from './ComparisonProductCard';
import React from 'react';
import { useIntersection } from 'react-use';


const ComDetail = ({ comparison }) => {
  
  // const allAttributes = Array.from(
  //   new Set(comparison.flatMap(product => Object.keys(product.attributes)))
  // );

  //  // Extract all product names
  //  const productNames = comparison.map(product => product.name);

   const getUniqueAttributes = (products) => {
    const attributesSet = new Set();
    products.forEach(product => {
      Object.values(product.attributes).forEach(attr => {
        attributesSet.add(attr.name);
      });
    });
    return Array.from(attributesSet);
  };


   const attributes = getUniqueAttributes(comparison);

  return (
    <>
{/* <div className="sticky top-20 z-20">
<div className="overflow-x-auto ">

    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus, inventore.
  </div> */}


<div className="overflow-auto max-h-[80vh]">
      <div className="min-w-full grid" style={{ gridTemplateColumns: `repeat(${comparison.length + 1}, minmax(300px, 300px))` }}>
        {/* Header */}
        <div className="sticky top-0 bg-white z-10 border border-gray-300 p-2">Feature</div>
        {comparison.map(product => (
         <ComparisonProductCard product={product} />
        ))}

        {/* Attributes and Values */}
        {attributes.map(attribute => (
          <React.Fragment key={attribute}>
            <div className="sticky left-0 bg-white border border-gray-300 p-2 z-10">{attribute}</div>
            {comparison.map(product => (
              <div key={product.id} className="border border-gray-300 p-2">
                {product.attributes ? (Object.values(product.attributes).find(attr => attr.name === attribute)?.text || 'N/A') : 'N/A'}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>

    <div className="overflow-x-auto ">
      <table className="min-w-full  border-collapse  table-auto">
        <thead className="sticky">
          <tr>
            <th className="sticky top-0 p-2 w-[100px] bg-gray-100 z-70"></th>
            {comparison.map(product => (
              <th key={product.id} className="sticky top-0 p-2 min-w-[300px] bg-gray-100">
              {/* //  <th key={product.id} className="bg-white sticky  top-[68px] p-2 min-w-[350px] ">  */}
                <ComparisonProductCard product={product} />
                </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {attributes.map((attribute, i) => (
            <>
            <tr key={attribute} className={`border-b ${ i % 2 === 1 ? 'bg-gray-100' : 'bg-white' }`}>
              <td className={`sticky left-0 ${ i % 2 === 1 ? 'bg-gray-100' : 'bg-white' } font-bold uppercase text-xs text-colGreen`}>
                <div className="border-r h-full p-2">{attribute}</div>
                </td>
   
              {comparison.map(product => (
                <td key={product.id} className="text-sm p-2">
                  {Object.values(product.attributes).find(attr => attr.name === attribute)?.text || 'N/A'}
                </td>
              ))}
            </tr>
            
          

           

            </>
          ))}
        </tbody>
      </table>
      </div>
    {/* </div> */}


{/* <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr>
            <th className="sticky top-0 left-0 z-20 bg-white"></th>
            {productNames.map(name => (
              <th key={name} className="sticky top-0 z-10 bg-white">
                {name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {allAttributes.map(attribute => (
            <tr key={attribute}>
              <td className="sticky left-0 z-20 bg-white">{attribute}</td>
              {comparison.map(product => (
                <td key={product.id}>
                  {product.attributes[attribute] ? product.attributes[attribute].text : '-'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div> */}

    {/* <div className='pb-10 min-h-[560px] scrollable'>
      <div className='flex space-x-3 py-3 '>
        <div className='flex items-center space-x-2 cursor-pointer rounded-lg border border-colGreen px-2 py-1'>
          <span className='text-sm font-medium text-colBlack'>Кресла</span>
          <span className='text-sm font-semibold text-colGray'>4</span>
        </div>
        <div className='flex items-center space-x-2 cursor-pointer rounded-lg border border-colSuperdivght px-2 py-1'>
          <span className='text-sm font-medium text-colBlack'>
            Дверные ручки
          </span>
          <span className='text-sm font-semibold text-colGray'>4</span>
        </div>
        <div className='flex items-center space-x-2 cursor-pointer rounded-lg border border-colSuperdivght px-2 py-1'>
          <span className='text-sm font-medium text-colBlack'>
            Кухонные фасады
          </span>
          <span className='text-sm font-semibold text-colGray'>12</span>
        </div>
        <div className='flex items-center space-x-2 cursor-pointer rounded-lg border border-colSuperdivght px-2 py-1'>
          <span className='text-sm font-medium text-colBlack'>
            Мебельные петли
          </span>
          <span className='text-sm font-semibold text-colGray'>8</span>
        </div>
        <div className='flex items-center space-x-2 cursor-pointer rounded-lg border border-colSuperdivght px-2 py-1'>
          <span className='text-sm font-medium text-colBlack'>
            Крепление для полок
          </span>
          <span className='text-sm font-semibold text-colGray'>4</span>
        </div>
      </div>
      <div className='flex space-x-5 pt-3 pb-8 overflow-x-scroll'>
        <div className='min-w-[220px] space-y-7 ' key={products[0]?.id}>
            <ProductCard sticky={true} product={products[0]} />
          <div className='text-colBlack text-sm'>
            <span className='text-xs text-colGreen font-bold uppercase'>
              Рейтинг
            </span>
            <p>Кресло</p>
          </div>
          <div>
            <span className='text-xs text-colGreen font-bold uppercase'>
              специальное предложение
            </span>
            <p
              className={`${
                products[0]?.type === 'hit'
                  ? 'bg-[#F57C1F]'
                  : products[0]?.type === 'new'
                  ? 'bg-[#15765B]'
                  : 'bg-[#F04438]'
              } py-1 px-2 uppercase text-xs font-bold text-white rounded-xl w-max`}
            >
              {products[0]?.type === 'hit'
                ? 'Хит'
                : products[0]?.type === 'new'
                ? 'Новинки'
                : 'Распродажа'}
            </p>
          </div>
          <div className='text-colBlack text-sm'>
            <span className='text-xs text-colGreen font-bold uppercase'>
              тип
            </span>
            <p>Кресло</p>
          </div>
          <div className='text-colBlack text-sm'>
            <span className='text-xs text-colGreen font-bold uppercase'>
              Бренд
            </span>
            <p>Fiera Carbon</p>
          </div>
          <div className='text-colBlack text-sm'>
            <span className='text-xs text-colGreen font-bold uppercase'>
              тип плетения
            </span>
            <p>Карбон</p>
          </div>
          <div className='text-colBlack text-sm'>
            <span className='text-xs text-colGreen font-bold uppercase'>
              Материал каркаса
            </span>
            <p>Металл и эко-ротанг</p>
          </div>
          <div className='text-colBlack text-sm'>
            <span className='text-xs text-colGreen font-bold uppercase'>
              Длина
            </span>
            <p>115 см</p>
          </div>
          <div className='text-colBlack text-sm'>
            <span className='text-xs text-colGreen font-bold uppercase'>
              ширина
            </span>
            <p>100 см</p>
          </div>
          <div className='text-colBlack text-sm'>
            <span className='text-xs text-colGreen font-bold uppercase'>
              Высота
            </span>
            <p>125 см</p>
          </div>
          <div className='text-colBlack text-sm'>
            <span className='text-xs text-colGreen font-bold uppercase'>
              тип назначения
            </span>
            <p>Для дома и улицы</p>
          </div>
          <div>
            <span className='text-xs text-colGreen font-bold uppercase'>
              Цвет
            </span>
            <div className='w-4 h-4 min-w-[16px] rounded-fdivl bg-[#F04438]'></div>
          </div>
        </div>
        {comparison?.map((product) => (
          <div className='min-w-[220px] space-y-7' key={product?.id}>
            <div>
              <ProductCard product={product} />
            </div>
            <div className='text-colBlack text-sm'>
              <span className='text-xs text-colGreen font-bold uppercase invisible'>
                в
              </span>
              <p>Кресло</p>
            </div>
            <div>
              <span className='text-xs text-colGreen font-bold uppercase invisible'>
                в
              </span>
              <p
                className={`${
                  product?.type === 'hit'
                    ? 'bg-[#F57C1F]'
                    : product?.type === 'new'
                    ? 'bg-[#15765B]'
                    : 'bg-[#F04438]'
                } py-1 px-2 uppercase text-xs font-bold text-white rounded-xl w-max`}
              >
                {product?.type === 'hit'
                  ? 'Хит'
                  : product?.type === 'new'
                  ? 'Новинки'
                  : 'Распродажа'}
              </p>
            </div>
            <div className='text-colBlack text-sm'>
              <span className='text-xs text-colGreen font-bold uppercase invisible'>
                в
              </span>
              <p>Кресло</p>
            </div>
            <div className='text-colBlack text-sm'>
              <span className='text-xs text-colGreen font-bold uppercase invisible'>
                в
              </span>
              <p>Fiera Carbon</p>
            </div>
            <div className='text-colBlack text-sm'>
              <span className='text-xs text-colGreen font-bold uppercase invisible'>
                в
              </span>
              <p>Карбон</p>
            </div>
            <div className='text-colBlack text-sm'>
              <span className='text-xs text-colGreen font-bold uppercase invisible'>
                в
              </span>
              <p>Металл и эко-ротанг</p>
            </div>
            <div className='text-colBlack text-sm'>
              <span className='text-xs text-colGreen font-bold uppercase invisible'>
                в
              </span>
              <p>115 см</p>
            </div>
            <div className='text-colBlack text-sm'>
              <span className='text-xs text-colGreen font-bold uppercase invisible'>
                в
              </span>
              <p>100 см</p>
            </div>
            <div className='text-colBlack text-sm'>
              <span className='text-xs text-colGreen font-bold uppercase invisible'>
                в
              </span>
              <p>125 см</p>
            </div>
            <div className='text-colBlack text-sm'>
              <span className='text-xs text-colGreen font-bold uppercase invisible'>
                в
              </span>
              <p>Для дома и улицы</p>
            </div>
            <div>
              <span className='text-xs text-colGreen font-bold uppercase invisible'>
                в
              </span>
              <div className='w-4 h-4 min-w-[16px] rounded-fdivl bg-[#F04438]'></div>
            </div>
          </div>
        ))}
      </div>
    </div> */}
        </>
  );
};

export default ComDetail;
