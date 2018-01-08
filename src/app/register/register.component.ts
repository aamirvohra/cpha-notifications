import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppURLRepo } from '../../utils/app-url-repo';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  public registerForm: FormGroup;
  public closeIcon: string = AppURLRepo.CLOSE_ICON;

  public closeModal: BehaviorSubject<boolean>;


  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null, Validators.required],
      password: [null, Validators.required],
      // confirmPassword: [null, Validators.required],
    });

    this.closeModal = new BehaviorSubject(false);
  }

  register() {
    console.log('Register');
  }

  displaySignIn() {
    // display sign in
  }

  close() {
    this.closeModal.next(true);
  }


}
