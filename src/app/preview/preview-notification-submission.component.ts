import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-preview',
  templateUrl: './preview-notification-submission.html',
  styleUrls: ['./preview-notification-submission.scss']
})
export class PreviewNotificationSubmissionComponent implements OnInit {

  @Input('currentSubmission')
  protected submission: any;

  constructor() { }

  ngOnInit() {
    this.submission.geoTargeting = this.submission.geoTargeting.filter(
      province => {
        return province.selected && province.name !== 'all';
      }
    );
  }

}
