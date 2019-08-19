import React from 'react';
import PropTypes from 'prop-types';
import processMigration from './Functions';

const ShopifyImportMain = ({ storeName, setStoreName, addNotification, history }) => (
  <>
    <h3>Shopify Product Migration</h3>
    <input
      type="text"
      onChange={({ target: { value } }) => setStoreName(value)}
      placeholder="Shopify Store Name"
    />
    <button
      type="button"
      onClick={async () => {
        const response = await processMigration(addNotification)(storeName);
        if (response) {
          history.push(`/products/${storeName}`);
        }
      }}
    >
      Import
    </button>
  </>
);

ShopifyImportMain.propTypes = {
  storeName: PropTypes.string.isRequired,
  setStoreName: PropTypes.func.isRequired,
  addNotification: PropTypes.func.isRequired,
  history: PropTypes.shape({}).isRequired,
};

export default ShopifyImportMain;
