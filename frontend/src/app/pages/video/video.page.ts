import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoomService } from '../../services/room.service';
import { MessageState } from 'src/app/store/message/message.reducers';
import { Store } from '@ngrx/store';
import {
  GetMessagesAction,
  AddMessageAction,
} from 'src/app/store/message/message.actions';
import { Subscription } from 'rxjs';
import { MenuController } from '@ionic/angular';
import { AuthState, getAuthState } from 'src/app/auth/store/auth/auth.reducer';

@Component({
  selector: 'app-video-page',
  templateUrl: './video.page.html',
  styleUrls: ['./video.page.scss'],
})
export class VideoPage implements OnInit, OnDestroy {
  videoId = '';
  users: number = 0;
  input = '';
  id = 999;
  authState: AuthState;
  subscription: Subscription = new Subscription();

  constructor(
    private menu: MenuController,
    private roomService: RoomService,
    private activatedRoute: ActivatedRoute,
    private store: Store<MessageState>,
    private storeAuth: Store<AuthState>
  ) {
    this.videoId = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.subscription.add(
      this.storeAuth
        .select(getAuthState)
        .subscribe((data) => (this.authState = data))
    );
  }

  getData() {
    this.subscription.add(
      this.roomService
        .getCountUsersOnline(this.videoId)
        .subscribe((users: number) => (this.users = users))
    );
  }

  sendMessage() {
    if (this.input !== '') {
      this.id++;
      this.store.dispatch(
        new AddMessageAction({
          id: this.id,
          text: this.input,
          user: {
            username: this.authState.user.username,
          },
          created: new Date(),
        })
      );
      this.roomService.sendMessage(this.videoId, this.input);
      this.input = '';
    }
  }

  connect() {
    try {
      this.roomService.connnect(this.videoId, this.authState.user.username);
    } catch (error) {
      this.roomService.connnect(this.videoId);
    }

    this.openRoom();
    this.getData();
  }
  disconect() {
    this.roomService.disconnect();
    setTimeout(() => {
      this.connect();
    }, 2000);
  }

  openRoom() {
    this.roomService.openRoom(this.videoId);
  }

  toggleMenuChat() {
    this.menu.toggle('chat');
  }

  fromVideo(video) {
    if (video) {
      this.store.dispatch(new GetMessagesAction(this.videoId));
      this.connect();
    }
  }

  ngOnDestroy() {
    this.roomService.disconnect();
  }
}
