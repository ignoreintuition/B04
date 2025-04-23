import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import Chart, { ChartConfiguration } from 'chart.js/auto';
import { DataService } from '../data.service';

@Component({
  selector: 'app-reports',
  imports: [],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss',
})
export class ReportsComponent implements OnInit {
  enrollment: any[] = [];
  data: any[] = [];
  chart: any;
  colors = ['#ea5545', '#27aeef'];
  config: ChartConfiguration = {
    type: 'doughnut',
    data: {
      labels: [],
      datasets: [
        {
          data: [],
          label: 'Enrollment',
          backgroundColor: this.colors,
          hoverOffset: 4,
        },
      ],
    },
    options: {},
  };
  constructor(
    private authService: AuthService,
    private dataService: DataService,
  ) {}
  ngOnInit() {
    this.authService.validate();
    this.dataService.getEnrollment();
  }
  ngAfterViewInit() {
    if (this.chart) this.chart.destroy();
    this.dataService.enrollmentData$.subscribe((res: any) => {
      const canvas: HTMLCanvasElement = document.getElementById(
        'chart',
      ) as HTMLCanvasElement;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          this.config.data.labels = res?.data.map((d: any) => d.profile);
          this.config.data.datasets[0].data = res?.data.map(
            (d: any) => d.total,
          );
          this.chart = new Chart(ctx, this.config);
        }
      }
    });
  }
}
