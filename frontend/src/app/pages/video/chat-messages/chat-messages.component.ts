import {
  Component,
  OnInit,
  Input,
  OnChanges,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import {
  MessageState,
  selectAllMessages,
  selectLoading,
} from 'src/app/store/message/message.reducers';
import { Message } from 'src/app/store/models/message.model';
import { RoomService } from 'src/app/services/room.service';
import { IonContent } from '@ionic/angular';
import {
  AddMessageAction,
  RemoveMessagesAction,
} from 'src/app/store/message/message.actions';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-chat-messages',
  templateUrl: './chat-messages.component.html',
  styleUrls: ['./chat-messages.component.css'],
})
export class ChatMessagesComponent implements OnInit, OnDestroy {
  messages: Message[];
  loading$: Observable<boolean>;

  subcription: Subscription = new Subscription();
  @ViewChild('chat') chat: IonContent;

  constructor(
    private roomService: RoomService,
    private store: Store<MessageState>
  ) {}

  ngOnInit() {
    this.loading$ = this.store.select(selectLoading);

    this.subcription.add(
      this.store.select(selectAllMessages).subscribe((data) => {
        this.messages = data;
        this.scrollToBottom();
      })
    );

    this.subcription.add(
      this.roomService.messageReceived().subscribe((data: Message) => {
        this.store.dispatch(new AddMessageAction(data));
      })
    );
  }

  scrollToBottom(): void {
    setTimeout(() => {
      this.chat.scrollToBottom(300);
    });
  }
  ngOnDestroy() {
    this.subcription.unsubscribe();
    this.store.dispatch(new RemoveMessagesAction());
  }
}
