import { takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* shelfItem(action) {
    try {
        yield axios.post('/api/shelf', action.payload);
        //update a put here
    }catch (error ) {
        console.log('error with shelf saga', error);
    }
}
function* shelfSaga() {
    yield takeLatest('SET_ITEM', shelfItem);
}

export default shelfSaga;