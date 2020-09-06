import {
  PROJECTS_LOADED,
  PROJECT_LOAD_FAILED,
  SET_CURRENT_PROJECT,
  PROJECT_CREATE_FAILED,
  CREATE_PROJECT,
} from '../actions/types';

const initialState = {
  projects: [],
  currentProject: {},
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_PROJECT:
      return {
        ...state,
        projects: [...state.projects, payload],
        currentProject: payload,
      };

    case PROJECTS_LOADED:
      return {
        ...state,
        loading: false,
        projects: payload,
        currentProject: payload.currentProject,
      };

    case PROJECT_LOAD_FAILED:
      return {
        ...state,
        loading: false,
      };

    case SET_CURRENT_PROJECT:
      return {
        ...state,
        loading: false,
        currentProject: payload,
      };

    default:
      return state;
  }
}
