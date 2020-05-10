import { Injectable } from '@angular/core';
import * as HomeAction from './home.actions';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { MovieService } from 'src/app/services/movie.service';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';

@Injectable()
export class HomeEffect {
  @Effect()
  $getHomeVideo = this.actions.pipe(
    ofType<HomeAction.GetVideosAction>(HomeAction.HomeActionTypes.GET_VIDEOS),
    switchMap(() =>
      this.movieService.getVideosHome().pipe(
        map(
          (dataService) => new HomeAction.GetVideosSucccessAction(dataService)
        ),
        catchError((error) => {
          this.alertService.showAlert('Algo deu errado, tente novamente');
          return of(new HomeAction.GetVideosFailAction(error));
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
