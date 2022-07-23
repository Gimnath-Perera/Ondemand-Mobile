import {SET_AUTH_TOKEN, SET_REFRESH_TOKEN} from '../common/constants';

const initialState = {
  isAuthenticated: false,
  token: null,
  refreshToken: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case SET_REFRESH_TOKEN:
      return {
        ...state,
        refreshToken: action.payload,
      };

    default:
      return state;
  }
};
