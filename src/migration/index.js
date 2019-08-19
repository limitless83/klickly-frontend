import { connect } from 'react-redux';
import ShopifyImportMain from './ShopifyImportMain';
import { setStoreName, addNotification } from '../redux/actions';

const mapStateToProps = (state, props) => ({
  notifications: state.notifications,
  storeName: state.storeName,
});

const mapDispatchToProps = (dispatch) => ({
  setStoreName(storeName) {
    dispatch(setStoreName(storeName));
  },
  addNotification(notifications) {
    dispatch(addNotification(notifications));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopifyImportMain);
