import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Post } from '@rmtd/common/interfaces';
import { Observable, Subject, takeUntil } from 'rxjs';
import { selectFilteredMapPosts } from 'src/app/state/map';

@Component({
  selector: 'map-page',
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.scss'],
})
export class MapPageComponent implements OnDestroy {
  sidebarPost: Post | null = null;

  forceOpenState: boolean | null = null;

  private $filteredMapPosts: Observable<any>;

  private $destroyed = new Subject<void>();

  constructor(private store: Store) {
    this.$filteredMapPosts = this.store.select(selectFilteredMapPosts);
    this.$filteredMapPosts.pipe(takeUntil(this.$destroyed)).subscribe((posts) => {
      if (this.sidebarPost === null && posts.length > 0) {
        this.sidebarPost = posts[0];
      }
    });
  }

  ngOnDestroy(): void {
    this.$destroyed.next();
  }

  handleMapPinClick(post: Post): any {
    this.sidebarPost = post;
    this.forceOpenState = true;
  }

  handleForceOpenStateSuccess(): void {
    this.forceOpenState = null;
  }
}
