import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post, PostFilter } from '@rmtd/common/interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApplicationService {
  constructor(private http: HttpClient) {}

  applyToPost(postId: number, comment: string): Observable<void> {
    return this.http.post<void>(`${environment.serverUrl}/applications`, {
      postId,
      comment,
    });
  }
}
