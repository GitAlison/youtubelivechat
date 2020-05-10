import { Action } from '@ngrx/store';
import { Video } from '../models/video.model';

export enum HomeActionTypes {
  GET_VIDEOS = '[HOME] Get VIDEOS',
  GET_VIDEOS_SUCCESS = '[HOME] Get VIDEOS Success',
  GET_VIDEOS_FAIL = '[HOME] Get VIDEOS Fail',
}

export class GetVideosAction implements Action {
  readonly type = HomeActionTypes.GET_VIDEOS;
}

export class GetVideosSucccessAction implements Action {
  readonly type = HomeActionTypes.GET_VIDEOS_SUCCESS;
  constructor(public payload: Video[]) {}
}

export class GetVideosFailAction implements Action {
  readonly type = HomeActionTypes.GET_VIDEOS_FAIL;
  constructor(public payload: Error) {}
}

export type HomeActions =
  | GetVideosAction
  | GetVideosSucccessAction
  | GetVideosFailAction;
