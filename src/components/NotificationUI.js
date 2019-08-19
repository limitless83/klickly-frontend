import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'react-bootstrap';
import uuid from 'uuid';

const NotificationUI = ({ notifications, deleteNotification }) => (
  <>
    {notifications.map((notification, index) => (
      <Alert
        key={uuid()}
        variant={(notification.type === 'error') ? 'danger' : 'info'}
        onClose={() => {
          deleteNotification(index)
        }}
        dismissible
      >
        {notification.message}
      </Alert>
    ))}
  </>
);

NotificationUI.propTypes = {
  notifications: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  deleteNotification: PropTypes.func.isRequired,
};

export default NotificationUI;
