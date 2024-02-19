import { Component } from '@angular/core';
import { ProfileService } from './profile.service';
import { OrderListDto } from './profile.model';
import { JwtService } from 'src/app/shared/services/jwt.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

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
