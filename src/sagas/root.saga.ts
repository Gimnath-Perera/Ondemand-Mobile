/* istanbul ignore file */
import {all} from 'redux-saga/effects';

import UserSaga from './user.saga';
import MessageSaga from './message.saga';

export default function* rootSaga() {
  yield all([UserSaga(), MessageSaga()]);
}
