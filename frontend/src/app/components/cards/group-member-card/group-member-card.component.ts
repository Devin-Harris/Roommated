import { Component, ElementRef, Input, OnDestroy, Renderer2, ViewChild } from '@angular/core';
import { User } from '@rmtd/common/interfaces';

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

  @Input() hasActions = false;

  showingActions = false;

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
}
