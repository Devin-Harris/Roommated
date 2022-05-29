import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient) { }

  // TODO: put typing on loginBody param, interact with backend through http request, and put typing on returned observable
  login(loginBody: any): Observable<any> {
    return of(true)
    // return this.http.post<any>(`${environment.serverUrl}/api/login`, {
    //   body: loginBody
    // });
  }
}