import {
  TICKETS_LOADED,
  TICKETS_LOAD_FAILED,
  TICKET_UPDATED,
  TICKET_UPDATE_FAILED,
  LOAD_TICKET,
  COMMENT_ADDED,
  COMMENTS_LOADED,
  COMMENTS_LOAD_FAILED,
  DELETE_COMMENT,
  DELETE_TICKET_FAILED,
  DELETE_TICKET,
  TICKET_CREATED,
  FIND_TICKET_CREATOR,
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

    case LOAD_TICKET:
      return {
        ...state,
        currentTicket: payload,
        loading: false,
      };

    case TICKET_UPDATED:
      return {
        ...state,
        loading: false,
      };

    case DELETE_TICKET:
      return {
        ...state,
        loading: false,
        tickets: payload,
      };

    case TICKET_CREATED:
      return {
        ...state,
        loading: false,
        tickets: [...state.tickets, payload],
      };

    case FIND_TICKET_CREATOR:
      return {
        ...state,
        ticketCreator: payload,
      };

    case TICKETS_LOAD_FAILED:
    case TICKET_UPDATE_FAILED:
      return {
        ...state,
        error: payload,
      };

    case COMMENT_ADDED:
      return {
        ...state,
        currentTicket: payload,
      };

    case DELETE_COMMENT:
      return {
        ...state,
        currentTicket: payload,
      };

    default:
      return state;
  }
}
