import React from 'react';

import { products } from '@constants/data';

import { ProductCard } from '@/widgets/product-card';

export const FurnitureFittings = () => {
  return (
    <div className="pb-10">
      <h1 className="text-colBlack text-2xl mm:text-4xl font-semibold pb-4">
        Мебельная фурнитура
      </h1>
      <div className="grid grid-cols-1 sx:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 mm:gap-5">
        {products?.map((el, index) => (
          <React.Fragment key={el?.id}>
            <ProductCard product={el} />
            {index === 3 ? (
              <div className="col-span-2 sx:col-span-2 row-start-1 row-end-3 bg-[#CFE0D3] px-3 mm:px-5 py-2 mm:py-3 rounded-xl">
                <h3 className="text-lg font-semibold text-colBlack pb-4">
                  Рекомендуем для вас
                </h3>
                <div className="grid grid-cols-2 gap-3 mm:gap-5">
                  {products
                    ?.slice(0, 4)
                    ?.map((recommendedEl) => (
                      <ProductCard
                        recommended={true}
                        key={recommendedEl?.id}
                        product={recommendedEl}
                      />
                    ))}
                </div>
              </div>
            ) : null}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
