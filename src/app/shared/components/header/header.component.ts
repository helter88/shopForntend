import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HeaderService } from './header.service';
import { CartIconService } from '../../services/cart-icon.service';
import { JwtService } from '../../services/jwt.service';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  cartProductCounter: number | null = 0;
  isLoggedIn = false;

  control = new FormControl('');
  products: string[] = ['Champs-Prod1', 'Lombard Prod2', 'Abbey Prod3', 'Fifth Prod4'];
  filteredStreets!: Observable<string[]>;

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
    this.filteredStreets = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  getCountProducts(){
    this.headerService.getCountProducts(Number(this.cookieService.get("cartId")))
      .subscribe(count => this.cartProductCounter = count > 0 ? count: null)
  }

  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.products.filter(product => this._normalizeValue(product).includes(filterValue));
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

}
