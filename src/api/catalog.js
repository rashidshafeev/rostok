/* eslint-disable no-unused-vars */
import { request } from './axios';

export const fetchCategoryProductsFilter = async (category_id, filters) => {
  try {
    const brandsParam =
      filters?.brands?.length > 0 ? `["${filters?.brands.join('","')}"]` : '';
    const tagsParam =
      filters?.tags?.length > 0 ? `["${filters?.tags.join('","')}"]` : '';
    const body = new URLSearchParams({
      category_id: category_id,
      brands: brandsParam || '',
      max_price: filters?.max_price || '',
      min_price: filters?.min_price || '',
      // min_raiting: !filters?.highRating ? 4 : '',
      // max_raiting: filters?.highRating ? 5 : '',
      tags: tagsParam || '',
    });

    console.log(brandsParam);

    const res = await request.get('api/Products/variants', {
      params: body,
    });

    return { success: true, data: res?.data };
  } catch (error) {
    return { success: false };
  }
};

export const fetchAllCategoryProducts = async (
  slug,
  filters,
  filtersTwo,
  searchQuery
) => {
  try {
    const queryParams = {
      category_id: slug,
    };

    const filtersString = Object.entries(filters)
      .filter(([_, values]) => values.length > 0)
      .map(([filterId, values]) => `"${filterId}":${JSON.stringify(values)}`)
      .join(',');

    if (filtersString.length > 0) {
      queryParams.filters = `{${filtersString}}`;
    }

    if (window.innerWidth < 768 && filtersTwo) {
      if (filtersTwo.tags && filtersTwo.tags.length > 0) {
        queryParams.tags = JSON.stringify(filtersTwo.tags);
      }
      if (filtersTwo.min_price) {
        queryParams.min_price = filtersTwo.min_price;
      }
      if (filtersTwo.max_price) {
        queryParams.max_price = filtersTwo.max_price;
      }
      if (filtersTwo.brands && filtersTwo.brands.length > 0) {
        queryParams.brands = JSON.stringify(filtersTwo.brands);
      }
    }

    const res = await request.get(
      `api/Products/variants?search=${searchQuery || ''}`,
      {
        params: queryParams,
      }
    );

    return { success: true, data: res?.data };
  } catch (error) {
    return { success: false };
  }
};

export const fetchCategoryProductsBySort = async (category_id, sort) => {
  try {
    const body = new URLSearchParams({
      category_id: category_id,
      orderBy: sort?.orderBy,
      sortOrder: sort?.sortOrder,
    });

    const res = await request.get('api/Products/variants', {
      params: body,
    });

    return { success: true, data: res?.data };
  } catch (error) {
    return { success: false };
  }
};
