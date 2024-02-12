import ProductCard from '../ProductCard';
import { products } from '../../constants/data';

const ComDetail = () => {
  return (
    <div className='pb-10 min-h-[560px] scrollable'>
      <ul className='flex space-x-3 py-3'>
        <li className='flex items-center space-x-2 cursor-pointer rounded-lg border border-colGreen px-2 py-1'>
          <span className='text-sm font-medium text-colBlack'>Кресла</span>
          <span className='text-sm font-semibold text-colGray'>4</span>
        </li>
        <li className='flex items-center space-x-2 cursor-pointer rounded-lg border border-colSuperLight px-2 py-1'>
          <span className='text-sm font-medium text-colBlack'>
            Дверные ручки
          </span>
          <span className='text-sm font-semibold text-colGray'>4</span>
        </li>
        <li className='flex items-center space-x-2 cursor-pointer rounded-lg border border-colSuperLight px-2 py-1'>
          <span className='text-sm font-medium text-colBlack'>
            Кухонные фасады
          </span>
          <span className='text-sm font-semibold text-colGray'>12</span>
        </li>
        <li className='flex items-center space-x-2 cursor-pointer rounded-lg border border-colSuperLight px-2 py-1'>
          <span className='text-sm font-medium text-colBlack'>
            Мебельные петли
          </span>
          <span className='text-sm font-semibold text-colGray'>8</span>
        </li>
        <li className='flex items-center space-x-2 cursor-pointer rounded-lg border border-colSuperLight px-2 py-1'>
          <span className='text-sm font-medium text-colBlack'>
            Крепление для полок
          </span>
          <span className='text-sm font-semibold text-colGray'>4</span>
        </li>
      </ul>
      <div className='flex space-x-5 pt-3 pb-8 overflow-x-scroll'>
        <ul className='min-w-[220px] space-y-7' key={products[0]?.id}>
          <li>
            <ProductCard product={products[0]} />
          </li>
          <li className='text-colBlack text-sm'>
            <span className='text-xs text-colGreen font-bold uppercase'>
              Рейтинг
            </span>
            <p>Кресло</p>
          </li>
          <li>
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
          </li>
          <li className='text-colBlack text-sm'>
            <span className='text-xs text-colGreen font-bold uppercase'>
              тип
            </span>
            <p>Кресло</p>
          </li>
          <li className='text-colBlack text-sm'>
            <span className='text-xs text-colGreen font-bold uppercase'>
              Бренд
            </span>
            <p>Fiera Carbon</p>
          </li>
          <li className='text-colBlack text-sm'>
            <span className='text-xs text-colGreen font-bold uppercase'>
              тип плетения
            </span>
            <p>Карбон</p>
          </li>
          <li className='text-colBlack text-sm'>
            <span className='text-xs text-colGreen font-bold uppercase'>
              Материал каркаса
            </span>
            <p>Металл и эко-ротанг</p>
          </li>
          <li className='text-colBlack text-sm'>
            <span className='text-xs text-colGreen font-bold uppercase'>
              Длина
            </span>
            <p>115 см</p>
          </li>
          <li className='text-colBlack text-sm'>
            <span className='text-xs text-colGreen font-bold uppercase'>
              ширина
            </span>
            <p>100 см</p>
          </li>
          <li className='text-colBlack text-sm'>
            <span className='text-xs text-colGreen font-bold uppercase'>
              Высота
            </span>
            <p>125 см</p>
          </li>
          <li className='text-colBlack text-sm'>
            <span className='text-xs text-colGreen font-bold uppercase'>
              тип назначения
            </span>
            <p>Для дома и улицы</p>
          </li>
          <li>
            <span className='text-xs text-colGreen font-bold uppercase'>
              Цвет
            </span>
            <div className='w-4 h-4 min-w-[16px] rounded-full bg-[#F04438]'></div>
          </li>
        </ul>
        {products?.slice(1)?.map((product) => (
          <ul className='min-w-[220px] space-y-7' key={product?.id}>
            <li>
              <ProductCard product={product} />
            </li>
            <li className='text-colBlack text-sm'>
              <span className='text-xs text-colGreen font-bold uppercase invisible'>
                в
              </span>
              <p>Кресло</p>
            </li>
            <li>
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
            </li>
            <li className='text-colBlack text-sm'>
              <span className='text-xs text-colGreen font-bold uppercase invisible'>
                в
              </span>
              <p>Кресло</p>
            </li>
            <li className='text-colBlack text-sm'>
              <span className='text-xs text-colGreen font-bold uppercase invisible'>
                в
              </span>
              <p>Fiera Carbon</p>
            </li>
            <li className='text-colBlack text-sm'>
              <span className='text-xs text-colGreen font-bold uppercase invisible'>
                в
              </span>
              <p>Карбон</p>
            </li>
            <li className='text-colBlack text-sm'>
              <span className='text-xs text-colGreen font-bold uppercase invisible'>
                в
              </span>
              <p>Металл и эко-ротанг</p>
            </li>
            <li className='text-colBlack text-sm'>
              <span className='text-xs text-colGreen font-bold uppercase invisible'>
                в
              </span>
              <p>115 см</p>
            </li>
            <li className='text-colBlack text-sm'>
              <span className='text-xs text-colGreen font-bold uppercase invisible'>
                в
              </span>
              <p>100 см</p>
            </li>
            <li className='text-colBlack text-sm'>
              <span className='text-xs text-colGreen font-bold uppercase invisible'>
                в
              </span>
              <p>125 см</p>
            </li>
            <li className='text-colBlack text-sm'>
              <span className='text-xs text-colGreen font-bold uppercase invisible'>
                в
              </span>
              <p>Для дома и улицы</p>
            </li>
            <li>
              <span className='text-xs text-colGreen font-bold uppercase invisible'>
                в
              </span>
              <div className='w-4 h-4 min-w-[16px] rounded-full bg-[#F04438]'></div>
            </li>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default ComDetail;
