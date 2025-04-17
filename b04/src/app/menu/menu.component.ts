import { Component, OnInit } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-menu',
  imports: [RouterLink, MatButtonModule, MatMenuModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent implements OnInit {
  loggedIn = true;
  constructor(
    private authService: AuthService,

    private router: Router,
  ) {}
  ngOnInit() {
    this.loggedIn = localStorage.getItem('token') === null;
  }

  logout() {
    localStorage.setItem('token', '');
    this.loggedIn = false;
    this.router.navigate(['/login']);
    return;
  }
}
