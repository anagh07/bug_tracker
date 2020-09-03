import { TICKETS_LOADED, TICKETS_LOAD_FAILED } from '../actions/types';

const initialState = {
  tickets: [],
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case TICKETS_LOADED:
      return {
        ...state,
        tickets: payload,
        loading: false,
      };

    default:
      return state;
  }
}
