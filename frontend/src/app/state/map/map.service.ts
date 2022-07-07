import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { PostFilter } from '@rmtd/common/interfaces';
import { Gender } from '@rmtd/common/enums';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  constructor(private http: HttpClient) {}

  getFilteredPosts(mapFilter: PostFilter): Observable<any> {
    /**
     * TODO: make new request to get all posts that match filter
     * */
    const testingPosts = this.randomTestingPosts([
      mapFilter.mapCenterLng ?? 0,
      mapFilter.mapCenterLat ?? 0,
    ]);

    return of(
      testingPosts.filter((post) => {
        return (
          mapFilter.gender?.some((g) => g === Gender.Any) ||
          mapFilter.gender?.some((g) => post.gender === g)
        );
      })
    );
  }

  randomTestingPosts(center: [number, number]): any[] {
    const posts = [];
    for (let i = 0; i < 100; i++) {
      const max = 0.05;
      const x = Math.random() * max;
      const y = Math.random() * max;
      const xMag = Math.floor(Math.random() * 2) ? 1 : -1;
      const yMag = Math.floor(Math.random() * 2) ? 1 : -1;
      posts.push({
        lng: center[0] + x * xMag,
        lat: center[1] + y * yMag,
        id: i,
        gender: i % 2 === 0 ? Gender.Male : Gender.Female,
      });
    }

    return posts;
  }
}
