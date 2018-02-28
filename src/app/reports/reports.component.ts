import { Component, ElementRef, ViewChild } from '@angular/core';
import { AppURLRepo } from '../../utils/app-url-repo';
import { ReportsService } from '../services/reports.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DaterangePickerComponent, DaterangepickerConfig } from 'ng2-daterangepicker';
import * as moment from 'moment';
import { File, Notification, NotificationDates, NotificationRepeat } from '../models/notification';
import { Province } from '../../utils/province';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent {

  public readonly filterIcon: string;
  public readonly fileIcon: string;
  public readonly upIcon: string;
  public readonly downIcon: string;
  public readonly searchIcon: string;
  public readonly resetIcon: string;

  public reportList: Array<any>;
  protected reportForm: FormGroup;

  @ViewChild(DaterangePickerComponent)
  private picker: DaterangePickerComponent;

  @ViewChild('calendar')
  public calendar: ElementRef;

  protected filtersVisible: boolean;

  protected selectedNotification: Notification;

  protected displayArchivedAlert: boolean;
  protected displaySubmissionAlert: boolean;

  constructor(private reportService: ReportsService,
              private dateFilterConfig: DaterangepickerConfig,
              private fb: FormBuilder,
              private router: Router) {
    this.filterIcon = AppURLRepo.FILTER_ICON;
    this.fileIcon = AppURLRepo.FILE_ICON;
    this.upIcon = AppURLRepo.CHEVRON_UP_ICON;
    this.downIcon = AppURLRepo.CHEVRON_DOWN_ICON;
    this.searchIcon = AppURLRepo.SEARCH_ICON;
    this.resetIcon = AppURLRepo.RESET_ICON;

    this.filtersVisible = false;

    this.reportList = this.reportService.getReports();

    this.reportForm = this.fb.group({
      search: [null],
      requestType: [null],
      distributionMethods: [null],
      startDate: [null],
      endDate: [null],
      dateRange: [null]
    });

    this.dateFilterConfig.settings = {
      ranges : {
        'Today': [moment(), moment()],
        'Yesterday': [moment().subtract(1, 'days'), moment()],
        'Last 7 Days': [moment().subtract(7, 'days'), moment()],
        'Last 30 Days': [moment().subtract(30, 'days'), moment()],
        'This Month': [moment().startOf('month'), moment()],
        'Last Month': [moment().startOf('month').subtract(1, 'month'), moment().endOf('month').subtract(1, 'month')],
      },
      autoUpdateInput: false,
    };
  }

  displayCalendar() {
    if(!this.picker.datePicker.isShowing) {
      this.calendar.nativeElement.focus();
    }
    else {
      this.calendar.nativeElement.blur();
    }
  }

  public resetFilters(event) {
    this.reportForm.reset();
  }

  public clearDateRange(event) {
    this.reportForm.controls['dateRange'].setValue(null);
    this.reportForm.controls['startDate'].setValue(null);
    this.reportForm.controls['endDate'].setValue(null);
  }

  public selectedDate(value: any, datepicker?: any) {
    // set values from here to the form
    this.reportForm.controls['endDate'].setValue(value.end);
    this.reportForm.controls['startDate'].setValue(value.start);

    this.reportForm.controls['dateRange'].setValue(
      value.start.format('MMMM DD, YYYY') + ' - ' + value.end.format('MMMM DD, YYYY')
    );
  }

  public toggleFilters() {
    this.filtersVisible = !this.filtersVisible;
  }

  public displayNotificationDetail() {
    const provinces = Province.getProvinceList();

    const filteredProvince = provinces.filter(
      province => {
        // only select ontario as province
        return province.abbr === 'ON';
      }
    );

    const notificationRepeat = new NotificationRepeat();
    notificationRepeat.times = 2;
    const dates = [];

    const date1 = new NotificationDates();
    date1.date = '22/10/2018';
    date1.description = 'Init Date';
    dates.push(date1);

    const date2 = new NotificationDates();
    date2.date = '22/11/2018';
    date2.description = 'Release Date';
    dates.push(date2);

    notificationRepeat.dates = dates;

    const files = [];
    const file1 = new File();
    file1.name = 'Tylenol.pdf';
    file1.size = '2000';
    files.push(file1);

    const file2 = new File();
    file2.name = 'Tylenol_Updated.pdf';
    file2.size = '2500';
    files.push(file2);

    const notification = new Notification();
    notification.provinces = filteredProvince;
    notification.comments = 'My Test Comments';
    notification.drugName = 'Pepto Bismol';
    notification.messageTitle = 'Message with a Title';
    notification.repeat = notificationRepeat;
    notification.requestType = 'Test';
    notification.uploadedFiles = files;

    this.selectedNotification = notification;
  }

  onNotificationDescriptionClosed() {
    this.selectedNotification = null;
  }

  editNotification() {
    this.router.navigate(['/notifications/edit']);
  }

  archiveNotification() {
    console.log('Archive Notification');
    this.displayArchivedAlert = true;
  }

  closeAlert() {
    this.displayArchivedAlert = false;
    this.displaySubmissionAlert = false;
  }

}
