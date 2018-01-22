import { Component, OnInit } from '@angular/core';
import { AppURLRepo } from '../../utils/app-url-repo';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  protected readonly OK_ICON: string;
  protected readonly NO_BAR_ICON: string;

  constructor() {
    this.OK_ICON = AppURLRepo.OK_ICON;
    this.NO_BAR_ICON = AppURLRepo.NO_BAR_ICON;
  }

  ngOnInit() {
  }

}
