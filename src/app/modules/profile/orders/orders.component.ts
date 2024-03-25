import { Component } from '@angular/core';
import { OrderListDto } from '../profile.model';
import { ProfileService } from '../profile.service';
import { JwtService } from 'src/app/shared/services/jwt.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent {
  
  orders!: OrderListDto[];
  displayedColumns = ["id", "placeDate", "orderStatus", "grossValue"];

  constructor(
    private profileService: ProfileService,
    private jwtService: JwtService,
    private router: Router
  ){}

  ngOnInit(): void {
    if(!this.jwtService.isLoggedIn()) {
      this.router.navigate(["/login"]);
    }
    this.getOrders();
  }

  getOrders(){
    this.profileService.getOrders()
      .subscribe(orders => this.orders = orders)
  }
}
