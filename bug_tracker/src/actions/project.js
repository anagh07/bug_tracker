import axios from 'axios';
import { PROJECTS_LOADED, PROJECT_LOAD_FAILED, SET_CURRENT_PROJECT } from './types';
import { setAlert } from './alert';

// Load projects
export const loadProjects = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/projects');
    res.data.currentProject = res.data[0]._id.toString();

    dispatch({
      type: PROJECTS_LOADED,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: PROJECT_LOAD_FAILED,
    });
  }
};

// Set cuurent project
export const setCurrentProject = (id) => (dispatch) => {
  dispatch({
    type: SET_CURRENT_PROJECT,
    payload: id,
  });
};
