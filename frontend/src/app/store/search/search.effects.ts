import { Injectable } from '@angular/core';
import * as SearchAction from './search.actions';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { MovieService } from 'src/app/services/movie.service';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';

@Injectable()
export class SearchEffect {
  @Effect()
  $searchVideo = this.actions.pipe(
    ofType<SearchAction.SearchVideosAction>(
      SearchAction.SearchActionTypes.SEARCH_VIDEOS
    ),
    switchMap((data) =>
      // Search ACtion param INPUT
      this.movieService.searchVideo(data.query).pipe(
        map((dataService) => {
          if ((dataService.length == 0)) {
            this.alertService.showAlert('Por favor, Tente Novamente');
          }
          return new SearchAction.SearchVideosSucccessAction(dataService);
        }),
        catchError((error) => {
          this.alertService.showAlert('Algo deu errado, tente novamente');
          return of(new SearchAction.SearchVideosFailAction(error));
        })
      )
    )
  );

  constructor(
    private alertService: AlertService,
    private movieService: MovieService,
    private actions: Actions
  ) {}
}
