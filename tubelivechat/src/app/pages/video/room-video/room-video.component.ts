import {
  Component,
  OnInit,
  Input,
  Inject,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-video',
  template: `
    <style>
      .ytp-chrome-top {
        display: none !important;
      }
      .text-center {
        text-align: center;
      }
    </style>
    <ng-container *ngIf="show_message">
      <ion-grid>
        <ion-row class="text-center">
          <ion-col>
            <ion-icon style="font-size:33px" name="sad-outline"></ion-icon>
            <h1>Esté Video náo esta disponível</h1>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ng-container>

    <youtube-player
      [hidden]="!show_player"
      height="100%"
      width="100%"
      allowfullscreen
      [videoId]="videoId"
      (ready)="savePlayer($event)"
      (change)="onStateChange($event)"
    ></youtube-player>
  `,
})
export class RoomVideoComponent implements OnInit {
  @Input() videoId;
  @Output() statusVideo = new EventEmitter();

  player: YT.Player;
  show_player = false;
  show_message = false;
  constructor() {}

  ngOnInit() {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);
  }

  savePlayer(player) {
    this.player = player;
    if (player['playerInfo']['videoData']['title'] === '') {
      this.show_message = true;
      this.statusVideo.emit(false);
    } else {
      this.show_player = true;
      this.statusVideo.emit(true);

      // this.player.playVideo();
    }
  }
  onStateChange(event) {}
}
