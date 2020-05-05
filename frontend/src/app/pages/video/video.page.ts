import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoomService } from '../../services/room.service';
import {
  MessageState,
  selectLoading,
} from 'src/app/store/message/message.reducers';
import { Store } from '@ngrx/store';
import {
  GetMessagesAction,
  AddMessageAction,
} from 'src/app/store/message/message.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-video-page',
  templateUrl: './video.page.html',
  styleUrls: ['./video.page.scss'],
})
export class VideoPage implements OnInit, OnDestroy {
  videoId = '';
  users: number = 0;
  input = '';
  constructor(
    private roomService: RoomService,
    private activatedRoute: ActivatedRoute,
    private store: Store<MessageState>
  ) {
    this.videoId = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {}

  getData() {
    this.roomService
      .getUsers()
      .subscribe((users: number) => (this.users = users));
  }

  sendMessage() {
    if (this.input !== '') {
      this.store.dispatch(
        new AddMessageAction({
          id: new Date().getMilliseconds(),
          text: this.input,
          createdAt: new Date(),
        })
      );
      this.roomService.sendMessage(this.videoId, this.input);
      this.input = '';
    }
  }

  connect() {
    this.roomService.connnect();
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

  fromVideo(video) {
    if (video) {
      this.store.dispatch(new GetMessagesAction());
      this.connect();
    }
  }

  ngOnDestroy() {
    this.roomService.disconnect();
  }
}
