import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { Video } from '../models/video.model';
import { SearchActionTypes, SearchActions } from './search.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface SearchState extends EntityState<Video> {
  loading: boolean;
}

const adapter: EntityAdapter<Video> = createEntityAdapter<Video>();

const initialState: SearchState = adapter.getInitialState({
  ids: [],
  entities: [],
  loading: false,
});

export function searchReducer(
  state: SearchState = initialState,
  actions: SearchActions
) {
  switch (actions.type) {
    case SearchActionTypes.SEARCH_VIDEOS:
      return { ...state, loading: true };
    case SearchActionTypes.SEARCH_VIDEOS_SUCCESS:
      return adapter.setAll(actions.payload, { ...state, loading: false });
    case SearchActionTypes.SEARCH_VIDEOS_FAIL:
      return { ...state, loading: false };
    default:
      return state;
  }
}

const selectSearchState = createFeatureSelector<SearchState>('search');

export const getSearchClassesEntitiesState = createSelector(
  selectSearchState,
  (state) => state.loading
);

const { selectAll } = adapter.getSelectors(selectSearchState);

export const selectAllSearchVIdeos = selectAll;

export const selectSearchLoading = getSearchClassesEntitiesState;
