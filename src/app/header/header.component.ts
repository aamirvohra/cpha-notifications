import { Component, OnInit } from '@angular/core';
import { AppURLRepo } from '../../utils/app-url-repo';
import { ModalService } from '../modal-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  public notificationManagerLogo: string;

  constructor(private modalService: ModalService) {
    this.notificationManagerLogo = AppURLRepo.NOTIFICATIONS_MANAGER_LOGO;
  }

  displaySignInForm() {
    this.modalService.displaySignInForm();
  }

  displaySignUpForm() {
    this.modalService.displaySignUpForm();
  }

}
