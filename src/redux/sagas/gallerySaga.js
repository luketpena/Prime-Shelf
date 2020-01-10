import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* galleryItem(action) {
    try {
        const response = yield axios.get('/api/shelf');
        yield put({ type: `SET_GALLERY`, payload: response.data})
    }catch (error ) {
        console.log('error with gallery saga', error);
    }
}

function* gallerySaga() {
    yield takeLatest('GET_ITEM', galleryItem);
}

export default gallerySaga;