import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  HomeState,
  selectHomeLoading,
  selectAllHomeVIdeos,
} from 'src/app/store/home/home.reducer';
import { Observable } from 'rxjs';
import { GetVideosAction } from 'src/app/store/home/home.actions';
import { Video } from 'src/app/store/models/video.model';
import {
  selectAllSearchVIdeos,
  selectSearchLoading,
} from 'src/app/store/search/search.reducer';
import { SearchVideosAction } from 'src/app/store/search/search.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  loading$: Observable<boolean>;
  videos$: Observable<Video[]>;

  loadingSearch$: Observable<boolean>;
  searchVideos$: Observable<Video[]>;

  inputQuery: string;

  constructor(private store: Store<HomeState>) {}

  ngOnInit() {
    this.store.dispatch(new GetVideosAction());
    this.loading$ = this.store.select(selectHomeLoading);
    this.videos$ = this.store.select(selectAllHomeVIdeos);

    this.loadingSearch$ = this.store.select(selectSearchLoading);
    this.searchVideos$ = this.store.select(selectAllSearchVIdeos);
  }

  search() {
    if (this.inputQuery.length > 0) {
      console.log(this.inputQuery)
      this.store.dispatch(new SearchVideosAction(this.inputQuery));
    }
  }
}
