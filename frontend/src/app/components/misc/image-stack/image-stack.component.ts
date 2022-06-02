import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'image-stack',
  templateUrl: './image-stack.component.html',
  styleUrls: ['./image-stack.component.scss'],
})
export class ImageStackComponent implements AfterViewInit {
  @ViewChild('container') container!: ElementRef;

  @Input() image: string | null = null;

  @Input() stackSize: number = 3;

  @Input() offset = 15;

  images: { top: number; left: number; duration: number }[] = [];

  imageWidth = 0;

  imageHeight = 0;

  constructor(private changeDetector: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    requestAnimationFrame(() => {
      this.initializeImages();
    });
  }

  initializeImages(): void {
    this.images = [];
    for (let i = 0; i < this.stackSize; i++) {
      this.images.push({
        top: this.offset * i,
        left: this.offset * i,
        duration: this.getAnimationDelay(),
      });
    }

    if (this.container) {
      const containerBounds =
        this.container.nativeElement.getBoundingClientRect();
      this.imageWidth =
        containerBounds.width - this.offset * (this.stackSize - 1);
      this.imageHeight =
        containerBounds.height - this.offset * (this.stackSize - 1);
    }

    this.changeDetector.markForCheck();
  }

  getRandomArbitrary(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  getAnimationDelay(): number {
    return this.getRandomArbitrary(0, 4000);
  }
}
