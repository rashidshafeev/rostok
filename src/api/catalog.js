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

    const res = await request.get('api/Products/variants', {
      params: body,
    });

    return { success: true, data: res?.data };
  } catch (error) {
    return { success: false };
  }
};

export const fetchAllCategoryProducts = async (slug, filters) => {
  try {
    const filtersString = Object.entries(filters)
      // eslint-disable-next-line no-unused-vars
      .filter(([_, values]) => values.length > 0)
      .map(([filterId, values]) => `"${filterId}":${JSON.stringify(values)}`)
      .join(',');

    const queryParams = {
      category_id: slug,
    };

    if (filtersString.length > 0) {
      queryParams.filters = `{${filtersString}}`;
    }

    const res = await request.get('api/Products/variants', {
      params: queryParams,
    });

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
