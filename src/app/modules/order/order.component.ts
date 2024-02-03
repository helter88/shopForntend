import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CartCommonService } from 'src/app/shared/services/cart-common.service';
import { CartSummary } from '../cart/cart-summary.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderService } from './order.service';
import { Order, OrderSummary } from './order.model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent {

  cartSummary!: CartSummary;
  formGroup!: FormGroup;
  orderSummary!: OrderSummary;

  constructor(
    private cookieService: CookieService,
    private cartCommonService: CartCommonService,
    private orderService: OrderService,
    private formBuilder: FormBuilder
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
    })
  }

  checkCartEmpty() {
    const cartId = Number(this.cookieService.get("cartId"));
    console.log("cartID: ", cartId);
    this.cartCommonService.getCart(cartId)
      .subscribe(summary => {
        this.cartSummary = summary;
      });
  }

  submit(){
    if(this.formGroup.valid){
      this.orderService.placeOrder({

      } as Order)
      .subscribe(summary => {
        this.orderSummary = summary;
        this.cookieService.delete("cartId");
      })
    }
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
}
