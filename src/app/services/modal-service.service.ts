import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ModalService {

  public _displaySignInForm: BehaviorSubject<boolean>;
  public _displaySignUpForm: BehaviorSubject<boolean>;

  constructor() {
    this._displaySignInForm = new BehaviorSubject(false);
    this._displaySignUpForm = new BehaviorSubject(false);
  }

  public displaySignInForm(display: boolean) {
    this._displaySignInForm.next(display);
  }

  public displaySignUpForm(display: boolean) {
    this._displaySignUpForm.next(display);
  }

}
