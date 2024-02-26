import { all } from 'redux-saga/effects'

import userSaga from './userSaga'
import catalogSaga from './catalogSaga'
import cartSaga from './cartSaga'


function* rootSaga() {
    // yield all([
    //     userSaga(),
    //     catalogSaga(),
    //     cartSaga()
    // ])
}

export default rootSaga