import { request } from './axios';

// import { PayloadAction } from "@reduxjs/toolkit";
import { delay, put, takeEvery } from "redux-saga/effects";
import {
    fetchCategoryTreeSuccess,
    fetchCategoryTreeFail
} from "../slices/categoryTreeSlice";


function* workFetchCategoryTreeStart() {
    console.log("fire1")
    try {
        const categories = yield request.get('api/Products/categoryTree')
        yield delay(500)
        yield put(fetchCategoryTreeSuccess(categories.data))
    } catch (error) {
        console.log(error)
        yield put(fetchCategoryTreeFail())
    }

}

function* workFetchProductStart() {
    try {
        const categories = yield request.get('api/Products/categoryTree')
        yield delay(500)
        yield put(fetchProductSuccess(categories.data))
    } catch (error) {
        console.log(error)
        yield put(fetchProductTreeFail())
    }

}


function* categoryTreeSaga() {
    yield takeEvery('categoryTree/fetchCategoryTreeStart', workFetchCategoryTreeStart)
    yield takeEvery('categoryTree/fetchProductStart', workFetchProductStart)
}

export default categoryTreeSaga

// export const fetchCatalogOfProducts = async (dispatch) => {
//     dispatch(fetchCatalogStart());
//     try {
//       const res = await request.get('api/Products/categoryTree');
//       dispatch(fetchCatalogSuccess(res?.data));
//     } catch (error) {
//       dispatch(fetchCatalogFailure(error));
//     }
//   };
  
//   export const fetchProductsByCategory = async (id, page) => {
//     try {
//       const body = new URLSearchParams({
//         parent_category: id,
//         page: page,
//       });
  
//       const res = await request.get('api/Products/variantsByCategory', {
//         params: body,
//       });
//       return { success: true, data: res?.data?.data };
//     } catch (error) {
//       return { success: false };
//     }
//   }; 
  
//   export const fetchCategoryTree = async (id, page) => {
//     try {
//       const body = new URLSearchParams({
//         category_id: id,
//         page: page,
//       });
  
//       const res = await request.get('api/Products/categoryTree', {
//         params: body,
//       });
//       return { success: true, data: res?.data };
//     } catch (error) {
//       return { success: false };
//     }
//   };
  
//   export const fetchCategoryProducts = async (category_id, filters) => {
//     try {
//       const brandsParam =
//         filters?.brands?.length > 0 ? `["${filters?.brands.join('","')}"]` : '';
//       const tagsParam =
//         filters?.tags?.length > 0 ? `["${filters?.tags.join('","')}"]` : '';
//       const body = new URLSearchParams({
//         category_id: category_id,
//         brands: brandsParam || '',
//         max_price: filters?.max_price || '',
//         min_price: filters?.min_price || '',
//         // min_raiting: !filters?.highRating ? 4 : '',
//         // max_raiting: filters?.highRating ? 5 : '',
//         tags: tagsParam || '',
//       });
  
//       const res = await request.get('api/Products/variants', {
//         params: body,
//       });
  
//       return { success: true, data: res?.data?.data };
//     } catch (error) {
//       return { success: false };
//     }
//   };
  
//   export const fetchAllCategoryProducts = async (category_id, filters) => {
//     try {
//       const filtersString = Object.entries(filters)
//         // eslint-disable-next-line no-unused-vars
//         .filter(([_, values]) => values.length > 0)
//         .map(([filterId, values]) => `"${filterId}":${JSON.stringify(values)}`)
//         .join(',');
  
//       const queryParams = {
//         category_id: category_id,
//       };
  
//       if (filtersString.length > 0) {
//         queryParams.filters = `{${filtersString}}`;
//       }
  
//       const res = await request.get('api/Products/variants', {
//         params: queryParams,
//       });
  
//       return { success: true, data: res?.data?.data };
//     } catch (error) {
//       return { success: false };
//     }
//   };
  
//   export const fetchCategoryProductsBySort = async (category_id, sort) => {
//     try {
//       const body = new URLSearchParams({
//         category_id: category_id,
//         orderBy: sort?.orderBy,
//         sortOrder: sort?.sortOrder,
//       });
  
//       const res = await request.get('api/Products/variants', {
//         params: body,
//       });
  
//       return { success: true, data: res?.data?.data };
//     } catch (error) {
//       return { success: false };
//     }
//   };