import { AddOutlined, RemoveOutlined } from '@mui/icons-material';
import CCheckBoxField from '../../helpers/CustomInputs/CCheckBoxField';
import { NavLink, useOutletContext } from 'react-router-dom';
import { FavoriteIcon, DeleteIcon } from '../../helpers/Icons';
import noImg from '../../assets/images/no-image.png';

const ShCartItemLine = ({ selectedItemIds, handleItemChange }) => {
  // eslint-disable-next-line no-unused-vars
  const [cartProducts, addToCart, removeFromCart] = useOutletContext();

  return (
    <>
      {cartProducts?.map((product, index) => (
        <div
          key={index}
          className='flex justify-between items-center border-t border-b border-[#EBEBEB] pt-2 pb-4'
        >
          <div className='max-w-[480px] pr-8 w-full flex space-x-4'>
            <div className='flex items-start'>
              <CCheckBoxField
                checked={selectedItemIds.includes(product?.id)}
                onChange={() => handleItemChange(product?.id)}
              />
              <div className='min-w-[56px] w-14 h-14 overflow-hidden bg-gray-100 rounded-md'>
                <img
                  className='w-full h-full object-contain'
                  src={product?.files[0]?.large || noImg}
                  onError={(e) => {
                    e.target.onError = null;
                    e.target.src = noImg;
                  }}
                  alt='*'
                />
              </div>
            </div>
            <div className='pr-3'>
              <NavLink
                to='#'
                className='font-semibold text-colBlack leading-5 hover:underline line-clamp-1 break-all mt-1'
              >
                {product?.name}
              </NavLink>
              <div className='space-y-1 pt-1'>
                <p className='text-xs text-colDarkGray flex items-center space-x-2'>
                  <span>Артикул:</span>
                  <span>{product?.sku}</span>
                </p>
              </div>
            </div>
          </div>
          <div className='flex items-center justify-between space-x-5 pt-3'>
            <div>
              <div className='text-colBlack'>
                {product?.price
                  ? `${
                      product?.price?.discount
                        ? product?.price?.discount?.price
                        : product?.price?.default
                    }  ${product?.price?.currency} / ${product?.price?.unit}`
                  : 'Не указано'}
              </div>
              <p className='text-colGray text-xs line-through'>
                {product?.price?.discount && (
                  <span>{`${product?.price?.default} ${product?.price?.currency} / ${product?.price?.unit}`}</span>
                )}
              </p>
            </div>
            <div className='flex items-center space-x-3'>
              <span className='w-8 h-8 min-w-[32px] rounded-full flex justify-center items-center bg-colSuperLight'>
                <RemoveOutlined className='text-colGreen cursor-pointer' />
              </span>
              <span className='text-colGreen font-semibold'>10</span>
              <span className='w-8 h-8 min-w-[32px] rounded-full flex justify-center items-center bg-colSuperLight'>
                <AddOutlined className='text-colGreen cursor-pointer' />
              </span>
            </div>
            <div className='flex items-center text-colBlack font-bold'>
              <span>49 999</span>
              <span className='pl-1'>₽</span>
            </div>
            <div className='flex space-x-2'>
              <FavoriteIcon />
              <DeleteIcon onClick={() => removeFromCart(product?.id)} />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ShCartItemLine;
