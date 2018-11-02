import { createEntityAdapter } from '@ngrx/entity';

import { Ticket } from '@tuskdesk-suite/data-models';

import { TicketsState } from './tickets.interfaces';
import { LoadTicketDone, LoadTicketsDone, SelectTicket, TicketActionTypes, TicketsAction } from './tickets.actions';

export const FEATURE_TICKETS = 'tickets';

export const ticketsAdapter = createEntityAdapter<Ticket>();

export const getInitialState = () =>
  ticketsAdapter.getInitialState({
    selectedId: -1,
    loading: true,
    error: ''
  });

export function ticketsReducer(state: TicketsState, action: TicketsAction): TicketsState {
  switch (action.type) {
    case TicketActionTypes.LOAD_ALL_TICKETS:
    case TicketActionTypes.LOAD_TICKET: {
      return {
        ...state,
        loading: true
      };
    }

    case TicketActionTypes.LOAD_ALL_TICKETS_DONE: {
      return {
        ...state,
        ...ticketsAdapter.addAll(action.tickets, state),
        loading: false
      };
    }

    case TicketActionTypes.LOAD_TICKET_DONE: {
      return {
        ...state,
        ...ticketsAdapter.upsertOne(action.ticket, state),
        loading: false
      };
    }

    case TicketActionTypes.SELECT_TICKET: {
      return {
        ...state,
        selectedId: action.ticketId
      };
    }
  }

  return state;
}
