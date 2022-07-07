import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { MapService } from './map.service';
import { Store } from '@ngrx/store';

@Injectable()
export class MapEffects {
  constructor(
    private actions$: Actions<any>,
    private store$: Store,
    private mapService: MapService
  ) {}
}
