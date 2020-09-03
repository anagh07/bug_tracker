import axios from 'axios';
import { TICKETS_LOADED, TICKETS_LOAD_FAILED } from './types';
import { setAlert } from './alert';

// Load projects
export const loadTickets = (projectId) => async (dispatch) => {
  try {
    const res = await axios.get('/api/projects/tickets/' + projectId);

    dispatch({
      type: TICKETS_LOADED,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: TICKETS_LOAD_FAILED,
    });
  }
};
