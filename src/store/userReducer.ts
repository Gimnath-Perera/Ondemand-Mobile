import {
  SET_REGISTER_DETAILS,
  SET_USER_LOGGED_IN,
  SET_USER_LOGGED_OUT,
  SET_USER_ID,
  SET_USER,
  GET_USER_JOBS_SUCCESS,
  SET_CURRENT_JOB_SUCCESS,
  END_CURRENT_JOB_SUCCESS,
  UPDATE_PROFILE_PIC,
} from '../common/constants';

const initialState = {
  registerDetails: null,
  userId: null,
  isUserLogged: false,
  user: null,
  jobs: [],
  currentJob: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_REGISTER_DETAILS:
      return {
        ...state,
        registerDetails: {...state.registerDetails, ...action.payload},
      };
    case SET_USER_ID:
      return {
        ...state,
        userId: action.payload,
      };
    case SET_CURRENT_JOB_SUCCESS:
      return {
        ...state,
        currentJob: action.payload,
      };
    case UPDATE_PROFILE_PIC:
      return {
        ...state,
        user: {...state.user, profPic: action.payload},
      };

    case END_CURRENT_JOB_SUCCESS:
      return {
        ...state,
        currentJob: null,
      };
    case GET_USER_JOBS_SUCCESS:
      return {
        ...state,
        jobs: action.payload,
      };
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case SET_USER_LOGGED_OUT:
      return {
        ...state,
        isUserLogged: false,
      };
    case SET_USER_LOGGED_IN:
      return {
        ...state,
        isUserLogged: true,
      };
    default:
      return state;
  }
};
