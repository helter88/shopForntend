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

  registerForm!: FormGroup;
  registerError = false;
  registerErrorMessage = "";

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

    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      repeatedPassword: ['', Validators.required]
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

  register(){
    if(this.registerForm.valid && this.isPasswordIdentical(this.registerForm.value)){
      this.loginService.register(this.registerForm.value)
        .subscribe({
          next: response => {
            this.jwtService.setToken(response.token);
            this.router.navigate([this.REDIRECT_ROUTE]);
          },
          error: (err) => {
            this.registerError = true;
            if(err.error.message){
              this.registerErrorMessage = err.error.message;
            }else{
              this.registerErrorMessage = "Something has gone wrong please try again later";
            }
            
          }
      });
    }
  }

  isPasswordIdentical(register: any): boolean {
    if(register.password === register.repeatedPassword){
      this.registerError = false;
      return true;
    }
    this.registerError = true;
    this.registerErrorMessage = "Paswords are not identical";
    return false;
  }
}
