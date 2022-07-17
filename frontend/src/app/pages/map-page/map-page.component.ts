import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { Post, PostFilter } from '@rmtd/common/interfaces';
import { combineLatest, Observable, Subject, takeUntil } from 'rxjs';
import { selectFilteredMapPosts, selectMapFilters } from 'src/app/state/map';

@Component({
  selector: 'map-page',
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.scss'],
})
export class MapPageComponent implements OnDestroy {
  sidebarPost: Post | null = null;

  forceOpenState: boolean | null = null;

  private $filteredMapPosts: Observable<Post[]>;

  private $mapFilters: Observable<PostFilter | null>;

  private $destroyed = new Subject<void>();

  private queryParams: Params | null = null;

  constructor(private store: Store, private route: ActivatedRoute) {
    this.route.queryParams.pipe(takeUntil(this.$destroyed)).subscribe((qp) => {
      this.queryParams = qp;
    });

    this.$filteredMapPosts = this.store.select(selectFilteredMapPosts);
    this.$mapFilters = this.store.select(selectMapFilters);
    combineLatest(this.$filteredMapPosts, this.$mapFilters)
      .pipe(takeUntil(this.$destroyed))
      .subscribe(([posts, postFilters]) => {
        if (this.sidebarPost === null && posts.length > 0) {
          let closestPostToCenter: { id: null | number; distance: number } = {
            id: null,
            distance: Infinity,
          };
          let closestPost = null;
          if (
            postFilters &&
            postFilters.mapCenterLat !== undefined &&
            postFilters.mapCenterLng !== undefined
          ) {
            posts.forEach((p) => {
              const latDif = p.location.lat - postFilters.mapCenterLat!;
              const lngDif = p.location.lat - postFilters.mapCenterLat!;

              const distFromCenter = Math.sqrt(Math.pow(lngDif, 2) + Math.pow(latDif, 2));
              if (distFromCenter < closestPostToCenter.distance) {
                closestPostToCenter = { id: p.id, distance: distFromCenter };
              }
            });
            closestPost = posts.find((p) => p.id === closestPostToCenter.id);
          }
          this.sidebarPost = closestPost ?? posts[0];

          if (this.queryParams && this.queryParams['openSidebarInit'] === 'true') {
            requestAnimationFrame(() => {
              this.forceOpenState = true;
            });
          }
        }
      });
  }

  ngOnDestroy(): void {
    this.forceOpenState = null;
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
