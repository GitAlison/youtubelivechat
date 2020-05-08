import { Action } from '@ngrx/store';
import { Message } from '../models/message.model';

export enum MessageActionTypes {
  GET_MESSAGES = '[MESSAGE] Get Messages',
  GET_MESSAGES_SUCCESS = '[MESSAGE] Get Messages Success',
  GET_MESSAGES_FAIL = '[MESSAGE] Get Messages Fail',

  ADD_MESSAGE = '[MESSAGE] Add Message',
  REMOVE_MESSAGES = '[MESSAGE] Remove Message',
}

export class GetMessagesAction implements Action {
  readonly type = MessageActionTypes.GET_MESSAGES;
  constructor(public video: string) {}
}

export class GetMessagesActionSuccess implements Action {
  readonly type = MessageActionTypes.GET_MESSAGES_SUCCESS;
  constructor(public payload: Message[]) {}
}

export class GetMessagesActionFail implements Action {
  readonly type = MessageActionTypes.GET_MESSAGES_FAIL;
  constructor(public payload: Error) {}
}

export class AddMessageAction implements Action {
  readonly type = MessageActionTypes.ADD_MESSAGE;
  constructor(public payload: Message) {}
}

export class RemoveMessagesAction implements Action {
  readonly type = MessageActionTypes.REMOVE_MESSAGES;
  constructor() {}
}

export type MessageActions =
  | GetMessagesAction
  | GetMessagesActionSuccess
  | GetMessagesActionFail
  // Add Message
  | AddMessageAction
  // Remove Messages
  | RemoveMessagesAction;
