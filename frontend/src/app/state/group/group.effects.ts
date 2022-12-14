import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { GroupService } from './group.service';
import * as GroupActions from './group.actions';
import * as AuthenticationActions from '../authentication/authentication.actions';
import * as ApplicationActions from '../application/application.actions';
import { catchError, EMPTY, map, Observable, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { selectCurrentUser } from '../authentication';
import { select, Store } from '@ngrx/store';
import { ResponseGroupDto, ResponsePostDto } from '@rmtd/common/dtos';
import { User } from '@rmtd/common/interfaces';
import { selectCurrentUserGroup } from './group.selector';
import { PostService } from '../post/post.service';

@Injectable()
export class GroupEffects {
  pageLoad$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GroupActions.myGroupPageLoaded),
      switchMap((): Observable<any> => {
        console.log('My group page loaded');
        return EMPTY;
      })
    )
  );

  getGroupById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GroupActions.getGroupById),

      switchMap((action: any): Observable<any> => {
        if (action.id == null) {
          return EMPTY;
        }
        return this.groupService.getGroupById(action.id).pipe(
          map((group: any) => {
            return GroupActions.getGroupByIdSuccess({ group });
          }),
          catchError((error: any) => {
            return of(GroupActions.getGroupByIdFailure({ error }));
          })
        );
      })
    )
  );

  getCurrentUserGroup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        GroupActions.myGroupPageLoaded,
        GroupActions.getMyGroup,
        GroupActions.sendGroupInvitationsSuccess,
        GroupActions.acceptGroupInvitationSuccess,
        AuthenticationActions.loginSuccess,
        AuthenticationActions.signupSuccess,
        AuthenticationActions.reAuthenticateSuccess,
        GroupActions.createGroupPostSuccess,
        GroupActions.updateGroupPostSuccess,
        ApplicationActions.applyToPostSuccess,
        ApplicationActions.declineReceivedGroupApplicantSuccess,
        ApplicationActions.acceptReceivedGroupApplicantSuccess
      ),
      withLatestFrom(this.store$.pipe(select(selectCurrentUser))),
      switchMap(([action, currentUser]: any): Observable<any> => {
        if (!currentUser) {
          return EMPTY;
        }
        return this.groupService.getCurrentUserGroup(currentUser).pipe(
          map((group: any) => {
            return GroupActions.getMyGroupSuccess({ group });
          }),
          catchError((error: any) => {
            return of(GroupActions.getMyGroupFailure({ error }));
          })
        );
      })
    )
  );

  getCurrentUserInvitations$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        GroupActions.myGroupPageLoaded,
        GroupActions.getMyGroupInvitations,
        GroupActions.acceptGroupInvitationSuccess,
        GroupActions.declineGroupInvitationSuccess
      ),
      withLatestFrom(this.store$.pipe(select(selectCurrentUser))),
      switchMap(([action, currentUser]: any): Observable<any> => {
        if (!currentUser) {
          return EMPTY;
        }
        return this.groupService.getCurrentUserInvitations(currentUser).pipe(
          map((invitations: any[]) => {
            return GroupActions.getMyGroupInvitationsSuccess({ invitations });
          }),
          catchError((error: any) => {
            return of(GroupActions.getMyGroupInvitationsFailure({ error }));
          })
        );
      })
    )
  );

  createGroup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GroupActions.createGroup),
      withLatestFrom(this.store$.pipe(select(selectCurrentUser))),
      switchMap(([action, currentUser]: any): Observable<any> => {
        if (!currentUser || !action.group) {
          return EMPTY;
        }
        return this.groupService.createGroup(action.group).pipe(
          map((group: ResponseGroupDto) => {
            return GroupActions.createGroupSuccess({ group });
          }),
          catchError((error: any) => {
            return of(GroupActions.createGroupFailure({ error }));
          })
        );
      })
    )
  );

  deleteMyGroup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GroupActions.deleteMyGroup),
      withLatestFrom(this.store$.pipe(select(selectCurrentUser))),
      switchMap(([action, currentUser]: any): Observable<any> => {
        if (!currentUser) {
          return EMPTY;
        }
        return this.groupService.deleteMyGroup().pipe(
          map(() => {
            return GroupActions.deleteMyGroupSuccess();
          }),
          catchError((error: any) => {
            return of(GroupActions.deleteMyGroupFailure({ error }));
          })
        );
      })
    )
  );

  createGroupPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GroupActions.createGroupPost),
      withLatestFrom(this.store$.pipe(select(selectCurrentUser))),
      switchMap(([action, currentUser]: any): Observable<any> => {
        if (!currentUser || !action.post) {
          return EMPTY;
        }
        return this.postService.createPost(action.post).pipe(
          map((post: ResponsePostDto) => {
            return GroupActions.createGroupPostSuccess({ post });
          }),
          catchError((error: any) => {
            return of(GroupActions.createGroupPostFailure({ error }));
          })
        );
      })
    )
  );

  updateGroupPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GroupActions.updateGroupPost),
      withLatestFrom(this.store$.pipe(select(selectCurrentUser))),
      switchMap(([action, currentUser]: any): Observable<any> => {
        if (!currentUser || !action.post) {
          return EMPTY;
        }
        return this.postService.updatePost(action.post).pipe(
          map((post: ResponsePostDto) => {
            return GroupActions.updateGroupPostSuccess({ post });
          }),
          catchError((error: any) => {
            return of(GroupActions.updateGroupPostFailure({ error }));
          })
        );
      })
    )
  );

  saveGroup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GroupActions.saveGroup),
      withLatestFrom(this.store$.pipe(select(selectCurrentUser))),
      switchMap(([action, currentUser]: any): Observable<any> => {
        if (!currentUser || !action.mutatedGroup) {
          return EMPTY;
        }
        return this.groupService.saveGroup(action).pipe(
          map((group: ResponseGroupDto) => {
            return GroupActions.saveGroupSuccess({ group });
          }),
          catchError((error: any) => {
            return of(GroupActions.saveGroupFailure({ error }));
          })
        );
      })
    )
  );

  leaveGroup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GroupActions.leaveGroup),
      withLatestFrom(this.store$.pipe(select(selectCurrentUser))),
      switchMap(([action, currentUser]: any): Observable<any> => {
        if (!currentUser) {
          return EMPTY;
        }
        return this.groupService.leaveGroup(currentUser.id).pipe(
          map(() => {
            return GroupActions.leaveGroupSuccess();
          }),
          catchError((error: any) => {
            return of(GroupActions.saveGroupFailure({ error }));
          })
        );
      })
    )
  );

  getGrouplessUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GroupActions.getGrouplessUsers),
      switchMap((action): Observable<any> => {
        return this.groupService.getGrouplessUsers(action.searchText).pipe(
          map((grouplessUsers: User[]) => {
            return GroupActions.getGrouplessUsersSuccess({ grouplessUsers });
          }),
          catchError((error: any) => {
            return of(GroupActions.getGrouplessUsersFailure({ error }));
          })
        );
      })
    )
  );

  sendGroupInvitations$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GroupActions.sendGroupInvitations),
      withLatestFrom(this.store$.pipe(select(selectCurrentUserGroup))),
      switchMap(([action, currentUserGroup]): Observable<any> => {
        if (!currentUserGroup || currentUserGroup.id === undefined) {
          return EMPTY;
        }
        return this.groupService.sendGroupInvitations(action.users, currentUserGroup.id).pipe(
          map(() => {
            return GroupActions.sendGroupInvitationsSuccess();
          }),
          catchError((error: any) => {
            return of(GroupActions.sendGroupInvitationsFailure({ error }));
          })
        );
      })
    )
  );

  declineGroupInvitation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GroupActions.declineGroupInvitation),
      switchMap((action): Observable<any> => {
        return this.groupService.declineGroupInvitation(action.invitation).pipe(
          map(() => {
            return GroupActions.declineGroupInvitationSuccess();
          }),
          catchError((error: any) => {
            return of(GroupActions.declineGroupInvitationFailure({ error }));
          })
        );
      })
    )
  );

  acceptGroupInvitation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GroupActions.acceptGroupInvitation),
      withLatestFrom(
        this.store$.pipe(select(selectCurrentUserGroup)),
        this.store$.pipe(select(selectCurrentUser))
      ),
      switchMap(([action, currentUserGroup, currentUser]): Observable<any> => {
        if (!currentUser) return EMPTY;
        return this.groupService
          .acceptGroupInvitation(action.invitation, currentUserGroup, currentUser)
          .pipe(
            map(() => {
              return GroupActions.acceptGroupInvitationSuccess();
            }),
            catchError((error: any) => {
              return of(GroupActions.acceptGroupInvitationFailure({ error }));
            })
          );
      })
    )
  );

  constructor(
    private actions$: Actions<any>,
    private store$: Store,
    private groupService: GroupService,
    private postService: PostService
  ) {}
}
