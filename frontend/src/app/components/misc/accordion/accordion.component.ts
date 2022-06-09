import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
})
export class AccordionComponent {
  @Input() headerText: string = '';

  @Input() showContentOnInit: boolean = true;

  showingContent = true;

  constructor() {
    this.showingContent = this.showContentOnInit;
  }

  toggleContent(): void {
    this.showingContent = !this.showingContent;
  }
}
