import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Post, PostFilter } from '@rmtd/common/interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  constructor(private http: HttpClient) {}

  getFilteredPosts(mapFilter: PostFilter): Observable<Post[]> {
    return this.http.put<Post[]>(`${environment.serverUrl}/post`, mapFilter);
  }
}
