import { Component, OnInit } from '@angular/core';
import { AppURLRepo } from '../../utils/app-url-repo';
import { ModalService } from '../services/modal-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  public notificationManagerLogo: string;

  public profileIcon: string;
  public dropdownIcon: string;
  public settingIcon: string;
  public signoutIcon: string;

  constructor(private modalService: ModalService) {
    this.notificationManagerLogo = AppURLRepo.NOTIFICATIONS_MANAGER_LOGO;
    this.profileIcon = AppURLRepo.PROFILE_ICON;
    this.dropdownIcon = AppURLRepo.DROPDOWN_ICON;
    this.settingIcon = AppURLRepo.SETTINGS_ICON;
    this.signoutIcon = AppURLRepo.SIGNOUT_ICON;
  }

  displaySignInForm() {
    this.modalService.displaySignInForm();
  }

  displaySignUpForm() {
    this.modalService.displaySignUpForm();
  }

  processLogout() {

  }

}
