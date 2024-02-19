import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HeaderService } from './header.service';
import { CartIconService } from '../../services/cart-icon.service';
import { JwtService } from '../../services/jwt.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  cartProductCounter: number | null = 0;
  isLoggedIn = false;

  constructor(
    private cookieService: CookieService,
    private headerService: HeaderService,
    private cartIconService: CartIconService,
    private jwtService: JwtService,
  ){}

  ngOnInit(){
    this.getCountProducts();
    this.cartIconService.subject
      .subscribe(counter => this.cartProductCounter = counter && counter > 0 ? counter: null);
    this.isLoggedIn = this.jwtService.isLoggedIn();
  }

  getCountProducts(){
    this.headerService.getCountProducts(Number(this.cookieService.get("cartId")))
      .subscribe(count => this.cartProductCounter = count > 0 ? count: null)
  }

}
