import React, { useEffect, useState } from 'react';

import { useLocation } from 'react-router-dom';

import { scrollToTop } from '@/shared/lib/scrollToTop';
import {CategorySwitcher} from '@/widgets/category-switcher';
import Advantages from '@components/Home/Advantages';
import Brands from '@components/Home/Brands';
import Promotions from '@components/Home/Promotions';

import { fetchSearchResults } from '../../api/searchProducts';

import {SRContent} from './SRContent';
import {SRSidebar} from './SRSidebar';

import type { ProductListCategoryChain } from '@/entities/category';

const SRMain = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<ProductListCategoryChain[]>([]);
  const [open, setOpen] = useState(false);
  const [filtersValue, setFiltersValue] = useState({
    highRating: true,
    brands: [],
    tags: [],
    min_price: 1,
    max_price: 2,
    category_id: '',
  });

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search');

  const handleCategories = (id: string | number) => {
    setFiltersValue({ ...filtersValue, category_id: String(id) });
  };

  const handlePagination = async (e, p) => {
    scrollToTop();
    const { success, data } = await fetchSearchResults(
      searchQuery,
      filtersValue,
      p
    );

    if (success) {
      setProducts(data);
    } else {
      setProducts(data);
    }
  };

  useEffect(() => {
    const handleSearchResults = async () => {
      setIsLoading(true);
      const { success, data } = await fetchSearchResults(
        searchQuery,
        filtersValue
      );
      if (success) {
        console.log('data');
        console.log(data);
        setProducts(data);
        setIsLoading(false);
      } else {
        setProducts(data);
        setIsLoading(false);
      }
    };
    handleSearchResults();
  }, [searchQuery, filtersValue]);

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <div className="content lining-nums proportional-nums">
      <div className="bg-gray-100 rounded-lg p-3 mm:p-4 mb-8 mt-4">
        <h3
          className={`font-semibold text-2xl mm:text-4xl text-colBlack ${categories.length > 0 ? 'pb-2' : 'pb-5'}`}
        >
          {searchQuery}
        </h3>
        <CategorySwitcher
          categories={categories}
          selectedCategory={filtersValue.category_id}
          onCategoryChange={handleCategories}
        />
      </div>
      <div className="flex pb-10 min-h-[420px]">
        <SRSidebar
          filtersValue={filtersValue}
          setFiltersValue={setFiltersValue}
          setCategories={setCategories}
          searchQuery={searchQuery}
          open={open}
          setOpen={setOpen}
          setProducts={setProducts}
        />
        <SRContent
          products={products}
          isLoading={isLoading}
          handlePagination={handlePagination}
          setOpen={setOpen}
        />
      </div>
      <Promotions />
      <Brands />
      <Advantages />
    </div>
  );
};

export default SRMain;
