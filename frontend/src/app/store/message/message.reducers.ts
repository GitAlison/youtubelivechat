import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Message } from '../models/message.model';
import { MessageActionTypes, MessageActions } from './message.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface MessageState extends EntityState<Message> {
  loading: boolean;
}

const adapter: EntityAdapter<Message> = createEntityAdapter<Message>();

const initialState: MessageState = adapter.getInitialState({
  ids: [],
  entities: {},
  loading: false,
});

export function reducerMessage(
  state: MessageState = initialState,
  actions: MessageActions
) {
  switch (actions.type) {
    case MessageActionTypes.GET_MESSAGES:
      return adapter.removeAll({ ...state, loading: true });

    case MessageActionTypes.GET_MESSAGES_SUCCESS:
      return adapter.setAll(actions.payload, { ...state, loading: false });

    case MessageActionTypes.GET_MESSAGES_FAIL:
      return { ...state, loading: false };

    case MessageActionTypes.ADD_MESSAGE:
      return adapter.addOne(actions.payload, state);

    case MessageActionTypes.REMOVE_MESSAGES:
      return adapter.removeAll({ ...state, loading: false });
      
    default:
      return state;
  }
}

const selectClientState = createFeatureSelector<MessageState>('message');

export const getClientClassesEntitiesState = createSelector(
  selectClientState,
  (state) => state.loading
);

const { selectAll } = adapter.getSelectors(selectClientState);

export const selectAllMessages = selectAll;

export const selectLoading = getClientClassesEntitiesState;
