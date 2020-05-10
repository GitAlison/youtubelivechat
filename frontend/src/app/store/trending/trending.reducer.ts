import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { Video } from '../models/video.model';
import { TrendingActionTypes, TrendingActions } from './trending.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface TrendingState extends EntityState<Video> {
  loading: boolean;
}

const adapter: EntityAdapter<Video> = createEntityAdapter<Video>();

const initialState: TrendingState = adapter.getInitialState({
  ids: [],
  entities: [],
  loading: false,
});

export function trendingReducer(
  state: TrendingState = initialState,
  actions: TrendingActions
) {
  switch (actions.type) {
    case TrendingActionTypes.GET_TRENDING:
      return { ...state, loading: true };
    case TrendingActionTypes.GET_TRENDING_SUCCESS:
      return adapter.setAll(actions.payload, { ...state, loading: false });
    case TrendingActionTypes.GET_TRENDING_FAIL:
      return { ...state, loading: false };
    default:
      return state;
  }
}

const selectTrendingState = createFeatureSelector<TrendingState>('trending');

export const getTrendingClassesEntitiesState = createSelector(
  selectTrendingState,
  (state) => state.loading
);

const { selectAll } = adapter.getSelectors(selectTrendingState);

export const selectAllTrendingVideos = selectAll;

export const selectTrendingLoading = getTrendingClassesEntitiesState;
