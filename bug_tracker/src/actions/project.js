import axios from 'axios';
import {
  PROJECTS_LOADED,
  PROJECT_LOAD_FAILED,
  SET_CURRENT_PROJECT,
  CREATE_PROJECT,
  PROJECT_CREATE_FAILED,
} from './types';
import { setAlert } from './alert';

// Load projects
export const loadProjects = () => async (dispatch) => {
  try {
    const res = await axios.get('https://bug-task-tracker.herokuapp.com/api/projects');
    res.data.currentProject = {
      id: res.data[0]._id.toString(),
      title: res.data[0].title,
    };

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
export const setCurrentProject = (currentProject) => (dispatch) => {
  dispatch({
    type: SET_CURRENT_PROJECT,
    payload: currentProject,
  });
};

// Create new project
export const createProject = (title) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ title: title });

  try {
    const res = await axios.post(
      'https://bug-task-tracker.herokuapp.com/api/projects',
      body,
      config
    );
    dispatch({
      type: CREATE_PROJECT,
      payload: res.data,
    });
  } catch (err) {
    if (err) {
      dispatch({
        type: PROJECT_CREATE_FAILED,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};
