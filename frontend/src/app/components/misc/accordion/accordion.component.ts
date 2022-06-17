import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
})
export class AccordionComponent implements AfterViewInit {
  @ViewChild('content') content?: ElementRef;

  @ViewChild('wrapper') wrapper?: ElementRef;

  @Input() headerText: string = '';

  @Input() showContentOnInit: boolean = true;

  showingContent = true;

  constructor() {
    this.showingContent = this.showContentOnInit;
  }

  ngAfterViewInit(): void {
    this.animateContent();
  }

  toggleContent(): void {
    this.showingContent = !this.showingContent;
    this.animateContent();
  }

  private animateContent() {
    if (this.wrapper && this.content) {
      if (this.showingContent) {
        this.wrapper.nativeElement.style.height = this.content.nativeElement.clientHeight + 'px';
      } else {
        this.wrapper.nativeElement.style.height = 0;
      }
    }
  }
}
