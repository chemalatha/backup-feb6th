import { put, takeLatest, all } from 'redux-saga/effects';
function* fetchNews() {
  const json = yield fetch('https://ngapi4.herokuapp.com/api/getProducts')
        .then(response => response.json(), );    
  yield put({ type: "NEWS_RECEIVED", json: json, });
}
function* actionWatcher() {
     yield takeLatest('GET_NEWS', fetchNews)
}
export default function* rootSaga() {
   yield all([
   actionWatcher(),
   ]);
}