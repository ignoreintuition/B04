import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  imports: [FormsModule, MatFormFieldModule, MatInputModule],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  name = '';
  getName() {
    this.name = this.dataService.getName();
  }
  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.getName();
  }
}
