import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-summary',
  imports: [],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss',
})
export class SummaryComponent {
  constructor(private authService: AuthService) {}
  ngOnInit() {
    this.authService.validate();
  }
}
