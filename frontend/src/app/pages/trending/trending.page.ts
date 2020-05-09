import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.page.html',
  styleUrls: ['./trending.page.scss'],
})
export class TrendingPage implements OnInit {
  constructor(private Http: HttpClient) {}

  ngOnInit() {}

  getTrending() {
    this.Http.get('https://www.youtube.com/feed/trending').subscribe((data) => {
      console.log(data);
    });
  }
}
