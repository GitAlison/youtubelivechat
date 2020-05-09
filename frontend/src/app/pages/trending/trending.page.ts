import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.page.html',
  styleUrls: ['./trending.page.scss'],
})
export class TrendingPage implements OnInit {
  constructor(private Http: HttpClient) {}

  movies: any;

  ngOnInit() {
    this.getTrending()
  }

  getTrending() {
    this.Http.get('http://localhost:3000/trending').subscribe((data) => {
      this.movies = data;

    });
  }
}
