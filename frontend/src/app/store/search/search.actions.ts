import { Action } from '@ngrx/store';
import { Video } from '../models/video.model';

export enum SearchActionTypes {
  SEARCH_VIDEOS = '[SEARCH] Search VIDEOS',
  SEARCH_VIDEOS_SUCCESS = '[SEARCH] Search VIDEOS Success',
  SEARCH_VIDEOS_FAIL = '[SEARCH] Search VIDEOS Fail',
}

export class SearchVideosAction implements Action {
  readonly type = SearchActionTypes.SEARCH_VIDEOS;
  constructor(public query: string) {}
}

export class SearchVideosSucccessAction implements Action {
  readonly type = SearchActionTypes.SEARCH_VIDEOS_SUCCESS;
  constructor(public payload: Video[]) {}
}

export class SearchVideosFailAction implements Action {
  readonly type = SearchActionTypes.SEARCH_VIDEOS_FAIL;
  constructor(public payload: Error) {}
}

export type SearchActions =
  | SearchVideosAction
  | SearchVideosSucccessAction
  | SearchVideosFailAction;
