import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CartCommonService } from 'src/app/shared/services/cart-common.service';
import { CartSummary } from '../cart/cart-summary.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderService } from './order.service';
import { InitData, Order, OrderSummary } from './order.model';
import { CartIconService } from 'src/app/shared/services/cart-icon.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent {

  cartSummary!: CartSummary;
  formGroup!: FormGroup;
  orderSummary!: OrderSummary;
  initData!: InitData;

  constructor(
    private cookieService: CookieService,
    private cartCommonService: CartCommonService,
    private orderService: OrderService,
    private formBuilder: FormBuilder,
    private cartIconService: CartIconService
  ){}

  ngOnInit() {
    this.checkCartEmpty();
    this.formGroup = this.formBuilder.group({
      firstname:['', Validators.required],
      lastname:['', Validators.required],
      street:['', Validators.required],
      zipcode:['', Validators.required],
      city:['', Validators.required],
      email:['', [Validators.required, Validators.email]],
      phone:['', Validators.required],
      shipment:['', Validators.required],
    })

    this.getInitData();
  }

  checkCartEmpty() {
    const cartId = Number(this.cookieService.get("cartId"));
    this.cartCommonService.getCart(cartId)
      .subscribe(summary => {
        this.cartSummary = summary;
      });
  }

  submit(){
    if(this.formGroup.valid){
      const cartId = Number(this.cookieService.get("cartId"));
      const shipmentId = Number(this.formGroup.get("shipment")?.value.id);
      const {shipment, ...formToSend} = this.formGroup.value;
      this.orderService.placeOrder({
        ...formToSend,
        cartId,
        shipmentId
      } as Order)
      .subscribe(summary => {
        this.orderSummary = summary;
        this.cookieService.delete("cartId");
        this.cartIconService.cartChanged(null);
      })
    }
  }

  getInitData(){
    this.orderService.getInitData()
      .subscribe(initData => {
        this.initData = initData;
        this.setDefaultShipment();
      });
  }

  setDefaultShipment(){
    this.formGroup.patchValue({"shipment": this.initData.shipments.filter(shipment => shipment.defaultShipment === true)[0]})
  }

  get firstname(){
    return this.formGroup.get("firstname");
  }
  get lastname(){
    return this.formGroup.get("lastname");
  }
  get street(){
    return this.formGroup.get("street");
  }
  get zipcode(){
    return this.formGroup.get("zipcode");
  }
  get city(){
    return this.formGroup.get("city");
  }
  get email(){
    return this.formGroup.get("email");
  }
  get phone(){
    return this.formGroup.get("phone");
  }
  get shipment(){
    return this.formGroup.get("shipment");
  }
}
