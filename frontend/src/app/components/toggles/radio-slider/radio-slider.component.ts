import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'radio-slider',
  templateUrl: './radio-slider.component.html',
  styleUrls: ['./radio-slider.component.scss'],
})
export class RadioSliderComponent {
  @Input() label: string | null = null;

  @Input() value: boolean = true;

  @Output() valueChange = new EventEmitter<boolean>();

  constructor() {}

  toggleValue(): void {
    this.valueChange.emit(!this.value);
  }
}
