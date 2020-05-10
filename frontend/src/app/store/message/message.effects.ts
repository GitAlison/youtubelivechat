import { Injectable } from '@angular/core';
import { RoomService } from 'src/app/services/room.service';
import { Effect, Actions, ofType } from '@ngrx/effects';
import * as ActionsMessage from './message.actions';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';

@Injectable()
export class MessageEffect {
  @Effect()
  getMessage$ = this.actions.pipe(
    ofType<ActionsMessage.GetMessagesAction>(
      ActionsMessage.MessageActionTypes.GET_MESSAGES
    ),
    switchMap((data) =>
      this.serviceMessage.getMessages(data.video).pipe(
        map(
          (dataService) =>
            new ActionsMessage.GetMessagesActionSuccess(dataService)
        ),
        catchError((error) => {
          this.alertService.showAlert('Algo deu errado, tente novamente');
          return of(new ActionsMessage.GetMessagesActionFail(error));
        })
      )
    )
  );

  constructor(
    private alertService: AlertService,
    private serviceMessage: RoomService,
    private actions: Actions
  ) {}
}
