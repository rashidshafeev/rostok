import React from "react";
import { PriceType } from "@customTypes/Product/PriceType";

type PriceProps = {
  price: PriceType;
  alignment?: "left" | "center" | "right";
};

const PriceDisplay = ({ price, alignment = "left" }: PriceProps) => {
  return (
    <>
      <div className={`flex flex-wrap items-center ${alignment === "center" ? "justify-center" : alignment === "right" ? "justify-end" : "justify-start"}`}>
        <div className="flex items-center gap-1 mr-1">
          <p className="text-lg font-bold whitespace-nowrap break-words">
            {!price?.base && "Цена не указана"}
            {price?.final !== 0 && `${price?.final} ${price?.currency?.symbol}`}
          </p>
        </div>
        {price?.base !== 0 && price?.discount && (
          <div className="flex items-center">
            <span className="line-through decoration-colDarkGray text-[8px] sm:text-[12px] text-colDarkGray whitespace-nowrap">
              {`${price?.base} ${price?.currency?.symbol}`}
            </span>
            <span className="ml-2 bg-[#F04438] text-[10px] mm:text-xs font-medium text-white whitespace-nowrap px-[6px] py-[2px] rounded-xl">
              {`${price?.discount?.percent} %`}
            </span>
          </div>
        )}
      </div>
    </>
  );
};

export default PriceDisplay;
