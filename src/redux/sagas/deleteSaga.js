import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* deleteGalleryItem(action) {
    try {
        yield axios.delete('/api/shelf/' + action.payload);
        yield put({ type: 'GET_ITEM'})
    }catch (error ) {
        console.log('error with deleteGalleryItem saga', error);
    }
}

function* deleteItemSaga() {
    yield takeLatest('DEL_ITEM', deleteGalleryItem);
}

export default deleteItemSaga;