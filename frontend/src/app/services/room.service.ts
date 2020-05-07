import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { HttpClient } from '@angular/common/http';
import { Message } from '../store/models/message.model';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  socket;
  api = 'http://127.0.0.1:3000/room';

  constructor(private http: HttpClient, private socketClient: Socket) {}

  connnect() {
    this.socketClient.ioSocket.io.uri = 'http://localhost:3000'; //new uri
    this.socketClient.connect(); //manually connection
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
        jwt: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFsaXNvbiIsInN1YiI6MSwiaWF0IjoxNTg4Nzk2MDA0LCJleHAiOjE1ODg4OTYwMDN9._TtaItKK_V-kiYRduGKd2jwMaqbO-RBEt8AXxtiTXvk`,
      },
      content: {
        text: text,
        video: videoId,
      },
    });
  }

  messageReceived() {
    return this.socketClient.fromEvent('room');
  }
  getMessages() {
    return this.http.get<Message[]>(this.api);
  }

  getUsers() {
    return this.socketClient.fromEvent('users');
  }

  openRoom(videoId) {
    this.socketClient.emit('room', {
      type: 'open',
      message: videoId,
    });
  }
}
