import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})

export class PageNotFoundComponent {

  constructor(private router: Router) {}

  navigateToSignInPage(): void {
    this.router.navigateByUrl('/signin');
  }

  navigateToHomePage(): void {
    this.router.navigateByUrl('/');
  }
}
