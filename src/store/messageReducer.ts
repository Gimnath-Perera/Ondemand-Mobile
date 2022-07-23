import {SET_CHAT_BY_USER} from '../common/constants';

const initialState = {
  messages: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CHAT_BY_USER:
      return {
        ...state,
        messages: action.payload,
      };

    default:
      return state;
  }
};
