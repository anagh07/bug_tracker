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

import Comment from './Comment';
import Spinner from './Spinner';

// Actions
import { loadTicket, updateTicket, addComment, deleteComment } from '../actions/ticket';

const Modal = ({
  loadTicket,
  currentTicket,
  ticketId,
  close,
  onTicketUpdate,
  user,
  loading,
  updateTicket,
  addComment,
  deleteComment,
}) => {
  const [ticket, setTicket] = useState({
    title: currentTicket.title,
    description: currentTicket.description,
    type: currentTicket.type,
    status: currentTicket.status,
    createdBy: currentTicket.createdBy,
    comments: currentTicket.comments,
    project: currentTicket.project,
    id: currentTicket.id,
    editDescription: false,
    commentInput: '',
    typeOpen: false,
    statusOpen: false,
    assignee: 'Testuser',
    priority: 'Normal',
    firstLoad: true,
    deletingComment: false,
  });

  const {
    title,
    description,
    type,
    status,
    createdBy,
    comments,
    project,
    id,

    editDescription,
    commentInput,
    typeOpen,
    statusOpen,
    assignee,
    priority,
    firstLoad,
    deletingComment,
  } = ticket;

  // Delete comment
  const handleCommentDelete = async (id) => {
    // console.log(id);
    await deleteComment(ticketId, id);
    await loadTicket(ticketId);
    let newComments = comments.filter((comment) => comment._id.toString() !== id);
    setTicket({
      ...ticket,
      comments: newComments,
    });
  };

  // Update ticket hander
  const updateTicketHandler = async () => {
    await updateTicket(ticketId, title, description, type, status, comments);
    close();
    onTicketUpdate();
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

  const handleDoneEdit = () => {
    setTicket({
      ...ticket,
      editDescription: false,
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

  const submitComment = async () => {
    await addComment(ticketId, user._id, user.name, commentInput);
    await loadTicket(ticketId);
    setTicket({
      ...ticket,
      comments: [
        ...comments,
        {
          createdAt: new Date().toISOString(),
          user: user._id,
          text: commentInput,
          username: user.name,
        },
      ],
      commentInput: '',
    });
  };

  const convertDate = (date) => {
    let newDate = new Date(date);
    return (newDate = newDate.toISOString().substring(0, 10));
  };

  return loading ? (
    <Spinner />
  ) : (
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
              <h2 className='modal__title'>{title}</h2>

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
                  {editDescription && (
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
                      <DoneIcon
                        className='description__btn'
                        onClick={() => {
                          handleDoneEdit();
                        }}
                      />
                    </div>
                  )}
                  {!editDescription && (
                    <div
                      className='modal__description-body__text'
                      onClick={() => handleEditToggle()}
                    >
                      <p>{description}</p>
                      <EditIcon
                        className='description__btn'
                        cursor='pointer'
                        onClick={() => handleEditToggle()}
                      />
                    </div>
                  )}
                </span>
              </div>

              <div className='modal__container modal__comments-container'>
                <h3 className='modal__comments-title'>Comments</h3>
                {/* Comments */}
                {comments &&
                  comments.length !== 0 &&
                  comments.map((comment) => (
                    <Comment
                      id={comment._id}
                      author={comment.username}
                      text={comment.text}
                      date={comment.createdAt}
                      userId={comment.user}
                      handleCommentDelete={handleCommentDelete}
                    />
                  ))}
                <div className='modal__comments-input-section'>
                  <TextField
                    name='commentInput'
                    className='modal__comment-input'
                    id='outlined-basic'
                    label=''
                    variant='outlined'
                    size='small'
                    margin='none'
                    placeholder='add comment'
                    value={commentInput}
                    onChange={(e) => {
                      changeFieldText(e);
                    }}
                  />
                  <Button onClick={() => submitComment()}>Submit</Button>
                </div>
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

              <div className='modal__users'>
                <div className='modal__user modal__user-assignee'>
                  <span className='modal__user-title'>Assignee</span>
                  <p className='modal__user-name'>{assignee}</p>
                </div>
                <div className='modal__user modal__user-reporter'>
                  <span className='modal__user-title'>Reporter</span>
                  <p className='modal__user-name'>{createdBy}</p>
                </div>
              </div>

              <div className='modal__prority'>
                <span className='modal__priority-title'>Priority</span>
                <p className='modal__priority-name'>{priority}</p>
              </div>

              <div className='modal__save'>
                <Button
                  onClick={() => updateTicketHandler()}
                  className='modal__btn modal__save-btn'
                >
                  Save
                </Button>
                <Button
                  variant='contained'
                  color='secondary'
                  className='modal__btn modal__delete-btn'
                >
                  Delete
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
  loadTicket: PropTypes.func.isRequired,
  updateTicket: PropTypes.func.isRequired,
  currentTicket: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  currentTicket: state.ticket.currentTicket,
  user: state.auth.user,
  loading: state.ticket.loading,
});

export default connect(mapStateToProps, {
  loadTicket,
  updateTicket,
  addComment,
  deleteComment,
})(Modal);
