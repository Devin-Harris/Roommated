import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { DialogService } from './components/dialogs/base/dialog.service';
import { BaseDialogComponent } from './components/dialogs/base-dialog/base-dialog.component';
import { appLoaded } from './state/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private store: Store, private dialogService: DialogService) {}

  ngOnInit(): void {
    this.store.dispatch(appLoaded());
  }

  stuff() {
    const dialogRef = this.dialogService.open(BaseDialogComponent, { data: 'John' });

    dialogRef.afterClosed().subscribe(() => {
      // Subscription runs after the dialog closes
      console.log('Dialog closed!');
    });
  }
}
