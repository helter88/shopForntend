import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminOrderService } from '../admin-order.service';

@Component({
  selector: 'app-admin-order-export',
  templateUrl: './admin-order-export.component.html',
  styleUrls: ['./admin-order-export.component.scss']
})
export class AdminOrderExportComponent {

  formGroup!: FormGroup;
  statuses: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private adminOrderService: AdminOrderService
  ){}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      from: ['', Validators.required],
      to: ['', Validators.required],
      orderStatus: ['', Validators.required]
    })
    this.getStatuses();
  }

  export(){

    this.adminOrderService.exportOrders(
      this.formGroup.get("from")?.value.toISOString(),
      this.formGroup.get("to")?.value.toISOString(),
      this.formGroup.get("orderStatus")?.value
      )
      .subscribe(response =>{
        let a = document.createElement('a');
        let objectUrl = URL.createObjectURL(response.body);
        a.href = objectUrl;
        a.download = response.headers.get("Content-Disposition");
        a.click();
        URL.revokeObjectURL(objectUrl);
      })
  }

  getStatuses() {
    this.adminOrderService.getStatuses()
      .subscribe(statuses => this.statuses = statuses);
  }
}
