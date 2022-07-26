import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Application, Post, PostFilter } from '@rmtd/common/interfaces';
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

  declineApplication(applicant: Application){
    return this.http.put(`${environment.serverUrl}/applications/${applicant.id}/deny`, null)
  }

  acceptApplication(applicant: Application){
    return this.http.put(`${environment.serverUrl}/applications/${applicant.id}/accept`, {...applicant})
  }
}
