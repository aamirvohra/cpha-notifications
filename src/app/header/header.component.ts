import { Component, OnInit } from '@angular/core';
import { AppURLRepo } from '../../utils/app-url-repo';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public notificationManagerLogo: string;

  constructor() {
    this.notificationManagerLogo = AppURLRepo.NOTIFICATIONS_MANAGER_LOGO;
  }

  ngOnInit() {
  }

}
