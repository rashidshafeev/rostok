import { request } from './axios';

// import { PayloadAction } from "@reduxjs/toolkit";
import { delay, put, takeEvery } from "redux-saga/effects";
import {
    fetchProductSuccess,
    fetchProductFail
} from "../slices/productsSlice";



function* workFetchProductStart(action) {
    try {
        console.log(action)
        const params = action.payload
        const products = yield request.get(`api/Products/item?id=${params}`)
        yield delay(500)
        yield put(fetchProductSuccess(products.data.data))
    } catch (error) {
        console.log(error)
        yield put(fetchProductFail())
    }

}


function* productsSaga() {
    yield takeEvery('products/fetchProductStart', workFetchProductStart)
}

export default productsSaga
