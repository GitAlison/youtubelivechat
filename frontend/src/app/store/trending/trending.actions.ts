import { Action } from '@ngrx/store';
import { Video } from '../models/video.model';

export enum TrendingActionTypes {
  GET_TRENDING = '[TRENDING] Get Trending',
  GET_TRENDING_SUCCESS = '[TRENDING] Get Trending Success',
  GET_TRENDING_FAIL = '[TRENDING] Get Trending Fail',
}

export class GetTrendingAction implements Action {
  readonly type = TrendingActionTypes.GET_TRENDING;
}

export class GetTrendingSucccessAction implements Action {
  readonly type = TrendingActionTypes.GET_TRENDING_SUCCESS;
  constructor(public payload: Video[]) {}
}

export class GetTrendingFailAction implements Action {
  readonly type = TrendingActionTypes.GET_TRENDING_FAIL;
  constructor(public payload: Error) {}
}

export type TrendingActions =
  | GetTrendingAction
  | GetTrendingSucccessAction
  | GetTrendingFailAction;
