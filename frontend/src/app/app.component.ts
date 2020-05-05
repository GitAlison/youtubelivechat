import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'YouTube',
      url: '/video/XkeIwhKIi84',
      icon: 'videocam',
    },
    {
      title: 'Sala',
      url: '/video/1',
      icon: 'mail',
    },
    {
      title: 'Inbox',
      url: '/video/2',
      icon: 'mail',
    },

    {
      title: 'Favorites',
      url: '/video/Favorites',
      icon: 'heart',
    },
    {
      title: 'Historico',
      url: '/video/3',
      icon: 'heart',
    },
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('video/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(
        (page) => page.title.toLowerCase() === path.toLowerCase()
      );
    }
  }
}
