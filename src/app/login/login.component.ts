import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppURLRepo } from '../../utils/app-url-repo';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public loginForm: FormGroup;
  public closeIcon: string = AppURLRepo.CLOSE_ICON;

  public closeModal: BehaviorSubject<boolean>;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      userId: [null, Validators.required],
      password: [null, Validators.required],
    });

    this.closeModal = new BehaviorSubject(false);
  }

  processLogin() {
    console.log('Login');
  }

  close() {
    this.closeModal.next(true);
  }

  displaySignup() {
    // test
  }

}
