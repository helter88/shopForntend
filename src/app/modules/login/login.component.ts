import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm!: FormGroup;
  loginError = false;

  registerForm!: FormGroup;
  registerError = false;

  constructor(
    private formBuilder: FormBuilder
  ){}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })

    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required]
    })
  }

  login() {
    
  }

  register() {
    
  }
}
