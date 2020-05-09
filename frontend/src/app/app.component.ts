import { Component, OnInit, OnDestroy } from '@angular/core';

import { Platform, ModalController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ModalLoginComponent } from './auth/modals/modal-login/modal-login.component';
import { ModalRegisterComponent } from './auth/modals/modal-register/modal-register.component';
import * as jwtdecode from 'jwt-decode';
import { AuthState, getAuthState } from './auth/store/auth/auth.reducer';
import { Store } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';
import {
  AuthenticateSuccess,
  AuthenticateLogout,
} from './auth/store/auth/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  modalLogin;
  modalRegister;
  authState$: Observable<AuthState>;

  subscription: Subscription = new Subscription();

  public selectedIndex = 0;
  public appPages = [
    {
      title: 'YouTube',
      url: '/video/XkeIwhKIi84',
      icon: 'videocam',
    },
    {
      title: 'Em Alta',
      url: '/trending',
      icon: 'videocam',
    },
    {
      title: 'YouTube Red Hot',
      url: '/video/BfOdWSiyWoc',
      icon: 'videocam',
    },
    {
      title: 'Inbox',
      url: '/video/2',
      icon: 'mail',
    },
    {
      title: 'Historico',
      url: '/video/3',
      icon: 'heart',
    },
  ];

  constructor(
    private modalController: ModalController,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private store: Store<AuthState>
  ) {
    this.initializeApp();
    this.getToken();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  ngOnInit() {
    this.authState$ = this.store.select(getAuthState);

    const path = window.location.pathname.split('video/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(
        (page) => page.title.toLowerCase() === path.toLowerCase()
      );
    }
  }
  async presentModalLogin() {
    this.modalLogin = await this.modalController.create({
      component: ModalLoginComponent,
      componentProps: {
        modal: this.modalLogin,
      },
    });

    await this.modalLogin.present();
  }
  async presentModalRegister() {
    this.modalRegister = await this.modalController.create({
      component: ModalRegisterComponent,
      componentProps: {
        modal: this.modalRegister,
      },
    });

    await this.modalRegister.present();
  }

  logout() {
    this.store.dispatch(new AuthenticateLogout());
  }
  getToken() {
    let token = localStorage.getItem('tokenAccess');
    if (token) {
      this.store.dispatch(new AuthenticateSuccess({ access_token: token }));
    }
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
