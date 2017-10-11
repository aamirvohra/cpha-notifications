import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm =this.fb.group({
      userId: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  processLogin() {
    console.log('Login');
  }

}
