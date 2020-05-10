import { Injectable } from '@angular/core';
import * as TrendingAction from './trending.actions';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { MovieService } from 'src/app/services/movie.service';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';

@Injectable()
export class TrendingEffect {
  @Effect()
  $getHomeVideo = this.actions.pipe(
    ofType<TrendingAction.GetTrendingAction>(
      TrendingAction.TrendingActionTypes.GET_TRENDING
    ),
    switchMap(() =>
      this.movieService.getTrending().pipe(
        map((dataService) => {
          if (dataService.length == 0) {
            this.alertService.showAlert('Por favor, Tente Novamente');
          }
          return new TrendingAction.GetTrendingSucccessAction(dataService);
        }),
        catchError((error) => {
          this.alertService.showAlert('Algo deu errado, tente novamente');
          return of(new TrendingAction.GetTrendingFailAction(error));
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
