import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

export enum SidebarSliderSidePosition {
  Left,
  Right,
}

@Component({
  selector: 'base-sidebar-slider',
  templateUrl: './base-sidebar-slider.component.html',
  styleUrls: ['./base-sidebar-slider.component.scss'],
})
export class BaseSidebarSliderComponent implements AfterViewInit, OnInit, OnChanges {
  @ViewChild('content') content?: ElementRef;

  @ViewChild('wrapper') wrapper?: ElementRef;

  @Input('position') position: SidebarSliderSidePosition = SidebarSliderSidePosition.Left;

  @Input('isOpenInit') isOpenInit = true;

  @Input('forceOpenState') forceOpenState: boolean | null = null;

  @Output('forceOpenStateSuccess') forceOpenStateSuccess = new EventEmitter<void>();

  readonly positions = SidebarSliderSidePosition;

  isOpen = true;

  constructor() {}

  ngOnInit(): void {
    this.isOpen = this.isOpenInit;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['forceOpenState'] && this.forceOpenState !== null) {
      this.isOpen = this.forceOpenState;
      this.animateContent();
      setTimeout(() => {
        this.forceOpenStateSuccess.emit();
      });
    }
  }

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
