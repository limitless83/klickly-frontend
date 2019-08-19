import { combineReducers } from 'redux';
import C from './constants';

const notifications = (state = [], action) => {
  switch (action.type) {
    case C.ADD_NOTIFICATION:
      return [
        ...state,
        action.payload,
      ];
    case C.DELETE_NOTIFICATION:
      return state.filter((message, i) => i !== action.payload);
    default:
      return state;
  }
};

const storeName = (state = '', action) => {
  return (action.type === C.SET_STORE_NAME)
    ? action.payload
    : state;
};

export default combineReducers({
  notifications,
  storeName,
});
