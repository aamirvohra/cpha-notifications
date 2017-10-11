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

  public displaySignInForm() {
    this._displaySignInForm.next(true);
  }

  public displaySignUpForm() {
    this._displaySignUpForm.next(true);
  }

}
