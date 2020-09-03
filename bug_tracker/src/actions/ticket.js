import axios from 'axios';
import {
  TICKETS_LOADED,
  TICKETS_LOAD_FAILED,
  TICKET_UPDATED,
  TICKET_UPDATE_FAILED,
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

// Update a single ticket
export const updateTicket = (id, title, description, type, status, comments) => async (
  dispatch
) => {
  console.log('Updating');
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
