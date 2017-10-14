import { Component, OnInit } from '@angular/core';
import { AppURLRepo } from '../../utils/app-url-repo';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent {

  public filterIcon: string;

  constructor() {
    this.filterIcon = AppURLRepo.FILTER_ICON;
  }

}
