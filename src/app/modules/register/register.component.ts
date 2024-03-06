import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtService } from 'src/app/shared/services/jwt.service';
import { RegisterService } from './register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registerForm!: FormGroup;
  registerError = false;
  registerErrorMessage = "";

  private readonly REDIRECT_ROUTE = "/profile";

  constructor(
    private formBuilder: FormBuilder,
    private jwtService: JwtService,
    private router: Router,
    private registerService: RegisterService
  ){}
  
  ngOnInit() {
    if(this.jwtService.isLoggedIn()){
      this.router.navigate([this.REDIRECT_ROUTE])
    }

    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      repeatedPassword: ['', Validators.required]
    })
  }

  register(){
    if(this.registerForm.valid && this.isPasswordIdentical(this.registerForm.value)){
      this.registerService.register(this.registerForm.value)
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
