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
import { MenuController, IonSplitPane } from '@ionic/angular';
import { AuthState, getAuthState } from 'src/app/auth/store/auth/auth.reducer';
import {
  trigger,
  style,
  animate,
  transition,
  stagger,
  query,
} from '@angular/animations';
import { Message } from 'src/app/store/models/message.model';

@Component({
  selector: 'app-video-page',
  templateUrl: './video.page.html',
  styleUrls: ['./video.page.scss'],
  animations: [
    trigger('animation', [
      transition('* <=> *', [
        query(
          ':enter',
          [
            style({ opacity: 0 }),
            stagger(
              '60ms',
              animate(
                '200ms ease-out',
                style({
                  opacity: 1,
                  transform: 'scale(1.8)',
                })
              )
            ),
            stagger(
              '60ms',
              animate(
                '500ms ease-out',
                style({
                  opacity: 1,
                  transform: 'translateY(-40px)',
                })
              )
            ),
            stagger(
              '60ms',
              animate(
                '10s ease',
                style({
                  opacity: 0.3,
                  transform: 'translateY(-1000px)',
                })
              )
            ),
            // stagger(
            //   '60ms',
            //   animate(
            //     '.4s ease',
            //     style({
            //       opacity: 0.3,
            //       transform: 'scale(-10,-10)',
            //     })
            //   )
            // ),
          ],
          { optional: true }
        ),
        query(':leave', animate('200ms', style({ opacity: 0 })), {
          optional: true,
        }),
      ]),
    ]),
  ],
})
export class VideoPage implements OnInit, OnDestroy {
  videoId = '';
  users: number = 0;
  input = '';
  id = 999;
  authState: AuthState;
  subscription: Subscription = new Subscription();

  // Animation Variables
  showAnimatedMessage = true;
  animationsStyle: any = [
    'primary',
    'secondary',
    'tertiary',
    'danger',
    'warning',
  ];

  animationsListMessage = [];
  constructor(
    private menu: MenuController,
    private roomService: RoomService,
    private activatedRoute: ActivatedRoute,
    private store: Store<MessageState>,
    private storeAuth: Store<AuthState>,
    private split: IonSplitPane
  ) {
    this.videoId = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.subscription.add(
      this.storeAuth
        .select(getAuthState)
        .subscribe((data) => (this.authState = data))
    );

    this.subscription.add(
      this.roomService
        .messageReceived(this.videoId)
        .subscribe((data: Message) => {
          this.animateMessage(data);
        })
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

  chatOpen() {
    this.showAnimatedMessage = false;
  }

  chatClose() {
    this.showAnimatedMessage = true;
  }
  slipePane(event) {
    if (event.detail.visible) {
      this.showAnimatedMessage = false;
    } else {
      this.showAnimatedMessage = true;
    }
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
  animateMessage(message: Message) {
    if (this.showAnimatedMessage) {
      var style = this.animationsStyle[
        Math.floor(Math.random() * this.animationsStyle.length)
      ];
      this.animationsListMessage.push({
        style: style,
        user: message.user.username,
        message: message.text,
      });
    }
  }
  ngOnDestroy() {
    this.roomService.disconnect();
  }
}
