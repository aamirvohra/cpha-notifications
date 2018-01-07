import { Component } from '@angular/core';
import { ModalService } from './services/modal-service.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.scss']
})

export class AppComponent {
  title = 'app';

  public signInModalRef: BsModalRef;
  public registerModalRef: BsModalRef;

  constructor(private modalService: ModalService, private modal: BsModalService) {
    this.modalService._displaySignUpForm.subscribe(
      display => {

        if (display) {
          this.registerModalRef = this.modal.show(RegisterComponent);

          this.registerModalRef.content.displaySignIn = () => {
            this.closeRegisterModal();
            this.modalService.displaySignInForm(true);
          };

          this.registerModalRef.content.closeModal.subscribe(
            close => {
              if (close) {
                this.closeRegisterModal();
              }
            }
          );
        }
        else {
          this.closeRegisterModal();
        }

      }
    );

    this.modalService._displaySignInForm.subscribe(
      display => {
        if (display) {

          this.signInModalRef = this.modal.show(LoginComponent);

          // hide signin form
          this.signInModalRef.content.displaySignup = () => {
            this.closeSignInModal();
            this.modalService.displaySignUpForm(true);
          };

          this.signInModalRef.content.closeModal.subscribe(
            close => {
              if (close) {
                this.closeSignInModal();
              }
            }
          );
        }
        else {
          this.closeSignInModal();
        }
      }
    );
  }


  closeSignInModal() {
    if (this.signInModalRef) {
      this.signInModalRef.hide();
    }
  }

  closeRegisterModal() {
    if (this.registerModalRef) {
      this.registerModalRef.hide();
    }
  }

}
