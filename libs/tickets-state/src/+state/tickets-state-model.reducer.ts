import { TicketsStateModel } from './tickets-state-model.interfaces';
import { TicketsStateModelAction } from './tickets-state-model.actions';

export function ticketsStateModelReducer(state: TicketsStateModel, action: TicketsStateModelAction): TicketsStateModel {
  switch (action.type) {
    case 'TICKETS_LOADED': {
      return {
        ...state,
        tickets: action.payload
          .reduce((prev, curr) => ({
            ...prev,
            [curr.id]: curr
            }), {}),
        ids: action.payload.map(t => t.id)
      };
    }
    case 'TICKET_LOADED': {
      const tickets = {...state.tickets};
      tickets[action.payload.id] = action.payload;
      return {
        ...state,
        tickets
      };
    }
    default: {
      return state;
    }
  }
}
