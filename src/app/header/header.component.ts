import { Component, OnInit } from '@angular/core';
import { AppURLRepo } from '../../utils/app-url-repo';
import { ModalService } from '../services/modal-service.service';
import { Router, NavigationEnd } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public notificationManagerLogo: string;

  public profileIcon: string;
  public dropdownIcon: string;
  public settingIcon: string;
  public signoutIcon: string;
  public loggedInUser: boolean;
  private isHomeRouteActivated: boolean;

  private registerModalRef: BsModalRef;
  private signInModalRef: BsModalRef;
  private modalOptions: any;

  constructor(private router: Router,
              private modalService: BsModalService) {
    this.notificationManagerLogo = AppURLRepo.NOTIFICATIONS_MANAGER_LOGO;
    this.profileIcon = AppURLRepo.PROFILE_ICON;
    this.dropdownIcon = AppURLRepo.DROPDOWN_ICON;
    this.settingIcon = AppURLRepo.SETTINGS_ICON;
    this.signoutIcon = AppURLRepo.SIGNOUT_ICON;

    this.modalOptions = {
      ignoreBackdropClick: true,
    };
  }

  ngOnInit() {
    this.router.events.filter(
      event => event instanceof NavigationEnd).subscribe(
      (event: NavigationEnd) => {
        if (event.url !== '/') {
          this.loggedInUser = true;
          this.isHomeRouteActivated = true;
        }
        else {
          this.loggedInUser = false;
          this.isHomeRouteActivated = false;
        }
      }
    );

  }

  displaySignInForm() {
    // this.modalService.displaySignInForm(true);
    this.signInModalRef = this.modalService.show(LoginComponent, this.modalOptions);

    this.signInModalRef.content.displaySignup = () => {
      this.closeSignInModal();
      this.displaySignUpForm();
    };

    this.signInModalRef.content.closeModal.subscribe(
      close => {
        if (close) {
          this.closeSignInModal();
        }
      }
    );
  }

  displaySignUpForm() {
    // this.modalService.displaySignUpForm(true);
    this.registerModalRef = this.modalService.show(RegisterComponent, this.modalOptions);

    this.registerModalRef.content.displaySignIn = () => {
      this.closeRegisterModal();
      this.displaySignInForm();
    };

    this.registerModalRef.content.closeModal.subscribe(
      close => {
        if (close) {
          this.closeRegisterModal();
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

  processLogout() {

  }

}
