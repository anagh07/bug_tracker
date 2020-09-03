import React, { Fragment, useState } from 'react';
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

import Comment from './Comment';

const Card = (props) => {
  const [data, setData] = useState({
    isOpen: false,
    editDescription: false,
    description: 'Test text',
    commentInput: '',
    comments: [
      {
        id: 1,
        author: 'anagh',
        text: 'this is a sample comment',
        date: '9-1-2020',
      },
      {
        id: 2,
        author: 'testuser',
        text: 'this is another comment',
        date: '8-31-2020',
      },
    ],
    typeOpen: false,
    type: 'Task',
    status: 'To-do',
    statusOpen: false,
    assignee: 'Testuser',
    reporter: 'Anagh',
    priority: 'Normal',
  });

  const {
    isOpen,
    editDescription,
    description,
    comments,
    commentInput,
    typeOpen,
    type,
    statusOpen,
    status,
    assignee,
    reporter,
    priority,
  } = data;

  let updatedAt = new Date(props.ticket.updatedAt);
  updatedAt = updatedAt.toISOString().substring(0, 10);

  const open = () => {
    setData({
      ...data,
      isOpen: true,
    });
  };

  const close = () => {
    setData({
      ...data,
      isOpen: false,
    });
  };

  const changeFieldText = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditToggle = () => {
    setData({
      ...data,
      editDescription: true,
    });
  };

  const handleDoneEdit = () => {
    setData({
      ...data,
      editDescription: false,
    });
  };

  const handleTypeClose = () => {
    setData({
      ...data,
      typeOpen: false,
    });
  };

  const handleTypeOpen = () => {
    setData({
      ...data,
      typeOpen: true,
    });
  };

  const handleTypeChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
      typeOpen: false,
    });
  };

  const handleStatusClose = () => {
    setData({
      ...data,
      statusOpen: false,
    });
  };

  const handleStatusOpen = () => {
    setData({
      ...data,
      statusOpen: true,
    });
  };

  const handleStatusChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
      statusOpen: false,
    });
  };

  if (isOpen) {
    return (
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
              <h2 className='modal__title'>Modal Title</h2>

              <div className='modal__container modal__type-container'>
                <h3 className='modal__type-title'>Type</h3>
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
                {comments.length !== 0 &&
                  comments.map((comment) => (
                    <Comment
                      id={comment.id}
                      author={comment.author}
                      text={comment.text}
                      date={comment.date}
                    />
                  ))}
                <TextField
                  name='commentInput'
                  className='modal__description-input'
                  id='outlined-basic'
                  label=''
                  variant='outlined'
                  size='small'
                  margin='none'
                  placeholder='add comment'
                  multiline='false'
                  value={commentInput}
                  onChange={(e) => {
                    changeFieldText(e);
                  }}
                />
                <Button>Submit</Button>
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
                  <p className='modal__user-name'>{reporter}</p>
                </div>
              </div>

              <div className='modal__prority'>
                <span className='modal__priority-title'>Priority</span>
                <p className='modal__priority-name'>{priority}</p>
              </div>

              <div className='modal__save'>
                <Button className='modal__btn modal__save-btn'>Save</Button>
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
    );
  }

  if (props.ticket.type === 'Task') {
    return (
      <div className='card' onClick={() => open()}>
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
      <div className='card' onClick={() => open()}>
        <div className='card__info'>
          <p className='card__title'>{props.ticket.title}</p>
        </div>
        <div className='card__subtitle'>
          <BugReportIcon fontSize='small' />
          <span className='card__date'>{updatedAt}</span>
        </div>
      </div>
    );
  }
};

export default Card;
