import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import {
  TrendingState,
  selectAllTrendingVideos,
  selectTrendingLoading,
} from 'src/app/store/trending/trending.reducer';
import { GetTrendingAction } from 'src/app/store/trending/trending.actions';
import { Observable } from 'rxjs';
import { Video } from 'src/app/store/models/video.model';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.page.html',
  styleUrls: ['./trending.page.scss'],
})
export class TrendingPage implements OnInit {
  constructor(private store: Store<TrendingState>) {}
  videos$: Observable<Video[]>;
  loading$: Observable<boolean>;
  
  ngOnInit() {
    this.store.dispatch(new GetTrendingAction());
    this.videos$ = this.store.select(selectAllTrendingVideos);
    this.loading$ = this.store.select(selectTrendingLoading);
  }
}
