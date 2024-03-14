import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JwtService } from 'src/app/shared/services/jwt.service';

@Component({
  selector: 'app-fullpageadmin',
  templateUrl: './fullpageadmin.component.html',
  styleUrls: ['./fullpageadmin.component.scss']
})
export class FullpageadminComponent {

  constructor(
    private jwtService: JwtService,
    private router: Router
  ){}
  logout() {
    this.jwtService.removeToken();
    this.jwtService.setAminAccess(false);
    this.router.navigate(['/admin/login']);
  }

}
