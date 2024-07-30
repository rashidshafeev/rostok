
import ComparisonProductCard from "./ComparisonProductCard";
import React, { useEffect, useRef, useState } from "react";
import { useIntersection } from "react-use";
import arrow from "../../assets/icons/arrow-black.svg";
import { current } from "@reduxjs/toolkit";

const ComDetail = ({ comparison }) => {
  const buttonContainer = useRef(null);
  const item = useRef(null);
  const [maxStep, setMaxStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);

  const [translateX, setTranslateX] = useState(0);

  const scrollLeft = () => {
    setTranslateX((translateX) => translateX + 300); // Adjust the scroll amount as needed
    setCurrentStep((currentStep) => currentStep - 1);
    console.log(maxStep);
  };

  const scrollRight = () => {
    setTranslateX((translateX) => translateX - 300); // Adjust the scroll amount as needed
    setCurrentStep((currentStep) => currentStep + 1);
  };

  const tableHeader = useRef(null);
  const tableHeaderPlaceholder = useRef(null);
  const tableHeaderVisible = useIntersection(tableHeader, {
    root: null,
    rootMargin: "-82px 0px 0px 0px",
    threshold: 1,
  });
  const tableHeaderPlaceholderVisible = useIntersection(
    tableHeaderPlaceholder,
    {
      root: null,
      rootMargin: "-82px 0px 0px 0px",
      threshold: 1,
    }
  );

  console.log("tableHeaderVisible");
  console.log(tableHeaderVisible);

  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    if (tableHeaderVisible) {
      setIsSticky(tableHeaderVisible.intersectionRatio < 1);
    }
  }, [tableHeaderVisible]);

  useEffect(() => {
    if (tableHeader.current && buttonContainer.current) {
      buttonContainer.current.style.width = `${tableHeader.current.offsetWidth}px`;
    }
  }, [tableHeader.current]);

  useEffect(() => {
    if (tableHeader.current && item.current) {
      console.log(
        (item.current.offsetWidth * comparison.length -
          tableHeader.current.offsetWidth) /
          item.current.offsetWidth
      );

      item.current.offsetWidth * comparison.length <
      tableHeader.current.offsetWidth
        ? setMaxStep(1)
        : setMaxStep(
            Math.ceil(
              (item.current.offsetWidth * comparison.length -
                tableHeader.current.offsetWidth) /
                item.current.offsetWidth
            ) + 1
          );
    }
  }, [tableHeader.current, item.current]);

  useEffect(() => {
    if (tableHeaderPlaceholderVisible) {
      setIsSticky(!tableHeaderPlaceholderVisible.intersectionRatio === 1);
    }
  }, [tableHeaderPlaceholderVisible]);

  useEffect(() => {
    if (tableHeader.current && tableHeaderPlaceholder.current) {
      tableHeaderPlaceholder.current.style.height = `${tableHeader.current.offsetHeight}px`;
    }
  }, [isSticky]);

  const getUniqueAttributes = (products) => {
    const attributesSet = new Set();
    products.forEach((product) => {
      Object.values(product.attributes).forEach((attr) => {
        attributesSet.add(attr.name);
      });
    });
    return Array.from(attributesSet);
  };

  const attributes = getUniqueAttributes(comparison);
  console.log("comparison 2");
  console.log(comparison);

  return (
    <>
      <div
        ref={tableHeader}
        className={`w-full  h-[130px] transition-all duration-1000 ${
          isSticky ? "fixed top-[82px] z-50 " : "relative"
        }`}
      >
        <div ref={buttonContainer} className="relative">
          <button
            onClick={scrollLeft}
            className={`absolute opacity-50 hover:opacity-100 transition-all
              duration-500 left-5 top-1/2 z-20 bg-white text-white p-4 rounded-full
              ${maxStep === 1 ? "hidden" : currentStep === 1 ? "hidden" : ""}`}
          >
            {/* <button onClick={scrollLeft} className="fixed opacity-50 hover:opacity-100 transition-all duration-500 left-5 top-[100px] z-20 bg-white text-white p-4 rounded-full"> */}
            <img src={arrow} className="w-4 h-4 rotate-[90deg]" alt="" />
          </button>
          <button
            onClick={scrollRight}
            className={`absolute opacity-50 hover:opacity-100 transition-all
              duration-500 right-5 top-1/2 z-20 bg-white text-white p-4 rounded-full
              ${
                maxStep === 1
                  ? "hidden"
                  : currentStep === maxStep
                  ? "hidden"
                  : ""
              }`}
          >
            <img src={arrow} className="w-4 h-4 rotate-[-90deg]" alt="" />
          </button>
        </div>

        <div
          className="flex transition-transform duration-300 bg-white "
          style={{ transform: `translateX(${translateX}px)` }}
        >
          {/* <div className="flex transition-transform duration-300 bg-white "> */}

          {comparison.map((product) => (
            <div className="min-w-[300px] max-w-[300px]" ref={item}>
              <ComparisonProductCard key={product.id} product={product} />
            </div>
          ))}
        </div>
      </div>

      <div
        ref={tableHeaderPlaceholder}
        className={`w-full h-[130px] ${isSticky ? "" : "hidden"}`}
        style={{ height: tableHeaderPlaceholder.current?.offsetHeight }}
      ></div>

      <div className="mt-4">
        {attributes.map((attribute, i) => (
          <div
            key={attribute}
            className={`w-full relative ${
              i % 2 === 0 ? "bg-gray-200" : "bg-white"
            }`}
          >
            <div className="absolute left-2 top-1 box-border min-w-[300px] z-10 uppercase text-xs text-colGreen font-semibold">
              {attribute}
            </div>
            <div
              className={`flex transition-transform duration-300 `}
              style={{ transform: `translateX(${translateX}px)` }}
            >
              {comparison.map((product) => (
                <div
                  key={product.id}
                  className="pt-6 pb-4 px-2 box-border min-w-[300px] "
                >
                  {product.attributes
                    ? Object.values(product.attributes).find(
                        (attr) => attr.name === attribute
                      )?.text || "N/A"
                    : "N/A"}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ComDetail;
