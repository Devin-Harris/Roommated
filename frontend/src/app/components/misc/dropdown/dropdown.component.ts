import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  Renderer2,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent implements OnDestroy {
  @ViewChild('content') content!: ElementRef;

  @ViewChild('header') header!: ElementRef;

  @Input() displayText: string | null = null;

  @Input() showContentOnInit: boolean = false;

  showingContent = false;

  private outsideClickListener: () => void;

  constructor(private renderer: Renderer2) {
    this.showingContent = this.showContentOnInit;

    this.outsideClickListener = this.renderer.listen('window', 'click', (e: Event) => {
      const path = e.composedPath();
      const clickShouldNotClose = path.some(
        (elm) => elm === this.content?.nativeElement || e.target === this.header?.nativeElement
      );

      if (!clickShouldNotClose) {
        this.showingContent = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.outsideClickListener();
  }

  toggleContent(): void {
    this.showingContent = !this.showingContent;
  }
}
