import { Injectable } from '@angular/core';
import { RoomService } from 'src/app/services/room.service';
import { Effect, Actions, ofType } from '@ngrx/effects';
import * as ActionsMessage from './message.actions';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class MessageEffect {
  @Effect()
  getMessage$ = this.actions.pipe(
    ofType<ActionsMessage.GetMessagesAction>(ActionsMessage.MessageActionTypes.GET_MESSAGES),
    switchMap(()=> this.serviceMessage.getMessages().pipe(
      map((dataService)=> new ActionsMessage.GetMessagesActionSuccess(dataService)),
      catchError((error)=> of(new ActionsMessage.GetMessagesActionFail(error)))
    ))
  );

  constructor(private serviceMessage: RoomService, private actions: Actions) {}
}
