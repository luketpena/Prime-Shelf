import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* userGalleryItem(action) {
    try {
        const response = yield axios.get('/api/shelf/' + action.payload);
        yield put({ type: `SET_GALLERYID`, payload: response.data})
    }catch (error ) {
        console.log('error with userGalleryItem saga', error);
    }
}

function* galleryidSaga() {
    yield takeLatest('GET_GALLERYID', userGalleryItem);
}

export default galleryidSaga;