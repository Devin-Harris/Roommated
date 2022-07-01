import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { appLoaded } from './state/app';
import { selectIsAppLoaded } from './state/app/app.selector';
import { selectReAuthProcessed } from './state/authentication';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  $appLoaded: Observable<boolean>;

  $reauthProcessed: Observable<boolean>;

  constructor(private store: Store) {
    this.store.dispatch(appLoaded());
    this.$appLoaded = this.store.select(selectIsAppLoaded);
    this.$reauthProcessed = this.store.select(selectReAuthProcessed);
  }

  ngOnInit(): void {}
}
