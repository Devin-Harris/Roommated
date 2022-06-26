import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { GroupUserRole } from '@rmtd/common/enums';
import { GroupUser } from '@rmtd/common/interfaces';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'group-member-card',
  templateUrl: './group-member-card.component.html',
  styleUrls: ['./group-member-card.component.scss'],
})
export class GroupMemberCardComponent implements OnDestroy {
  @ViewChild('toggleButton') toggleButton: ElementRef | undefined;

  @ViewChild('actions') actions: ElementRef | undefined;

  @Input() groupUser!: GroupUser;

  @Input() loggedInGroupUser!: GroupUser | undefined;

  @Input() hasActions = false;

  @Input() isInvite = false;

  @Input() showRole = true;

  @Input() isRemoving = false;

  @Input() isPromoting = false;

  @Input() isDemoting = false;

  @Output() removeInviteClick = new EventEmitter<void>();

  @Output() removeClick = new EventEmitter<void>();

  @Output() promoteClick = new EventEmitter<void>();

  @Output() demoteClick = new EventEmitter<void>();

  showingActions = false;

  groupUserRoles = GroupUserRole;

  private outsideClickListener: () => void;

  constructor(private renderer: Renderer2, private changeDetector: ChangeDetectorRef) {
    this.outsideClickListener = this.renderer.listen('window', 'click', (e: Event) => {
      if (
        e.target !== this.toggleButton?.nativeElement &&
        e.target !== this.actions?.nativeElement
      ) {
        this.showingActions = false;
        this.changeDetector.markForCheck();
      }
    });
  }

  ngOnDestroy(): void {
    this.outsideClickListener();
  }

  openActions(): void {
    this.showingActions = true;
    this.changeDetector.markForCheck();
  }

  actionRemoveInviteClick(): void {
    this.removeInviteClick.emit();
    this.changeDetector.markForCheck();
  }

  actionRemoveClick(): void {
    this.removeClick.emit();
    this.changeDetector.markForCheck();
  }

  actionPromoteClick(): void {
    this.promoteClick.emit();
    this.changeDetector.markForCheck();
  }

  actionDemoteClick(): void {
    this.demoteClick.emit();
    this.changeDetector.markForCheck();
  }
}
