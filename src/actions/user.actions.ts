import {
  USER_LOGIN,
  USER_REGISTER,
  SET_REGISTER_DETAILS,
  FORGOT_PASSWORD,
  CHECK_EMAIL,
  CHECK_STATUS,
  SET_USER_LOGGED_OUT,
  GET_USER_JOBS,
  SET_CURRENT_JOB,
  END_CURRENT_JOB,
  UPLOAD_DOCUMENTS,
  SET_REFRESH_AND_AUTH_TOKEN,
  GET_ADMIN_LIST,
  SEND_MESSAGE,
  GET_PROFILE_PIC,
  GET_JOB_TYPES,
  UPLOAD_PROFILE_PIC,
  GET_CHAT_BY_USER,
  GET_COMPLETED_RECORDS,
  UPLOAD_INVOICE,
} from '../common/constants';

export const userLogin = (
  payload: Object,
  success: Function,
  failed: Function,
) => ({
  type: USER_LOGIN,
  payload,
  success,
  failed,
});

export const uploadDocuments = (
  payload: Object,
  success: Function,
  failed: Function,
) => ({
  type: UPLOAD_DOCUMENTS,
  payload,
  success,
  failed,
});

export const uploadInvoice = (
  payload: Object,
  success: Function,
  failed: Function,
) => ({
  type: UPLOAD_INVOICE,
  payload,
  success,
  failed,
});

export const sendMessage = (
  payload: Object,
  success: Function,
  failed: Function,
) => ({
  type: SEND_MESSAGE,
  payload,
  success,
  failed,
});

export const setCurrentJob = (
  payload: Object,
  success: Function,
  failed: Function,
) => ({
  type: SET_CURRENT_JOB,
  payload,
  success,
  failed,
});

export const endCurrentJob = (
  payload: Object,
  success: Function,
  failed: Function,
) => ({
  type: END_CURRENT_JOB,
  payload,
  success,
  failed,
});

export const userRegister = (
  payload: Object,
  success: Function,
  failed: Function,
) => ({
  type: USER_REGISTER,
  payload,
  success,
  failed,
});

export const forgotPassword = (
  payload: Object,
  success: Function,
  failed: Function,
) => ({
  type: FORGOT_PASSWORD,
  payload,
  success,
  failed,
});

export const getProfilePic = (success: Function, failed: Function) => ({
  type: GET_PROFILE_PIC,
  success,
  failed,
});

export const setRegiserDetails = (payload: Object) => ({
  type: SET_REGISTER_DETAILS,
  payload,
});

export const getUserJobs = () => ({
  type: GET_USER_JOBS,
});

export const getAdminList = (success: Function, failed: Function) => ({
  type: GET_ADMIN_LIST,
  success,
  failed,
});

export const getChatByUser = (payload: Object) => ({
  type: GET_CHAT_BY_USER,
  payload,
});

export const getCompletedRecordsByUser = (
  payload: Object,
  success: Function,
  failed: Function,
) => ({
  type: GET_COMPLETED_RECORDS,
  success,
  failed,
  payload,
});

export const setUserLoggedOut = (payload: Object) => ({
  type: SET_USER_LOGGED_OUT,
  payload,
});

export const setRefreshAndAuthToken = (payload: Object, success: Function) => ({
  type: SET_REFRESH_AND_AUTH_TOKEN,
  payload,
  success,
});

export const checkStatus = (
  payload: Object,
  success: Function,
  failed: Function,
) => ({
  type: CHECK_STATUS,
  payload,
  success,
  failed,
});

export const checkEmail = (
  payload: Object,
  success: Function,
  failed: Function,
) => ({
  type: CHECK_EMAIL,
  payload,
  success,
  failed,
});

export const getJobTypes = (
  payload: Object,
  success: Function,
  failed: Function,
) => ({
  type: GET_JOB_TYPES,
  payload,
  success,
  failed,
});

export const uploadProfilePic = (
  payload: Object,
  success: Function,
  failed: Function,
) => ({
  type: UPLOAD_PROFILE_PIC,
  payload,
  success,
  failed,
});
