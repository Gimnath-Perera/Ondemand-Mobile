import {put, takeEvery, call, select} from 'redux-saga/effects';
import {GET_CHAT_BY_USER, SET_CHAT_BY_USER} from '../common/constants';

import UserAPi from '../apis/user.api';

export function* getChatByUser({payload}) {
  try {
    const data = yield call(UserAPi.getChatByUserAPI, payload);
    yield put({type: SET_CHAT_BY_USER, payload: data});
  } catch (error) {}
}

function* userSaga() {
  yield takeEvery(GET_CHAT_BY_USER, getChatByUser);
}

export default userSaga;
