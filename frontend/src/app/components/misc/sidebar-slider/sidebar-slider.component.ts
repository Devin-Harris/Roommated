import { Component, ElementRef, Input, ViewChild } from '@angular/core';

export enum SidebarSliderSidePosition {
  Left,
  Right,
}

@Component({
  selector: 'sidebar-slider',
  templateUrl: './sidebar-slider.component.html',
  styleUrls: ['./sidebar-slider.component.scss'],
})
export class SidebarSliderComponent {
  @ViewChild('sidebarContainer') sidebarContainer!: ElementRef;

  @Input()
  position: SidebarSliderSidePosition = SidebarSliderSidePosition.Left;

  readonly positions = SidebarSliderSidePosition;

  isOpen = true;

  constructor() {}

  toggleSidebar(): void {
    this.isOpen = !this.isOpen;
  }
}
