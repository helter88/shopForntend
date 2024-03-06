import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { JwtService } from 'src/app/shared/services/jwt.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  private readonly REDIRECT_ROUTE = "/profile";
  loginForm!: FormGroup;
  loginError = false;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private jwtService: JwtService,
    private router: Router
  ){}

  ngOnInit(): void {
    if(this.jwtService.isLoggedIn()){
      this.router.navigate([this.REDIRECT_ROUTE])
    }
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  login(){
    if(this.loginForm.valid){
      this.loginService.login(this.loginForm.value)
        .subscribe({
          next: response => {
            this.jwtService.setToken(response.token);
            this.router.navigate([this.REDIRECT_ROUTE]);
            this.loginError = false;
          },
          error: () => this.loginError = true
        });
    }
  }
}
