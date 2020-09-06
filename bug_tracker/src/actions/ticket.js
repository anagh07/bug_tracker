import axios from 'axios';
import {
  TICKETS_LOADED,
  TICKETS_LOAD_FAILED,
  TICKET_UPDATED,
  TICKET_UPDATE_FAILED,
  COMMENT_ADDED,
  COMMENTS_LOADED,
  COMMENTS_LOAD_FAILED,
  LOAD_TICKET,
  DELETE_COMMENT,
  DELETE_TICKET_FAILED,
  DELETE_TICKET,
  TICKET_CREATED,
  FIND_TICKET_CREATOR,
} from './types';
import { setAlert } from './alert';

// Load project tickets
export const loadTickets = (projectId) => async (dispatch) => {
  try {
    const res = await axios.get('/api/projects/tickets/' + projectId);

    dispatch({
      type: TICKETS_LOADED,
      payload: res.data,
    });
  } catch (err) {
    if (err) {
      dispatch({
        type: TICKETS_LOAD_FAILED,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};

// Load single ticket by id
export const loadTicket = (ticketId) => async (dispatch) => {
  try {
    console.log('Loading ticket');
    let res = await axios.get(`/api/tickets/${ticketId}`);
    let ticket = res.data;
    console.log(ticket);
    const res2 = await axios.get(`/api/users/${res.data.createdBy}`);
    ticket.creator = res2.data;
    console.log(ticket);

    dispatch({
      type: LOAD_TICKET,
      payload: ticket,
    });
  } catch (err) {
    if (err) {
      dispatch({
        type: TICKETS_LOAD_FAILED,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};

// Creeate a ticket
export const createTicket = (ticketObj) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify(ticketObj);
  // console.log(ticketObj);

  try {
    const res = await axios.post('/api/tickets', body, config);
    // console.log(res.data);

    dispatch({
      type: TICKET_CREATED,
      payload: res.data,
    });
  } catch (err) {
    if (err) {
      dispatch({
        type: TICKET_UPDATE_FAILED,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};

// Update a single ticket
export const updateTicket = (
  id,
  title,
  description,
  type,
  status,
  comments
) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ title, description, type, status, comments });

  try {
    const res = await axios.put('/api/tickets/' + id, body, config);

    dispatch({
      type: TICKET_UPDATED,
      payload: res.data,
    });
  } catch (err) {
    if (err) {
      dispatch({
        type: TICKET_UPDATE_FAILED,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};

// Delete ticket by id
export const deleteTicketById = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/tickets/${id}`);

    dispatch({
      type: DELETE_TICKET,
      payload: res.data,
    });
  } catch (err) {
    if (err) {
      dispatch({
        type: TICKET_UPDATE_FAILED,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};

// Find ticket creator
export const findTicketCreator = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/users/${id}`);

    dispatch({
      type: FIND_TICKET_CREATOR,
      payload: res.data,
    });
  } catch (err) {
    if (err) {
      dispatch({
        type: TICKET_UPDATE_FAILED,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};

// --------- COMMENTS ------------

// Add comment to post
export const addComment = (ticketId, user, username, text) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ user: user, username: username, text: text });

  try {
    const res = await axios.post('/api/tickets/comments/' + ticketId, body, config);

    dispatch({
      type: COMMENT_ADDED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: COMMENTS_LOAD_FAILED,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete comment
export const deleteComment = (ticketId, commentId) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ commentId: commentId });

  try {
    const res = await axios.put(`/api/tickets/comments/delete/${ticketId}`, body, config);

    console.log(res.data);

    dispatch({
      type: DELETE_COMMENT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: COMMENTS_LOAD_FAILED,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
