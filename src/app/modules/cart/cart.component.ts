import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from './cart.service';
import { CartSummary } from './cart-summary.model';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {

  summary!: CartSummary;

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private cookieService: CookieService,
    private router: Router
  ){}

  ngOnInit() {
    const id = Number(this.route.snapshot.queryParams['productId']);
    id > 0 ? this.addToCart(id) : this.getCart();
  }
  getCart(){
    const cartId = Number(this.cookieService.get("cartId"));
    if(cartId > 0){
      this.cartService.getCart(cartId)
        .subscribe(summary => this.summary = summary);
    }
  }

  addToCart(id: number){
    const cartId = Number(this.cookieService.get("cartId"));
    console.log(cartId);
    this.cartService.addToCart(cartId, {productId: id, quantity: 1})
      .subscribe(summary => {
        this.summary = summary;
        this.cookieService.delete("cartId");
        this.cookieService.set("cartId", summary.id.toString(), this.expiresDays(3));
        this.router.navigate(["cart"]);
      })
  }
  expiresDays(days: number): Date {
    return new Date(Date.now() + days * 24 * 60 * 60 * 1000);
  }
}
