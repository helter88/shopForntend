import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminLoginService } from './admin-login.service';
import { JwtService } from 'src/app/shared/services/jwt.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {

  formGroup!: FormGroup;

  loginError = false;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: AdminLoginService,
    private jwtService: JwtService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  submit() {
    if(this.formGroup.valid){
      this.loginService.login(this.formGroup.value)
        .subscribe({
          next: (response) => {
            this.loginError = false;
            if(response.adminAccess){
              this.jwtService.setToken(response.token);
              this.jwtService.setAminAccess(true);
            }
            
            this.router.navigate(["/admin/products"]);
          },
          error: () => this.loginError = true
        })
    }
  }
}
