import {
  TICKETS_LOADED,
  TICKETS_LOAD_FAILED,
  TICKET_UPDATED,
  TICKET_UPDATE_FAILED,
} from '../actions/types';

const initialState = {
  tickets: [],
  loading: true,
  error: {},
  currentTicket: {},
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

    case TICKET_UPDATED:
      return {
        ...state,
        loading: false,
        currentTicket: payload,
      };

    case TICKETS_LOAD_FAILED:
    case TICKET_UPDATE_FAILED:
      return {
        ...state,
        error: payload,
      };

    default:
      return state;
  }
}
