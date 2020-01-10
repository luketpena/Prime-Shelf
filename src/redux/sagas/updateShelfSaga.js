import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* updateShelf(action){
  try {
    yield axios.put('/api/shelf/' + action.payload.id, action.payload.newItem)
    yield put({type: 'GET_ITEM'});
  } catch (error) {
   console.log(error); 
  }
}

function* updateShelfSaga() {
  yield takeLatest('UPDATE_ITEM', fetchUser);
}

export default updateShelfSaga;