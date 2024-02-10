import { Component } from '@angular/core';
import { AdminOrder } from '../admin-order.model';
import { ActivatedRoute } from '@angular/router';
import { AdminOrderService } from '../admin-order.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-order-update',
  templateUrl: './admin-order-update.component.html',
  styleUrls: ['./admin-order-update.component.scss']
})
export class AdminOrderUpdateComponent {
  
  order!: AdminOrder;
  formGroup!: FormGroup;

  statuses: string[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private adminOrderService: AdminOrderService,
    private formBuilder: FormBuilder
    ) { }

  ngOnInit(): void {
    this.getOrder();

    this.formGroup = this.formBuilder.group({
      orderStatus: ['', Validators.required]
    })
    this.getStatuses();
  }

  getOrder() {
    let id = Number(this.activatedRoute.snapshot.params['id']);
    this.adminOrderService.getOrder(id)
      .subscribe(order => {
        this.order = order;
        this.formGroup.setValue({
          orderStatus: order.orderStatus
        })
        this.order.orderLogs.sort((el1, el2) => new Date(el2.created).getTime() - new Date(el1.created).getTime())
      });
  }

  changeStatus() {
    this.adminOrderService.saveStatus(this.order.id, this.formGroup.value)
      .subscribe();
  }

  getStatuses() {
    this.adminOrderService.getStatuses()
      .subscribe(statuses => this.statuses = statuses);
  }
}
