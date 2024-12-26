import { Product } from '@/types/Product/Product';
import React from 'react';


type ProductAttributesDisplayProps = {
  product: Product;
};

const ProductAttributesDisplay = ({ product } : ProductAttributesDisplayProps) => {
  return (
    <div className='flex flex-wrap gap-3'>
              <p className='text-xs text-colDarkGray flex items-center space-x-2'>
                <span>Код товара:</span>
                <span>{product?.sku || 'Не указано'}</span>
              </p>
              {product.attributes &&
                product?.attributes?.map((attribute, index) => (
                  <p
                    key={index}
                    className='text-xs text-colDarkGray flex items-center space-x-1'
                  >
                    <span>{attribute?.name}:</span>
                    <span className='font-semibold'>
                      {attribute?.color ? (
                        <div
                          style={{ backgroundColor: `${attribute?.color}` }}
                          className={`min-w-[12px] w-3 h-3 rounded-full`}
                        ></div>
                      ) : (
                        attribute?.text
                      )}
                    </span>
                  </p>
                ))}
                </div>
  );
};

export default ProductAttributesDisplay; 