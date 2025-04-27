import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private dataSubject = new ReplaySubject<any>(1);
  public data$: Observable<any> = this.dataSubject.asObservable();
  private loggedIn = false;
  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  public login(username: any, password: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    this.http
      .post<any>(
        'http://165.227.114.183:3000/api/login',
        { username, password },
        httpOptions,
      )
      .subscribe((res: any) => {
        if (res.success == true) {
          localStorage.setItem('token', res.token);
          this.loggedIn = true;
          this.router.navigate(['/dashboard']);
        } else {
        }
        this.dataSubject.next(res);
      });
  }
  public isLoggedIn() {
    return this.loggedIn;
  }
  public validate() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.loggedIn = false;
      this.router.navigate(['/login']);
      return;
    }
    const decodedToken = jwtDecode(token);
    const now = Math.floor(Date.now());
    if (decodedToken?.exp && now > decodedToken.exp * 1000) {
      localStorage.removeItem('token');
      this.loggedIn = false;
      this.router.navigate(['/login']);
      return;
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    this.http
      .post<any>(
        'http://165.227.114.183:3000/api/validate',
        { token },
        httpOptions,
      )
      .subscribe((res: any) => {
        if (res.success !== true) {
          this.loggedIn = false;
          this.router.navigate(['/login']);
        }
        this.dataSubject.next(res);
      });
  }
}
