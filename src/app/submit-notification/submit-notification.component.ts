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
    this.notificationSubmissionForm.get('geoTargeting').setValidators(
      (provinceArray: FormArray) => {
        let atleastOneSelected = false;

        provinceArray.controls.map(
          (province: FormGroup) => {
            if (province.controls.selected.value) {
              atleastOneSelected = true;
            }
          }
        );

        return atleastOneSelected ? null : { msg: 'GeoTarget is required field. Please select one province'};
      }
    );
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

        times.setValue(0);

        if (change) {
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
    let dates = this.notificationSubmissionForm.get('repeatMessage.dates') as FormArray;
    const times = this.notificationSubmissionForm.get('repeatMessage.repeatTimes');

    times.valueChanges.subscribe(
      value => {
        const intTimes = parseInt(value, 10);

        if (intTimes > 0) {

          this.resetDatesFormArray();

          for (let i = 0; i < value; i++) {
            dates.push(this.fb.group({
              date: [null, [Validators.required]],
              description: [null],
            }));
          }
        }
        else {
          this.resetDatesFormArray();
        }
      }
    );
  }

  private resetDatesFormArray() {
    const dates = this.notificationSubmissionForm.get('repeatMessage.dates') as FormArray;
    while (dates.length) {
      dates.removeAt(0);
    }
  }

  protected onDrop(event) {
    event.preventDefault();
    event.stopPropagation();

    console.log(event.dataTransfer, event.dataTransfer.files);

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
