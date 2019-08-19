import C from './constants';

export const addNotification = (message) => ({
  type: C.ADD_NOTIFICATION,
  payload: message,
});

export const deleteNotification = (index) => ({
  type: C.DELETE_NOTIFICATION,
  payload: index,
});

export const setStoreName = (storeName) => ({
  type: C.SET_STORE_NAME,
  payload: storeName,
});
