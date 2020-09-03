import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Alert.css';

const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((alert) => (
    <div key={alert.id} className='alert'>
      {alert.msg}
    </div>
  ));

Alert.PropTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alertReducer,
});

export default connect(mapStateToProps)(Alert);
