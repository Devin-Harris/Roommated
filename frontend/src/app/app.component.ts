import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { DialogService } from './components/dialogs/base/dialog.service';
import { appLoaded } from './state/app';
import { ErrorDialogComponent } from './components/dialogs/error-dialog/error-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(appLoaded());
  }
}
