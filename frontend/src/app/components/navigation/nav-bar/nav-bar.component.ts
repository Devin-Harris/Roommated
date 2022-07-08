import { Component, ElementRef, OnDestroy, Renderer2, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from '@rmtd/common/interfaces';
import { Observable } from 'rxjs';
import { selectCurrentUser, selectIsLoggedIn, signout } from 'src/app/state/authentication';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavbarComponent implements OnDestroy {
  @ViewChild('avatarToggleButton') avatarToggleButton: ElementRef | undefined;

  @ViewChild('avatarActions') avatarActions: ElementRef | undefined;

  isLoggedIn$: Observable<boolean>;

  currentUser$: Observable<User | null>;

  showingAvatarActions = false;

  private outsideClickListener: () => void;

  constructor(private store: Store, private renderer: Renderer2) {
    this.isLoggedIn$ = this.store.select(selectIsLoggedIn);
    this.currentUser$ = this.store.select(selectCurrentUser);

    this.outsideClickListener = this.renderer.listen('window', 'click', (e: Event) => {
      if (
        e.target !== this.avatarToggleButton?.nativeElement &&
        e.target !== this.avatarActions?.nativeElement
      ) {
        this.showingAvatarActions = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.outsideClickListener();
  }

  showAvatarActions(): void {
    this.showingAvatarActions = true;
  }

  handleSignout(): void {
    this.store.dispatch(signout());
  }
}
