import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { PostPetFilter } from '@rmtd/common/enums';
import { Subject } from 'rxjs';

import { DialogService } from '../../dialogs/base/dialog.service';
import { SidebarSliderSidePosition } from '../base-sidebar-slider/base-sidebar-slider.component';

@Component({
  selector: 'post-sidebar',
  templateUrl: './post-sidebar.component.html',
  styleUrls: ['./post-sidebar.component.scss'],
})
export class PostSidebarComponent implements OnDestroy {
  @Input('post') post: any;

  @Input('forceOpenState') forceOpenState: boolean | null = null;

  @Output('forceOpenStateSuccess') forceOpenStateSuccess = new EventEmitter<void>();

  readonly sidebarSliderSidePositions = SidebarSliderSidePosition;

  readonly petsAllowedOptions = PostPetFilter;

  private destroyed$ = new Subject<void>();

  constructor(private store: Store, private dialogService: DialogService, private router: Router) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroyed$.next();
  }

  handleForceOpenStateSuccess(): void {
    this.forceOpenStateSuccess.emit();
  }

  getDateString(date: Date): string {
    return new Date(date).toLocaleDateString();
  }

  handleSaveClick(): void {}

  handleApplyClick(): void {}
}
