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
        dates: this.fb.array([]),
      }),
      geoTargeting: this.fb.array([]),
    });

    this.populateProvinces();

    this.subscribeOnRepeatMessageChangeEvent();
  }

  private populateProvinces() {
    const formGroup = Province.getProvinceList().map(
      val => {
        return this.fb.group({
              abbr: [val.abbr],
              name: [val.name],
              selected: [false],
        });
      }
    );

    const provinceFormArray = this.fb.array(formGroup);
    this.notificationSubmissionForm.setControl('geoTargeting', provinceFormArray);
  }

  private subscribeOnRepeatMessageChangeEvent() {
    // this.notificationSubmissionForm.controls
    //   .repeatMessage['controls'].repeat.valueChanges.subscribe(
    //   change => {
    //     const repeatTimesControl: FormControl = this.notificationSubmissionForm.controls
    //       .repeatMessage['controls'].repeatTimes;
    //     if (change) {
    //       repeatTimesControl.setValue(0);
    //       repeatTimesControl.setValidators(Validators.required);
    //
    //       this.updateFormOnRepeatTimesEvent();
    //     }
    //     else {
    //       repeatTimesControl.clearValidators();
    //     }
    //   }
    // );

    this.notificationSubmissionForm.get('repeatMessage.repeat').valueChanges.subscribe(
      change => {
        const times = this.notificationSubmissionForm.get('repeatMessage.repeatTimes');

        if (change) {
          times.setValue(0);
          times.setValidators(Validators.required);

          this.updateFormOnRepeatTimesEvent();
        }
        else {
          times.clearValidators();
        }
      }
    );
  }

  private updateFormOnRepeatTimesEvent() {
    // const dateFormArray = <FormArray> this.notificationSubmissionForm.controls
    //   .repeatMessage['controls'].dates;

    let dates = this.notificationSubmissionForm.get('repeatMessage.dates') as FormArray;
    const times = this.notificationSubmissionForm.get('repeatMessage.repeatTimes');

    times.valueChanges.subscribe(
      times => {
        const intTimes = parseInt(times, 10);

        if (intTimes > 0) {
          dates = this.fb.array([]);

          const dateGroupArray = this.fb.array([]);
          for (let i = 0; i < times; i++) {
            dateGroupArray.push(this.fb.group({
              date: [null, Validators.required],
              description: [null],
            }));
          }

          // dates = this.fb.array(dateGroupArray);

          // console.log(dates);

          // this.notificationSubmissionForm.setControl('repeatMessage.dates', dateGroupArray);

          this.notificationSubmissionForm.controls
            .repeatMessage['controls'].dates = dateGroupArray;
        }
        else {
          dates = this.fb.array([]);
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

  get dates() {
    return this.notificationSubmissionForm.get('repeatMessage.dates') as FormArray;
  }
}
