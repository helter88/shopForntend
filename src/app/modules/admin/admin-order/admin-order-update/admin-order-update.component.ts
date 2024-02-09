import { Component } from '@angular/core';
import { AdminOrder } from '../admin-order.model';
import { ActivatedRoute } from '@angular/router';
import { AdminOrderService } from '../admin-order.service';

@Component({
  selector: 'app-admin-order-update',
  templateUrl: './admin-order-update.component.html',
  styleUrls: ['./admin-order-update.component.scss']
})
export class AdminOrderUpdateComponent {
  
  order!: AdminOrder;

  constructor(
    private activatedRoute: ActivatedRoute,
    private adminOrderService: AdminOrderService
    ) { }

  ngOnInit(): void {
    this.getOrder();
  }

  getOrder() {
    let id = Number(this.activatedRoute.snapshot.params['id']);
    this.adminOrderService.getOrder(id)
      .subscribe(order => this.order = order);
  }
}
