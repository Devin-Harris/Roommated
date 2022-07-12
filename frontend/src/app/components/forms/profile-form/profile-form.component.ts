import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Gender, GroupUserRole } from '@rmtd/common/enums';
import { Group, User } from '@rmtd/common/interfaces';
import { Observable, Subject, takeUntil } from 'rxjs';
import { selectCurrentUser } from 'src/app/state/authentication';
import { getMyGroup, selectCurrentUserGroup } from 'src/app/state/group';

@Component({
  selector: 'profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss'],
})
export class ProfileFormComponent implements OnChanges, OnDestroy {
  @Input('canEdit') canEdit = false;

  @Input('user') user!: User | null;

  @ViewChild('profileImage') profileImage!: ElementRef;

  form!: FormGroup;

  hasChanges = false;

  profileImageSrc: string | ArrayBuffer | null | undefined = null;

  $currentUserGroup: Observable<Group | null>;

  currentUserGroup: Group | null = null;

  $currentUser: Observable<User | null>;

  currentUser: User | null = null;

  readonly genderOptions = Object.keys(Gender);

  private $destroyed = new Subject<void>();

  constructor(private fb: FormBuilder, private store: Store) {
    this.store.dispatch(getMyGroup());
    this.initializeForm();
    this.$currentUserGroup = this.store.select(selectCurrentUserGroup);
    this.$currentUserGroup.pipe(takeUntil(this.$destroyed)).subscribe((group) => {
      this.currentUserGroup = group;
    });
    this.$currentUser = this.store.select(selectCurrentUser);
    this.$currentUser.pipe(takeUntil(this.$destroyed)).subscribe((user) => {
      this.currentUser = user;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes['user']) {
      this.initializeForm();
    }
  }

  ngOnDestroy(): void {
    this.$destroyed.next();
  }

  initializeForm(): void {
    this.form = this.fb.group({
      firstname: new FormControl(this.user?.firstname, Validators.required),
      lastname: new FormControl(this.user?.lastname, Validators.required),
      email: new FormControl(this.user?.email, [Validators.required, Validators.email]),
      phone: new FormControl(this.user?.phone, Validators.pattern(new RegExp('[0-9]{10}'))),
      birthdate: new FormControl(
        this.user?.birthdate ? new Date(this.user.birthdate).toISOString().slice(0, 10) : null,
        Validators.required
      ),
      gender: new FormControl(this.user?.gender, Validators.required),
      bio: new FormControl(this.user?.bio),
    });

    this.profileImageSrc = this.user?.profileImageUrl;
  }

  submitForm(): void {
    // Update /users/me
    // const profileImage = this.profileImage?.nativeElement?.files[0];
    // if (profileImage) {
    //   payload.profileImage = profileImage;
    // }
  }

  handleFileUploadButtonClick(): void {
    this.profileImage.nativeElement.click();
  }

  getUserCreateDateString(): string {
    return this.user?.createDate
      ? new Date(this.user.createDate).toLocaleDateString()
      : 'at an unknown time';
  }

  cancelChanges(): void {
    this.hasChanges = false;
    this.initializeForm();
  }

  setFormChanges(): void {
    this.hasChanges = true;
  }

  handleProfileImageChange(): void {
    const file = this.profileImage?.nativeElement?.files[0];
    const fr = new FileReader();
    fr.onload = () => {
      this.profileImageSrc = fr.result;
      this.setFormChanges();
    };
    fr.readAsDataURL(file);
  }

  currentUserCanInviteToGroup(): boolean {
    if (!this.currentUserGroup || !this.currentUserGroup.groupUsers || !this.currentUser)
      return false;

    return (
      this.currentUserGroup.groupUsers.some((groupUser) => {
        return (
          groupUser.userId === this.currentUser?.id &&
          (groupUser.groupRole === GroupUserRole.Admin ||
            groupUser.groupRole === GroupUserRole.Owner)
        );
      }) &&
      !this.currentUserGroup.groupUsers.some((groupUser) => {
        return groupUser.userId === this.user?.id;
      })
    );
  }
}
