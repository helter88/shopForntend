import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HeaderService } from './header.service';
import { CartIconService } from '../../services/cart-icon.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  cartProductCounter: number | null = 0;

  constructor(
    private cookieService: CookieService,
    private headerService: HeaderService,
    private cartIconService: CartIconService
  ){}

  ngOnInit(){
    this.getCountProducts();
    this.cartIconService.subject
      .subscribe(counter => this.cartProductCounter = counter && counter > 0 ? counter: null);
  }

  getCountProducts(){
    this.headerService.getCountProducts(Number(this.cookieService.get("cartId")))
      .subscribe(count => this.cartProductCounter = count > 0 ? count: null)
  }

}
