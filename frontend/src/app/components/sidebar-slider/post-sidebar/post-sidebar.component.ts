import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';

import { DialogService } from '../../dialogs/base/dialog.service';
import { SidebarSliderSidePosition } from '../base-sidebar-slider/base-sidebar-slider.component';

@Component({
  selector: 'post-sidebar',
  templateUrl: './post-sidebar.component.html',
  styleUrls: ['./post-sidebar.component.scss'],
})
export class PostSidebarComponent implements OnDestroy {
  readonly sidebarSliderSidePositions = SidebarSliderSidePosition;

  private destroyed$ = new Subject<void>();

  constructor(private store: Store, private dialogService: DialogService, private router: Router) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroyed$.next();
  }
}
