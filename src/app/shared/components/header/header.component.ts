import { Component, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HeaderService } from './header.service';
import { CartIconService } from '../../services/cart-icon.service';
import { JwtService } from '../../services/jwt.service';
import { FormControl } from '@angular/forms';
import { Observable, debounceTime, filter, map, skipWhile, startWith, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  cartProductCounter: number | null = 0;
  isLoggedIn = false;

  control = new FormControl('');
  products: string[] = [];
  filteredProducts!: Observable<string[]>;

  @ViewChild('trigger') autocompleteTrigger!: MatAutocompleteTrigger;

  constructor(
    private cookieService: CookieService,
    private headerService: HeaderService,
    private cartIconService: CartIconService,
    private jwtService: JwtService,
    private router: Router
  ){}

  ngOnInit(){
    this.getCountProducts();
    this.cartIconService.subject
      .subscribe(counter => this.cartProductCounter = counter && counter > 0 ? counter: null);
    this.jwtService.isLoggedInUpdates.subscribe(bool => this.isLoggedIn = bool);
    this.filteredProducts = this.control.valueChanges.pipe(
      debounceTime(300),
      tap(query => {
        if (query === "") {
          this.router.navigate(['/products']);
          if (this.autocompleteTrigger) {
            this.autocompleteTrigger.closePanel();
          }
        }
      }),
      filter(query => query !== null  && query !== ""),
      switchMap(query => this.headerService.searchProducts(query as string))
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

  onProductSelected(product: string) {
    this.router.navigate(["products/search"], { queryParams: { query: product } });
  }

  onEnterPressed() {
    this.router.navigate(["products/search"], { queryParams: { query: this.control.value } });
    if (this.autocompleteTrigger) {
      this.autocompleteTrigger.closePanel();
    }
  }

}
