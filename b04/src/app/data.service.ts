import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  name = 'Brian';
  constructor() {}
  getName() {
    return this.name;
  }
}
