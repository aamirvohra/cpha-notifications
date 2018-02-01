import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Province } from '../../utils/province';

@Component({
  selector: 'app-submit-notification',
  templateUrl: './submit-notification.component.html',
  styleUrls: ['./submit-notification.component.scss']
})
export class SubmitNotificationComponent implements OnInit {

  private readonly DRAG_ENTER_CLASS: string = 'drag-enter';
  private readonly DRAG_EXIT_CLASS: string = 'drag-exit';

  protected notificationSubmissionForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.notificationSubmissionForm = this.fb.group({
      drugName: [null, Validators.required],
      requestType: [null, Validators.required],
      messageTitle: [null, Validators.required],
      send: ['now'],
      repeatMessage: this.fb.group({
        repeat: [false],
        repeatTimes: [null],
        dates: new FormArray([]),
      }),
      geoTargeting: new FormArray([]),
    });

    this.populateProvinces();

    this.subscribeOnRepeatMessageChangeEvent();
  }

  private populateProvinces() {
    Province.getProvinceList().map(
      val => {
        this.notificationSubmissionForm.controls['geoTargeting']['controls'].push(
          this.fb.group({
            abbr: [val.abbr],
            name: [val.name],
            selected: [false],
          })
        );
      }
    );
  }

  private subscribeOnRepeatMessageChangeEvent() {
    this.notificationSubmissionForm.controls
      .repeatMessage['controls'].repeat.valueChanges.subscribe(
      change => {
        const repeatTimesControl: FormControl = this.notificationSubmissionForm.controls
          .repeatMessage['controls'].repeatTimes;
        if (change) {
          repeatTimesControl.setValue(0);
          repeatTimesControl.setValidators(Validators.required);

          this.updateFormOnRepeatTimesEvent();
        }
        else {
          repeatTimesControl.clearValidators();
        }
      }
    );
  }

  private updateFormOnRepeatTimesEvent() {
    const dateFormArray = <FormArray> this.notificationSubmissionForm.controls
      .repeatMessage['controls'].dates;

    this.notificationSubmissionForm.controls
      .repeatMessage['controls'].repeatTimes.valueChanges.subscribe(
        times => {
          times = parseInt(times, 10);

         if (times > 0) {
           if (dateFormArray) {
             this.notificationSubmissionForm.controls
               .repeatMessage['controls'].dates = new FormArray([]);
           }

           for (let i = 0; i < times; i++) {
             this.notificationSubmissionForm.controls
               .repeatMessage['controls'].dates.push(this.fb.group({
               date: ['', Validators.required],
               description: [null],
             }));
           }
         }
         else {
           this.notificationSubmissionForm.controls
             .repeatMessage['controls'].dates = new FormArray([]);
         }
        }
    );
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

  protected cancel() {
    console.log(this.notificationSubmissionForm);
    // this.populateProvinces();
  }

  protected preview() {
    console.log(this.notificationSubmissionForm.errors);
  }
}
