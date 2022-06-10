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
  @ViewChild('content') content?: ElementRef;

  @ViewChild('wrapper') wrapper?: ElementRef;

  @Input()
  position: SidebarSliderSidePosition = SidebarSliderSidePosition.Left;

  readonly positions = SidebarSliderSidePosition;

  isOpen = true;

  constructor() {}

  toggleSidebar(): void {
    this.isOpen = !this.isOpen;
    this.animateContent();
  }

  private animateContent() {
    if (this.wrapper && this.content) {
      console.log(this.content.nativeElement.clientWidth);
      if (this.isOpen) {
        this.wrapper.nativeElement.style.width = this.content.nativeElement.clientWidth + 'px';
      } else {
        this.wrapper.nativeElement.style.width = 0;
      }
    }
  }
}
