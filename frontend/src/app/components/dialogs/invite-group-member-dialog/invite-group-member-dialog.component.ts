import { Component, Inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from '@rmtd/common/interfaces';
import { debounceTime, first, Observable, Subject, takeUntil, tap } from 'rxjs';
import { getGrouplessUsers, selectGrouplessUsersSearchResults } from 'src/app/state/group';
import { BaseDialogComponent } from '../base-dialog/base-dialog.component';
import { DIALOG_DATA } from '../base/dialog-tokens';
import { DialogRef } from '../base/dialogRef';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'invite-group-member-dialog',
  templateUrl: './invite-group-member-dialog.component.html',
  styleUrls: ['./invite-group-member-dialog.component.scss'],
})
export class InviteGroupMemberDialogComponent
  extends BaseDialogComponent
  implements OnDestroy, OnInit
{
  usersToInvite: User[] = [];

  showSearchResults = false;

  searchResults: User[] = [];

  private searchResults$: Observable<User[]>;

  private readonly searchSubject = new Subject<string | undefined>();

  private destroyed$ = new Subject<void>();

  constructor(
    dialogRef: DialogRef,
    @Inject(DIALOG_DATA) data: { errors: string[] },
    private store: Store
  ) {
    super(dialogRef, data);

    this.searchResults$ = this.store.select(selectGrouplessUsersSearchResults);
    this.searchResults$.pipe(takeUntil(this.destroyed$)).subscribe((searchResults: User[]) => {
      this.searchResults = searchResults;
      this.filterSearchResults();
      this.showSearchResults = true;
    });
    this.searchResults$.pipe(first(), takeUntil(this.destroyed$)).subscribe(() => {
      this.showSearchResults = false;
    });
  }

  ngOnInit(): void {
    this.searchSubject
      .pipe(
        takeUntil(this.destroyed$),
        debounceTime(300),
        tap((searchQuery) => {
          this.store.dispatch(getGrouplessUsers({ searchText: searchQuery?.trim() ?? '' }));
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }

  sendInvites(): void {
    // TODO: dispatch action that send group invites
    this.close();
  }

  removeUserFromInvitesToSend(user: User): void {
    this.usersToInvite = this.usersToInvite.filter((userToInvite) => {
      return userToInvite.id !== user.id;
    });
  }

  onSearchQueryInput(event: Event): void {
    const searchQuery = (event.target as HTMLInputElement).value;
    this.searchSubject.next(searchQuery?.trim());
  }

  handleSearchResultClick(searchResult: User) {
    if (!this.usersToInvite.some((user) => user.id === searchResult.id)) {
      this.usersToInvite.push(searchResult);
      this.filterSearchResults();
      this.showSearchResults = this.searchResults.length > 0;
    }
  }

  filterSearchResults() {
    this.searchResults = this.searchResults.filter((result) => {
      return !this.usersToInvite.some((user) => user.id === result.id);
    });
  }
}
