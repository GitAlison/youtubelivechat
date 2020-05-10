import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { Video } from '../models/video.model';
import { HomeActionTypes, HomeActions } from './home.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface HomeState extends EntityState<Video> {
  loading: boolean;
}

const adapter: EntityAdapter<Video> = createEntityAdapter<Video>();

const initialState: HomeState = adapter.getInitialState({
  ids: [],
  entities: [],
  loading: false,
});

export function homeReducer(
  state: HomeState = initialState,
  actions: HomeActions
) {
  switch (actions.type) {
    case HomeActionTypes.GET_VIDEOS:
      return { ...state, loading: true };
    case HomeActionTypes.GET_VIDEOS_SUCCESS:
      return adapter.setAll(actions.payload, { ...state, loading: false });
    case HomeActionTypes.GET_VIDEOS_FAIL:
      return { ...state, loading: false };
    default:
      return state;
  }
}


const selectHomeState = createFeatureSelector<HomeState>('home');

export const getHomeClassesEntitiesState = createSelector(
  selectHomeState,
  (state) => state.loading
);

const { selectAll } = adapter.getSelectors(selectHomeState);

export const selectAllHomeVIdeos = selectAll;

export const selectHomeLoading = getHomeClassesEntitiesState;