import { Component, OnInit } from '@angular/core';
import { AppURLRepo } from '../../utils/app-url-repo';
import { ReportsService } from '../services/reports.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent {

  public filterIcon: string;
  public reportList: Array<any>;
  private reportForm: FormGroup;

  constructor(private reportService: ReportsService, private fb: FormBuilder) {
    this.filterIcon = AppURLRepo.FILTER_ICON;
    this.reportList = this.reportService.getReports();
  }

}
