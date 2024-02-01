import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from './cart.service';
import { CartSummary, CartSummaryItem } from './cart-summary.model';
import { CookieService } from 'ngx-cookie-service';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { CartIconService } from 'src/app/shared/services/cart-icon.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {

  summary!: CartSummary;

  formGroup!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private cookieService: CookieService,
    private router: Router,
    private formBuilder: FormBuilder,
    private cartIconService: CartIconService
  ){}

  ngOnInit() {
    const id = Number(this.route.snapshot.queryParams['productId']);
    id > 0 ? this.addToCart(id) : this.getCart();

    this.formGroup = this.formBuilder.group({
      items: this.formBuilder.array([])
    })
  }
  getCart(){
    const cartId = Number(this.cookieService.get("cartId"));
    if(cartId > 0){
      this.cartService.getCart(cartId)
        .subscribe(summary => {
          this.summary = summary;
          this.patchFormItems();
          this.cartIconService.cartChanged(summary.items.length);
        });
    }
  }

  addToCart(id: number){
    const cartId = Number(this.cookieService.get("cartId"));
    this.cartService.addToCart(cartId, {productId: id, quantity: 1})
      .subscribe(summary => {
        this.summary = summary;
        this.patchFormItems();
        this.cartIconService.cartChanged(summary.items.length);
        this.cookieService.delete("cartId");
        this.cookieService.set("cartId", summary.id.toString(), this.expiresDays(3));
        this.router.navigate(["cart"]);
      })
  }

  expiresDays(days: number): Date {
    return new Date(Date.now() + days * 24 * 60 * 60 * 1000);
  }

  submit(){
    const cartId = Number(this.cookieService.get("cartId"));
   
    this.cartService.updateCart(cartId, this.mapToRequestListDto())
      .subscribe(summary => {
        this.summary = summary;
        this.formGroup.get("items")?.setValue(summary.items)
    })
  }
  mapToRequestListDto(): any[] {
    const items: CartSummaryItem[] = this.formGroup.get("items")?.value;
    return items.map(item => ({
      productId: item.product.id,
      quantity: item.quantity
    }))
  }

  patchFormItems(){
    const formItems = <FormArray>this.formGroup.get("items");
    this.summary.items.forEach(item => {
      formItems.push(this.formBuilder.group({
        id: [item.id],
        quantity: [item.quantity],
        product: [item.product],
        lineValue: [item.lineValue]
      }))
    })
  }

  get items(){
    return (this.formGroup.get("items") as FormArray).controls
  }

  deleteItem(id: number){
    this.cartService.deleteCartItem(id)
      .subscribe(() => this.ngOnInit());
  }
}
