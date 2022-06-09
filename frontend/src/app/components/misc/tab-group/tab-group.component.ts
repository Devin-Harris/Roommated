import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'tab-group',
  templateUrl: './tab-group.component.html',
  styleUrls: ['./tab-group.component.scss'],
})
export class TabGroupComponent {
  @Input() tabs: string[] = [];

  @Input() selectedTab = '';

  @Output() selectedTabChange = new EventEmitter<string>();

  constructor() {}

  handleTabClick(tab: string): void {
    // this.selectedTab = tab;
    this.selectedTabChange.emit(tab);
  }
}
