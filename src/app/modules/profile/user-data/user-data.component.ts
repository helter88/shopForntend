import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../profile.service';
import { JwtService } from 'src/app/shared/services/jwt.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.scss']
})
export class UserDataComponent {

  formGroup!: FormGroup;
  
  constructor(
    private formBuilder: FormBuilder,
    private profileService: ProfileService,
    private jwtService: JwtService,
    private router: Router,
    private snackBar: MatSnackBar,
  ){}

  ngOnInit(){
    if(!this.jwtService.isLoggedIn()) {
      this.router.navigate(["/login"]);
    } 
    this.formGroup = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      street: ['', Validators.required],
      zipcode: ['', Validators.required],
      city: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
    });
    this.profileService.getUserData().subscribe( userData => {
      this.formGroup.patchValue({
        firstname: userData.firstname ?? '',
        lastname: userData.lastname ?? '',
        street: userData.street ?? '',
        zipcode: userData.zipcode ?? '',
        city: userData.city ?? '',
        email: userData.email ?? '',
        phone: userData.phone ?? '',
      });
    })
  }

  submit(){
    if(this.formGroup.valid){
      this.profileService.saveUserData(this.formGroup.value)
      .subscribe({
        next : () => {
          this.snackBar.open("Data saved",'', {duration: 2600, panelClass: "successful"});
        },
        error: err => this.snackBar.open(`Data not saved: ${err.error}`,'', {duration: 2600, panelClass: "fail"})
      })
    }
  }
  
  get firstname(){
    return this.formGroup.get("firstname");
  }
  get lastname(){
    return this.formGroup.get("lastname");
  }
  get street(){
    return this.formGroup.get("street");
  }
  get zipcode(){
    return this.formGroup.get("zipcode");
  }
  get city(){
    return this.formGroup.get("city");
  }
  get email(){
    return this.formGroup.get("email");
  }
  get phone(){
    return this.formGroup.get("phone");
  }
  get shipment(){
    return this.formGroup.get("shipment");
  }
}
