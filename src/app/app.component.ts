import { Component } from '@angular/core';
import { ModalService } from './modal-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  title = 'app';

  public signUpFormVisible: boolean;
  public signInFormVisible: boolean;

  constructor(private modalService: ModalService) {
    this.modalService._displaySignUpForm.subscribe(
      display => {
        this.signUpFormVisible = display;
      }
    )

    this.modalService._displaySignInForm.subscribe(
      display => {
        this.signInFormVisible = display;
      }
    )
  }

}
