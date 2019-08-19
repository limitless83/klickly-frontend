
import { connect } from 'react-redux';
import { deleteNotification } from '../redux/actions';
import NotificationUI from './NotificationUI'

const mapStateToProps = (state, props) => ({
  notifications: state.notifications,
});

const mapDispatchToProps = (dispatch) => ({
  deleteNotification(index) {
    dispatch(deleteNotification(index));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NotificationUI);
