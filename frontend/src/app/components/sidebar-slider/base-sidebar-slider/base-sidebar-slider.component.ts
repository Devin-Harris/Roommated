import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';

export enum SidebarSliderSidePosition {
  Left,
  Right,
}

@Component({
  selector: 'base-sidebar-slider',
  templateUrl: './base-sidebar-slider.component.html',
  styleUrls: ['./base-sidebar-slider.component.scss'],
})
export class BaseSidebarSliderComponent implements AfterViewInit {
  @ViewChild('content') content?: ElementRef;

  @ViewChild('wrapper') wrapper?: ElementRef;

  @Input()
  position: SidebarSliderSidePosition = SidebarSliderSidePosition.Left;

  readonly positions = SidebarSliderSidePosition;

  isOpen = true;

  constructor() {}

  ngAfterViewInit(): void {
    this.animateContent();
  }

  toggleSidebar(): void {
    this.isOpen = !this.isOpen;
    this.animateContent();
  }

  private animateContent() {
    if (this.wrapper && this.content) {
      if (this.isOpen) {
        this.wrapper.nativeElement.style.width = this.content.nativeElement.clientWidth + 'px';
      } else {
        this.wrapper.nativeElement.style.width = 0;
      }
    }
  }
}
