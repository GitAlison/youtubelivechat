import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { HttpClient } from '@angular/common/http';
import { Message } from '../store/models/message.model';

import { AuthState } from '../auth/store/auth/auth.reducer';
import { Store } from '@ngrx/store';
import { Token } from '../auth/store/auth/user.model';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  socket;
  api = 'http://127.0.0.1:3000/room';
  // authState: Observable<AuthState>;
  token: Token;
  constructor(
    private store: Store<AuthState>,
    private http: HttpClient,
    private socketClient: Socket
  ) {
    // this.store.select(getAuthState).subscribe((data) => {
    //   this.token = data.token;
    // });
  }

  connnect(video, username) {
    this.socketClient.ioSocket.io.uri = 'http://localhost:3000/';
    this.socketClient.ioSocket.io.opts.query = {
      video: video,
      user: username,
    };
    this.socketClient.connect();
    console.log('connect');
  }

  disconnect() {
    console.log('disconecting');
    this.socketClient.disconnect();
  }

  sendMessage(videoId, text) {
    this.socketClient.emit('room', {
      type: 'send_message',
      headers: {
        jwt: `${localStorage.getItem('tokenAccess')}`,
      },
      content: {
        text: text,
        video: videoId,
      },
    });
  }

  messageReceived(video) {
    return this.socketClient.fromEvent(`room${video}`);
  }
  getMessages(video: string) {
    console.log(video)
    return this.http.get<Message[]>(`${this.api}/${video}`);
  }

  getCountUsersOnline(video) {
    return this.socketClient.fromEvent(`usersRoom${video}`);
  }

  openRoom(videoId) {
    this.socketClient.emit('room', {
      type: 'open',
      message: videoId,
    });
  }
}
