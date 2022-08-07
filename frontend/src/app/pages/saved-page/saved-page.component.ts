import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { PostSave } from '@rmtd/common/interfaces';
import { storeMapFilters } from 'src/app/state/map';
import { PostService } from 'src/app/state/post/post.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'saved-page',
  templateUrl: './saved-page.component.html',
  styleUrls: ['./saved-page.component.scss'],
})
export class SavedPageComponent implements OnInit {
  savedPosts: PostSave[] | undefined = [];

  constructor(private store: Store, private router: Router, private postService: PostService) {}

  async ngOnInit(): Promise<void> {
    await this.initializeMySavedPosts();
  }

  async initializeMySavedPosts(): Promise<void> {
    this.savedPosts = await this.postService.getMySavedPost().toPromise();
  }

  async unsavePostSave(postSave: PostSave): Promise<void> {
    await this.postService.removeSavedPost(postSave.id!).toPromise();
    await this.initializeMySavedPosts();
  }

  viewPostSavePost(postSave: PostSave): void {
    if (postSave && postSave.post) {
      this.store.dispatch(
        storeMapFilters({
          filters: {
            mapCenterLat: postSave.post.location.lat,
            mapCenterLng: postSave.post.location.lng,
            mapZoom: 16,
          },
        })
      );

      requestAnimationFrame(() => {
        this.router.navigateByUrl('/map?openSidebarInit=true');
      });
    }
  }

  getShowDate(date: Date): string {
    return new Date(date).toISOString().slice(0, 10);
  }
}
