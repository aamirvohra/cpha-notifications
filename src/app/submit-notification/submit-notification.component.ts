import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-submit-notification',
  templateUrl: './submit-notification.component.html',
  styleUrls: ['./submit-notification.component.scss']
})
export class SubmitNotificationComponent implements OnInit {

  private readonly DRAG_ENTER_CLASS: string = 'drag-enter';
  private readonly DRAG_EXIT_CLASS: string = 'drag-exit';

  protected notificationSubmissionForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.notificationSubmissionForm = this.fb.group({
      drugName: [null, Validators.required],
      requestType: [null, Validators.required],
      messageTitle: [null, Validators.required],
      send: ['now'],
      repeatMessage: this.fb.group({
        repeat: [true],
        repeatTimes: [null, Validators.required],
        dates: new FormArray([])
      }),
      geoTargeting: new FormArray([]),

    });
  }

  protected onDrop(event) {
    event.preventDefault();
    event.stopPropagation();

    console.log(event.dataTransfer);

    console.log(event.dataTransfer.items[0]);

    const firstItem = event.dataTransfer.items[0];

    if (!this.isFileKind(firstItem)) {
      return;
    }

    console.log(this.getFileType(firstItem));

  }

  protected onDragOver(event) {
    event.preventDefault();
    // event.stopPropagation();
  }

  protected onDragEnter(element) {
    element.classList.add(this.DRAG_ENTER_CLASS);
    // element.classList.remove(this.DRAG_EXIT_CLASS);

  }

  protected onDragLeave(element) {
    // element.classList.add(this.DRAG_EXIT_CLASS);
    element.classList.remove(this.DRAG_ENTER_CLASS);
  }

  protected isFileKind(item) {
    return item.kind === 'file';
  }

  protected getFileType(item) {
    return item.type;
  }
}
