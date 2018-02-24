import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-preview',
  templateUrl: './preview-notification-submission.html',
  styleUrls: ['./preview-notification-submission.scss']
})
export class PreviewNotificationSubmissionComponent implements OnInit {

  @Input('currentSubmission')
  protected submission: any;

  @Output('editNotification')
  protected editNotification = new EventEmitter();

  @Output('submitNotification')
  protected submitNotification = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.submission.geoTargeting = this.submission.geoTargeting.filter(
      province => {
        return province.selected && province.abbr !== 'all';
      }
    );
  }

  public goBackToAddNotification() {
    this.editNotification.emit(null);
  }

  public submit() {
    this.submitNotification.emit(null);
  }

}
