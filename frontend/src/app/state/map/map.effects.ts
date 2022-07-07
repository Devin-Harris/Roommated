import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MapService } from './map.service';
import { select, Store } from '@ngrx/store';
import { selectMapFilters } from './map.selector';
import * as MapActions from './map.actions';
import { catchError, map, Observable, of, switchMap, withLatestFrom } from 'rxjs';

@Injectable()
export class MapEffects {
  getFilteredMapPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MapActions.storeMapFilters),
      withLatestFrom(this.store$.pipe(select(selectMapFilters))),
      switchMap(([action, mapFilters]: any): Observable<any> => {
        return this.mapService.getFilteredPosts(mapFilters).pipe(
          map((posts: any) => {
            return MapActions.getFilteredPostsSuccess({ posts });
          }),
          catchError((error: any) => {
            return of(MapActions.getFilteredPostsFailure({ error }));
          })
        );
      })
    )
  );

  constructor(
    private actions$: Actions<any>,
    private store$: Store,
    private mapService: MapService
  ) {}
}
