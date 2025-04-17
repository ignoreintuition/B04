import { Component } from '@angular/core';
import { ArticleComponent } from '../article/article.component';
import { AuthService } from '../auth.service';
import { DataService } from '../data.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [ArticleComponent, NgFor],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  articles: any[] = [];
  constructor(
    private authService: AuthService,
    private dataService: DataService,
  ) {}
  ngOnInit() {
    this.authService.validate();
    this.articles = this.dataService.getNews();
    this.dataService.data$.subscribe((res: any) => {
      this.articles = res.data;
    });
  }
}
