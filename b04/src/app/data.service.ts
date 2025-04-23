import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private dataSubject = new ReplaySubject<any>(1);
  public data$: Observable<any> = this.dataSubject.asObservable();

  private enrollmentDataSubject = new ReplaySubject<any>(1);
  public enrollmentData$: Observable<any> =
    this.enrollmentDataSubject.asObservable();

  private admissionDataSubject = new ReplaySubject<any>(1);
  public admissionData$: Observable<any> =
    this.admissionDataSubject.asObservable();

  constructor(private http: HttpClient) {}
  public login() {
    this.http
      .get<any>('http://localhost:3000/api/login')
      .subscribe((res) => this.dataSubject.next(res));
  }
  public getNews(): any {
    const headerDict = new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    this.http
      .get<any>('http://localhost:3000/api', requestOptions)
      .subscribe((res) => this.dataSubject.next(res));
  }
  public getEnrollment(): any {
    const headerDict = new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    this.http
      .get<any>('http://localhost:3000/api/enrollment', requestOptions)
      .subscribe((res) => this.enrollmentDataSubject.next(res));
  }

  public getAdmission(): any {
    const headerDict = new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    this.http
      .get<any>('http://localhost:3000/api/admission', requestOptions)
      .subscribe((res) => this.admissionDataSubject.next(res));
  }
}
