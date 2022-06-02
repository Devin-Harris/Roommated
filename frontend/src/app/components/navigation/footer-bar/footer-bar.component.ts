import { Component } from '@angular/core';

@Component({
  selector: 'footer-bar',
  templateUrl: './footer-bar.component.html',
  styleUrls: ['./footer-bar.component.scss'],
})
export class FooterComponent {
  currentDate = new Date(Date.now());

  constructor() {}

  goToTopOfPage(): void {
    const pageScrollContainer = document.getElementById(
      'page-scroll-container'
    );
    pageScrollContainer?.scrollTo({ top: 0, behavior: 'smooth' });
  }

  goToTwitter(): void {
    // TODO: create custom twitter and link here
    window.open('https://twitter.com');
  }
  
  goToGithub(): void {
    // TODO: create custom github and link here
    window.open('https://github.com');
  }
}
