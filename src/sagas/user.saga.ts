import {put, takeEvery, call, select} from 'redux-saga/effects';
import {
  SET_USER_ID,
  SET_AUTH_TOKEN,
  FORGOT_PASSWORD,
  USER_REGISTER,
  USER_LOGIN,
  SET_CURRENT_JOB_SUCCESS,
  END_CURRENT_JOB,
  END_CURRENT_JOB_SUCCESS,
  SET_CURRENT_JOB,
  SET_USER_LOGGED_IN,
  CHECK_EMAIL,
  GET_USER_JOBS_SUCCESS,
  GET_USER_JOBS,
  CHECK_STATUS,
  SET_REFRESH_AND_AUTH_TOKEN,
  SET_REFRESH_TOKEN,
  UPLOAD_DOCUMENTS,
  SET_USER,
  GET_ADMIN_LIST,
  SEND_MESSAGE,
  GET_PROFILE_PIC,
  GET_JOB_TYPES,
  UPLOAD_PROFILE_PIC,
  UPDATE_PROFILE_PIC,
  GET_CHAT_BY_USER,
  GET_COMPLETED_RECORDS,
  UPLOAD_INVOICE,
} from '../common/constants';

import UserAPi from '../apis/user.api';
export function* userRegister({payload, success, failed}) {
  try {
    const userInfo = yield select(state => state?.user?.registerDetails);
    const {
      tokens,
      user: {id},
    } = yield call(UserAPi.signUpAPI, userInfo);
    yield put({type: SET_USER_ID, payload: id});
    yield put({type: SET_AUTH_TOKEN, payload: tokens?.access});
    yield put({type: SET_REFRESH_TOKEN, payload: tokens?.refresh});
    success();
  } catch (error) {
    failed(error);
  }
}

export function* userLogin({payload, success, failed}) {
  try {
    const {user, tokens} = yield call(UserAPi.signInAPI, payload);
    if (user?.status === 'Active') {
      yield put({type: SET_USER, payload: user});
      yield put({type: SET_AUTH_TOKEN, payload: tokens.access});
      yield put({type: SET_REFRESH_TOKEN, payload: tokens?.refresh});

      yield put({type: SET_USER_LOGGED_IN});
      success();
    } else {
      const data = {
        message: 'user is not yet activated',
      };
      failed(data);
    }
  } catch (error) {
    failed(error);
  }
}

export function* getUserJobs({success, failed}) {
  try {
    const userId = yield select(state => state?.user?.user?._id);
    const {results} = yield call(UserAPi.getUserJobAPI, userId);
    yield put({type: GET_USER_JOBS_SUCCESS, payload: results});
  } catch (error) {}
}

export function* sendMessage({payload, success, failed}) {
  try {
    yield call(UserAPi.sendMessageAPI, payload);
    yield put({type: GET_CHAT_BY_USER, payload: payload?.from});
    success();
  } catch (error) {
    failed();
  }
}

export function* getProfilePic({success, failed}) {
  try {
    const picId = yield select(state => state?.user?.user?.profPic);
    console.log(picId, '555');
    const data = yield call(UserAPi.getProfilePicAPI, picId);
    console.log(data, '4455');
    success();
  } catch (error) {
    console.log(error, '44');
    failed();
  }
}

export function* getAdminList({success, failed}) {
  try {
    const data = yield call(UserAPi.getAdminListAPI);
    success(data);
  } catch (error) {}
}

export function* forgotPassword({payload, success, failed}) {
  try {
    yield call(UserAPi.forgotPasswordAPI, payload);
    success();
  } catch (error) {
    failed(error);
  }
}

export function* checkStatus({payload, success, failed}) {
  try {
    const data = yield call(UserAPi.checkStatusAPI, payload.userId);
    success(data);
  } catch (error) {
    failed(error);
  }
}

export function* setRefreshAndAuthToken({payload, success}) {
  try {
    const {access, refresh} = payload;
    yield put({type: SET_AUTH_TOKEN, payload: access});
    yield put({type: SET_REFRESH_TOKEN, payload: refresh});
    success();
  } catch (error) {
    console.log(error);
  }
}

export function* checkEmail({payload, success, failed}) {
  try {
    yield call(UserAPi.checkEmailAPi, payload);
    success();
  } catch (error) {
    console.log(error);
    failed(error);
  }
}

export function* setCurrentJob({payload, success, failed}) {
  try {
    const data = yield call(UserAPi.setCurrentJob, payload);
    yield put({type: SET_CURRENT_JOB_SUCCESS, payload: data});
    success();
  } catch (error) {
    failed(error);
  }
}

export function* endCurrentJob({payload, success, failed}) {
  try {
    const {data, jobId} = payload;
    yield call(UserAPi.endCurrentJob, {data, jobId});
    yield put({type: END_CURRENT_JOB_SUCCESS});
    success();
  } catch (error) {
    console.log(error);
    failed(error);
  }
}

export function* uploadDocuments({payload, success, failed}) {
  try {
    yield call(UserAPi.uploadDocuments, payload);
    success();
  } catch (error) {
    failed(error);
  }
}

export function* getJobTypes({payload, success, failed}) {
  try {
    const {status} = payload;
    const userId = yield select(state => state?.user?.user?._id);
    const data = yield call(UserAPi.getJobTypesAPI, {userId, status});
    success(data);
  } catch (error) {
    failed(error);
  }
}

export function* getCompletedRecordsByUser({payload, success, failed}) {
  try {
    const userId = yield select(state => state?.user?.user?._id);
    const data = yield call(UserAPi.getCompletedRecordsByAPI, {
      ...payload,
      worker: userId,
    });
    success(data);
  } catch (error) {
    failed(error);
  }
}

export function* uploadProfilePic({payload, success, failed}) {
  try {
    const data = yield call(UserAPi.uploadProfilePicAPI, payload);
    yield put({type: UPDATE_PROFILE_PIC, payload: data[0]?.docKey});

    success(data);
  } catch (error) {
    failed(error);
  }
}

export function* uploadInvoice({payload, success, failed}) {
  try {
    yield call(UserAPi.uploadInvoiceAPI, payload);
    success();
  } catch (error) {
    failed(error);
  }
}

function* userSaga() {
  yield takeEvery(USER_REGISTER, userRegister);
  yield takeEvery(USER_LOGIN, userLogin);
  yield takeEvery(FORGOT_PASSWORD, forgotPassword);
  yield takeEvery(CHECK_STATUS, checkStatus);
  yield takeEvery(CHECK_EMAIL, checkEmail);
  yield takeEvery(GET_USER_JOBS, getUserJobs);
  yield takeEvery(SET_CURRENT_JOB, setCurrentJob);
  yield takeEvery(END_CURRENT_JOB, endCurrentJob);
  yield takeEvery(UPLOAD_DOCUMENTS, uploadDocuments);
  yield takeEvery(GET_ADMIN_LIST, getAdminList);
  yield takeEvery(SEND_MESSAGE, sendMessage);
  yield takeEvery(GET_PROFILE_PIC, getProfilePic);
  yield takeEvery(GET_JOB_TYPES, getJobTypes);
  yield takeEvery(GET_COMPLETED_RECORDS, getCompletedRecordsByUser);
  yield takeEvery(UPLOAD_PROFILE_PIC, uploadProfilePic);
  yield takeEvery(SET_REFRESH_AND_AUTH_TOKEN, setRefreshAndAuthToken);
  yield takeEvery(UPLOAD_INVOICE, uploadInvoice);
}

export default userSaga;
