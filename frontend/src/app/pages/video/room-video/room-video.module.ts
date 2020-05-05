import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxYoutubePlayerModule } from 'ngx-youtube-player';
import { RoomVideoComponent } from './room-video.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [RoomVideoComponent],
  imports: [IonicModule, CommonModule, NgxYoutubePlayerModule],
  exports: [RoomVideoComponent],
})
export class VideoModule {}
