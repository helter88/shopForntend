import { Component, ViewChild } from '@angular/core';
import { AdminOrder } from '../admin-order.model';
import { MatPaginator } from '@angular/material/paginator';
import { AdminOrderService } from '../admin-order.service';
import { map, startWith, switchMap } from 'rxjs';

@Component({
  selector: 'app-admin-order-list',
  templateUrl: './admin-order-list.component.html',
  styleUrls: ['./admin-order-list.component.scss']
})
export class AdminOrderListComponent {
  displayedColumns: string[] = ["id", "placeDate", "orderStatus", "grossValue", "actions"];
  totalElements: number = 0;
  data: AdminOrder[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  constructor(private adminOrderService: AdminOrderService) { }

  ngAfterViewInit(): void {
    this.paginator.page.pipe(
      startWith({}),
      switchMap(() => {
        return this.adminOrderService.getOrders(this.paginator.pageIndex, this.paginator.pageSize);
      }),
      map(data => {
        if (data === null) {
          return [];
        }
        this.totalElements = data.totalElements;
        return data.content;
      })
    ).subscribe(data => this.data = data);
  }

}
