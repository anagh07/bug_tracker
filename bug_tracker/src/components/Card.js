import React, { Fragment, useState } from 'react';
import './Card.css';
import AssignmentIcon from '@material-ui/icons/Assignment';
import BugReportIcon from '@material-ui/icons/BugReport';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import TimelineIcon from '@material-ui/icons/Timeline';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Modal from './Modal';
import Spinner from './Spinner';

// Actions
import { loadTicket } from '../actions/ticket';

const Card = (props) => {
  const [data, setData] = useState({
    isOpen: false,
    modalLoading: false,

    id: props.ticket._id,
    title: props.ticket.title,
    description: props.ticket.description,
    type: props.ticket.type,
    status: props.ticket.status,
    createdBy: props.ticket.createdBy,
    comments: props.ticket.comments,
    project: props.ticket.project,
  });

  const {
    isOpen,
    modalLoading,

    id,
    title,
    description,
    type,
    status,
    createdBy,
    comments,
    project,
  } = data;

  let updatedAt = new Date(props.ticket.updatedAt);
  updatedAt = updatedAt.toISOString().substring(0, 10);
  let createdAt = new Date(props.ticket.createdAt);
  createdAt = createdAt.toISOString().substring(0, 10);

  const modalOpen = () => {
    setData({
      ...data,
      isOpen: true,
      modalLoading: false,
    });
  };

  const open = async (id) => {
    setData({
      ...data,
      modalLoading: true,
    });
    await props.loadTicket(id);
    modalOpen();
  };

  const close = () => {
    setData({
      ...data,
      isOpen: false,
    });
  };

  if (isOpen) {
    return modalLoading ? (
      <Spinner />
    ) : (
      <Modal
        ticketId={props.ticket._id}
        close={close}
        onTicketUpdate={props.onTicketUpdate}
      />
    );
  }

  if (props.ticket.type === 'Task') {
    return (
      <div className='card' onClick={(e) => open(id)}>
        <div className='card__info'>
          <p className='card__title'>{props.ticket.title}</p>
        </div>
        <div className='card__subtitle'>
          <AssignmentIcon fontSize='small' />
          <span className='card__date'>{updatedAt}</span>
        </div>
      </div>
    );
  } else if (props.ticket.type === 'Bug') {
    return (
      <div className='card' onClick={() => open(id)}>
        <div className='card__info'>
          <p className='card__title'>{props.ticket.title}</p>
        </div>
        <div className='card__subtitle'>
          <BugReportIcon fontSize='small' />
          <span className='card__date'>{updatedAt}</span>
        </div>
      </div>
    );
  } else if (props.ticket.type === 'Story') {
    return (
      <div className='card' onClick={() => open(id)}>
        <div className='card__info'>
          <p className='card__title'>{props.ticket.title}</p>
        </div>
        <div className='card__subtitle'>
          <TimelineIcon fontSize='small' />
          <span className='card__date'>{updatedAt}</span>
        </div>
      </div>
    );
  }
};
// Card.propTypes = {
//   updateTicket: PropTypes.func.isRequired,
// };

const mapStateToProps = (state) => ({
  user: state.auth.user,
  loading: state.ticket.loading,
});

export default connect(mapStateToProps, { loadTicket })(Card);
