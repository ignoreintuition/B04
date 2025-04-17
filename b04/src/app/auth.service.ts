import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private dataSubject = new ReplaySubject<any>(1);
  public data$: Observable<any> = this.dataSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}
  public getToken = () => {
    return 'abc';
  };

  public login(username: any, password: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    this.http
      .post<any>(
        'http://localhost:3000/api/login',
        { username, password },
        httpOptions,
      )
      .subscribe((res: any) => {
        if (res.success == true) {
          localStorage.setItem('token', res.token);
          this.router.navigate(['/dashboard']);
        } else {
          //TODO: add login error handling
        }
        this.dataSubject.next(res);
      });
  }
  public validate() {
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    this.http
      .post<any>('http://localhost:3000/api/validate', { token }, httpOptions)
      .subscribe((res: any) => {
        if (res.success !== true) this.router.navigate(['/login']);
        this.dataSubject.next(res);
      });
  }
}
