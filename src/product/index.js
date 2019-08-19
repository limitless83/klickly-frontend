import { connect } from 'react-redux';
import { addNotification } from '../redux/actions';
import Product from './ProductUI';

const mapStateToProps = (state, props) => ({
  notifications: state.notifications,
});

const mapDispatchToProps = (dispatch) => ({
  addNotification(notifications) {
    dispatch(addNotification(notifications));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Product);
