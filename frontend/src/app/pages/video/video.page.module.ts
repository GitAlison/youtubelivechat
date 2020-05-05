import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VideoPageRoutingModule } from './video-routing.module';

import { VideoPage } from './video.page';
import { VideoModule } from './room-video/room-video.module';
import { RoomService } from '../../services/room.service';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { StoreModule } from '@ngrx/store';
import { reducerMessage } from 'src/app/store/message/message.reducers';
import { EffectsModule } from '@ngrx/effects';
import { MessageEffect } from 'src/app/store/message/message.effects';
import { ChatMessagesComponent } from './chat-messages/chat-messages.component';

const config: SocketIoConfig = {
  url: '',
  options: { autoConnect: false },
};
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VideoModule,
    SocketIoModule.forRoot(config),
    StoreModule.forFeature('message', reducerMessage),
    EffectsModule.forFeature([MessageEffect]),
    VideoPageRoutingModule,
  ],
  providers: [RoomService],
  declarations: [VideoPage, ChatMessagesComponent, ChatMessagesComponent],
})
export class VideoPageModule {}
