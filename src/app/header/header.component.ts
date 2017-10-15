import { Component, OnInit } from '@angular/core';
import { AppURLRepo } from '../../utils/app-url-repo';
import { ModalService } from '../services/modal-service.service';
import { Router, NavigationEnd } from '@angular/router';

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

  constructor(private modalService: ModalService,
              private router: Router) {
    this.notificationManagerLogo = AppURLRepo.NOTIFICATIONS_MANAGER_LOGO;
    this.profileIcon = AppURLRepo.PROFILE_ICON;
    this.dropdownIcon = AppURLRepo.DROPDOWN_ICON;
    this.settingIcon = AppURLRepo.SETTINGS_ICON;
    this.signoutIcon = AppURLRepo.SIGNOUT_ICON;
  }

  ngOnInit() {
    this.router.events.filter(
      event => event instanceof NavigationEnd).subscribe(
      (event: NavigationEnd) => {
        if (event.url !== '/') {
          this.loggedInUser = true;
        }
        else {
          this.loggedInUser = false;
        }
      }
    )

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
