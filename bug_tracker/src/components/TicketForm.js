import React, { Fragment, useState, useLayoutEffect } from 'react';
import './Card.css';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { Button, Input } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import BugReportIcon from '@material-ui/icons/BugReport';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import TimelineIcon from '@material-ui/icons/Timeline';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import Spinner from './Spinner';

// Actions
import { createTicket } from '../actions/ticket';

const Modal = ({ user, currentProject, createTicket }) => {
  const [ticket, setTicket] = useState({
    title: '',
    description: '',
    type: 'Task',
    status: 'To-do',
    createdBy: user._id,
    comments: [],
    project: currentProject.id,

    editDescription: true,
    editTitle: true,
    typeOpen: false,
    statusOpen: false,
    assignee: 'Testuser',
    priority: 'Normal',
    firstLoad: false,
    redirect: false,
  });

  const {
    title,
    description,
    type,
    status,
    createdBy,
    project,

    editDescription,
    editTitle,
    typeOpen,
    statusOpen,
    assignee,
    priority,
    firstLoad,
    redirect,
  } = ticket;

  // Update ticket hander
  const saveTicketHandler = async () => {
    await createTicket({
      title,
      description,
      type,
      status,
      project,
    });

    setTicket({
      ...ticket,
      redirect: true,
    });
  };

  const close = () => {
    setTicket({
      ...ticket,
      redirect: true,
    });
  };

  const changeFieldText = (e) => {
    setTicket({
      ...ticket,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditToggle = () => {
    setTicket({
      ...ticket,
      editDescription: true,
    });
  };

  const handleTitleEditToggle = () => {
    setTicket({
      ...ticket,
      editTitle: true,
    });
  };

  const handleDoneEdit = () => {
    setTicket({
      ...ticket,
      editDescription: false,
      editTitle: false,
    });
  };

  const handleTypeClose = () => {
    setTicket({
      ...ticket,
      typeOpen: false,
    });
  };

  const handleTypeOpen = () => {
    setTicket({
      ...ticket,
      typeOpen: true,
    });
  };

  const handleTypeChange = (event) => {
    setTicket({
      ...ticket,
      [event.target.name]: event.target.value,
      typeOpen: false,
    });
  };

  const handleStatusClose = () => {
    setTicket({
      ...ticket,
      statusOpen: false,
    });
  };

  const handleStatusOpen = () => {
    setTicket({
      ...ticket,
      statusOpen: true,
    });
  };

  const handleStatusChange = (event) => {
    setTicket({
      ...ticket,
      [event.target.name]: event.target.value,
      statusOpen: false,
    });
  };

  const convertDate = (date) => {
    let newDate = new Date(date);
    return (newDate = newDate.toISOString().substring(0, 10));
  };

  if (redirect) {
    return <Redirect to='/home' />;
  }

  return (
    <div className='modal'>
      <Fragment>
        <div className='modal__background' onClick={() => close()} />

        <div className='modal__area'>
          <div className='modal__area-head'>
            <CloseIcon
              className='modal__close'
              onClick={() => close()}
              cursor='pointer'
            />
          </div>
          <div className='modal__area-body'>
            <div className='modal__area-left'>
              {/* TITLE (editable) */}
              <h2 className='modal__title'>Title</h2>
              <div className='modal__title-body'>
                <div className='modal__description-body__edit'>
                  <TextField
                    name='title'
                    className='modal__title-input'
                    id='outlined-basic'
                    label=''
                    variant='outlined'
                    margin='dense'
                    multiline='false'
                    value={title}
                    onChange={(e) => {
                      changeFieldText(e);
                    }}
                  />
                </div>
              </div>

              <div className='modal__container modal__type-container'>
                <h3 className='modal__type-title'>{type}</h3>
                {/* <Button className='modal__type-button' onClick={handleTypeOpen}>
                  Open the select
                </Button> */}
                <FormControl className='modal__type-form'>
                  <Select
                    name='type'
                    labelId='demo-controlled-open-select-label'
                    id='demo-controlled-open-select'
                    open={typeOpen}
                    onClose={handleTypeClose}
                    onOpen={handleTypeOpen}
                    value={type}
                    onChange={handleTypeChange}
                    className='type__select'
                  >
                    <MenuItem value={type}>{type}</MenuItem>
                    <MenuItem value={'Bug'}>
                      <BugReportIcon fontSize='small' /> Bug
                    </MenuItem>
                    <MenuItem value={'Task'}>
                      <AssignmentTurnedInIcon fontSize='small' /> Task
                    </MenuItem>
                    <MenuItem value={'Story'}>
                      <TimelineIcon fontSize='small' /> Story
                    </MenuItem>
                  </Select>
                </FormControl>
              </div>

              <div className='modal__container modal__description-container'>
                <h3 className='modal__description-title'>Description</h3>
                {/* description editable from state */}
                <span className='modal__description-body'>
                  <div className='modal__description-body__edit'>
                    <TextField
                      name='description'
                      className='modal__description-input'
                      id='outlined-basic'
                      label=''
                      variant='outlined'
                      fullWidth='true'
                      margin='dense'
                      multiline='true'
                      value={description}
                      onChange={(e) => {
                        changeFieldText(e);
                      }}
                    />
                  </div>
                </span>
              </div>
            </div>

            <div className='modal__area-right'>
              <div className='modal__status-container'>
                <FormControl
                  variant='filled'
                  classes='modal__status-form'
                  className='modal__status-form'
                >
                  <Select
                    name='status'
                    labelId='demo-controlled-open-select-label'
                    id='demo-controlled-open-select'
                    open={statusOpen}
                    onClose={handleStatusClose}
                    onOpen={handleStatusOpen}
                    value={status}
                    onChange={handleStatusChange}
                    className='status__select'
                    classes='status__select'
                  >
                    <MenuItem value={'To-do'}>To-do</MenuItem>
                    <MenuItem value={'In progress'}>In progress</MenuItem>
                    <MenuItem value={'QA'}>QA</MenuItem>
                    <MenuItem value={'Done'}>Done</MenuItem>
                  </Select>
                </FormControl>
              </div>

              <div className='modal__save'>
                <Button
                  onClick={() => saveTicketHandler()}
                  className='modal__btn modal__save-btn'
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    </div>
  );
};

Modal.propTypes = {
  user: PropTypes.object.isRequired,
  project: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  currentProject: state.project.currentProject,
  loading: state.ticket.loading,
});

export default connect(mapStateToProps, { createTicket })(Modal);
