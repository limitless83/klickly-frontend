import { parseQuery } from '../functions/common';

const getStore = (storeName, addNotification) => fetch(`${process.env.REACT_APP_API}/api/store?storeName=${storeName}`)
  .then((res) => res.json())
  .catch((error) => {
    addNotification({
      type: 'error',
      message: error.toString(),
    });
    return false;
  });

const createStore = (body, addNotification) => fetch(
  `${process.env.REACT_APP_API}/api/store`,
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  },
)
  .catch((error) => {
    addNotification({
      type: 'error',
      message: error.toString(),
    });
    return false;
  });

const migrate = (storeName, addNotification) => fetch(
  `${process.env.REACT_APP_API}/api/migrate?storeName=${storeName}`,
  {
    method: 'POST',
  },
)
  .then((res) => res.json())
  .then(() => true)
  .catch((error) => {
    addNotification({
      type: 'error',
      message: error.toString(),
    });
    return false;
  });

const getShoptifyCode = (storeName, addNotification) => {
  let url = `https://${storeName}.myshopify.com/admin/oauth/authorize?`;
  url += `client_id=${process.env.REACT_APP_SHOPIFY_API_KEY}&`;
  url += `scope=${process.env.REACT_APP_SHOPIFY_SCOPE}&`;
  url += `redirect_uri=${process.env.REACT_APP_SHOPIFY_REDIRECT_URI}`;

  const win = window.open(url, storeName, 'height=800,width=600');
  if (win) win.focus();
  const pollTimer = window.setInterval(() => {
    try {
      const { href } = win.location;
      if (!!win && href.indexOf(process.env.REACT_APP_SHOPIFY_REDIRECT_URI) !== -1) {
        window.clearInterval(pollTimer);
        win.close();
        const result = parseQuery(href.replace(process.env.REACT_APP_SHOPIFY_REDIRECT_URI, ''));
        return createStore(result, addNotification)
          .then(() => migrate(storeName, addNotification))
      }
    } catch (err) {
      window.clearInterval(pollTimer);
      addNotification({
        type: 'error',
        message: err.toString(),
      });
      return false;
    }
  }, 500);
};

const deleteStore = (id, addNotification) => fetch(
  `${process.env.REACT_APP_API}/api/store/${id}`,
  { method: 'DELETE' },
)
  .catch((error) => {
    addNotification({
      type: 'error',
      message: error.toString(),
    });
    return false;
  });

const processMigration = (addNotification) => async (storeName) => {
  if (storeName === '') {
    addNotification({
      type: 'error',
      message: 'Store name cannot be empty.',
    });
    return false;
  }

  const store = await getStore(storeName, addNotification);
  let createNew = (store.error) ? true : false;
  // If there's a store without accessToken, remove it and create new.
  if (store.accessToken && store.accessToken === 'false') {
    deleteStore(store._id);
    createNew = true;
  }

  if (createNew) {
    return getShoptifyCode(storeName, addNotification);
  }

  const response = await migrate(storeName);
  if (response) {
    addNotification({
      message: 'Migrate initiated successfully',
      type: 'notification',
    });
  }


  return response;
};

export default processMigration;
