import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { PostPetFilter } from '@rmtd/common/enums';
import { Group, Post } from '@rmtd/common/interfaces';
import { Observable, Subject } from 'rxjs';
import { selectIsLoggedIn } from 'src/app/state/authentication';
import { selectCurrentUserGroup } from 'src/app/state/group';
import { ApplyDialogComponent } from '../../dialogs/apply-dialog/apply-dialog.component';
import { DialogService } from '../../dialogs/base/dialog.service';
import { SidebarSliderSidePosition } from '../base-sidebar-slider/base-sidebar-slider.component';

@Component({
  selector: 'post-sidebar',
  templateUrl: './post-sidebar.component.html',
  styleUrls: ['./post-sidebar.component.scss'],
})
export class PostSidebarComponent implements OnDestroy {
  @ViewChild('currentGroupCheck') currentGroupCheck: ElementRef | null = null;

  @Input('post') post: Post | null;

  @Input('forceOpenState') forceOpenState: boolean | null = null;

  @Output('forceOpenStateSuccess') forceOpenStateSuccess = new EventEmitter<void>();

  $loggedIn: Observable<boolean>;

  $currentUserGroup: Observable<Group | null>;

  readonly sidebarSliderSidePositions = SidebarSliderSidePosition;

  readonly petsAllowedOptions = PostPetFilter;

  private destroyed$ = new Subject<void>();

  constructor(private store: Store, private dialogService: DialogService) {
    this.$loggedIn = this.store.select(selectIsLoggedIn);
    this.$currentUserGroup = this.store.select(selectCurrentUserGroup);
  }

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

  handleApplyClick(): void {
    if (this.post) {
      this.dialogService.open(ApplyDialogComponent, { data: { postId: this.post.id } });
    } else {
      console.error('Cannot apply to undefined post');
    }
  }
}
