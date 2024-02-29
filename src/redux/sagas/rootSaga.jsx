import { all } from 'redux-saga/effects'

import userSaga from './userSaga'
import categoryTreeSaga from './categoryTreeSaga'
import productsSaga from './productsSaga'
import cartSaga from './cartSaga'


function* rootSaga() {
    yield all([
        userSaga(),
        categoryTreeSaga(),
        productsSaga(),
        cartSaga()
    ])
}

export default rootSaga