import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { User } from '@rmtd/common/interfaces';

enum GroupUserRoles {
  Owner = 'Owner',
  Admin = 'Admin',
  Member = 'Member',
}

@Component({
  selector: 'group-member-card',
  templateUrl: './group-member-card.component.html',
  styleUrls: ['./group-member-card.component.scss'],
})
export class GroupMemberCardComponent implements OnDestroy {
  @ViewChild('toggleButton') toggleButton: ElementRef | undefined;

  @ViewChild('actions') actions: ElementRef | undefined;

  // TODO: create GroupUser interface that has firstname, lastname, profileImageUrl, and groupUserRole
  @Input() user: any | null = null;

  // TODO: create GroupUser interface that has firstname, lastname, profileImageUrl, and groupUserRole
  @Input() loggedInGroupUser: any | null = null;

  @Input() hasActions = false;

  @Output() removeClick = new EventEmitter<void>();

  @Output() promoteClick = new EventEmitter<void>();

  @Output() demoteClick = new EventEmitter<void>();

  showingActions = false;

  // TODO: user group user role enum
  groupUserRoles = GroupUserRoles;

  private outsideClickListener: () => void;

  constructor(private renderer: Renderer2) {
    this.outsideClickListener = this.renderer.listen('window', 'click', (e: Event) => {
      if (
        e.target !== this.toggleButton?.nativeElement &&
        e.target !== this.actions?.nativeElement
      ) {
        this.showingActions = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.outsideClickListener();
  }

  openActions(): void {
    this.showingActions = true;
  }

  actionRemoveClick(): void {
    this.removeClick.emit();
  }

  actionPromoteClick(): void {
    this.promoteClick.emit();
  }

  actionDemoteClick(): void {
    this.demoteClick.emit();
  }
}
