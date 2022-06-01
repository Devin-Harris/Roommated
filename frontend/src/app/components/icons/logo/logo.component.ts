import { Component, Input } from '@angular/core';

export enum LogoType {
  Solid,
  Outline,
}

@Component({
  selector: 'logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
})
export class LogoComponent {
  @Input() type = LogoType.Solid;

  @Input() fill = '#FFFFFF';

  readonly logoTypes = LogoType;

  constructor() {}
}
