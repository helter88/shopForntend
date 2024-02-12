import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Chart, ChartData, registerables } from 'chart.js';
import { AdminOrderService } from '../admin-order.service';

@Component({
  selector: 'app-admin-order-statistics',
  templateUrl: './admin-order-statistics.component.html',
  styleUrls: ['./admin-order-statistics.component.scss']
})
export class AdminOrderStatisticsComponent implements AfterViewInit {
  
  @ViewChild("stats") private satats!: ElementRef;
  chart!: Chart;

  orderCount: number = 0;
  salesSum: number = 0;

  private data = {
    labels: [],
    datasets: [
      {
        label: 'Zamówienia',
        data: [],
        borderColor: '#FF3F7C',
        backgroundColor: '#FF7A9F',
        order: 1,
        yAxisID: 'y'
      },
      {
        label: 'Sprzedaż',
        data: [],
        borderColor: '#0088FF',
        backgroundColor: '#00A1FF ',
        type: 'line',
        order: 0,
        yAxisID: 'y1'
      }
    ]
  } as ChartData;

  constructor(
    private adminOrderService: AdminOrderService,
  ){
    Chart.register(...registerables);
  }
  
  ngAfterViewInit(): void {
    this.setupChart();
    this.getSalesStatistics()
  }
  setupChart() {
    this.chart = new Chart(this.satats.nativeElement, {
      type: 'bar',
      data: this.data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Sales chart'
          }
        },
        scales: {
          y: {
            type: 'linear',
            display: true,
            position: 'left',
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',
                // grid line settings
            grid: {
              drawOnChartArea: false, // only want the grid lines for one axis to show up
            },
          }
        }
      },
    });
  }

  getSalesStatistics(){
    this.adminOrderService.getSalesStatistics()
      .subscribe(stats => {
        this.data.labels = stats.labels;
        this.data.datasets[0].data = stats.orders;
        this.data.datasets[1].data = stats.sales;
        this.chart.update();
        this.orderCount = stats.orders.reduce((acc: number, value: number) => acc + value);
        this.salesSum = stats.sales.reduce((acc: number, value: number) => acc + value);
      });
  }
}
