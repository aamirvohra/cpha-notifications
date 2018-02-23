import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Province } from '../../utils/province';
import { AppURLRepo } from '../../utils/app-url-repo';

@Component({
  selector: 'app-submit-notification',
  templateUrl: './submit-notification.component.html',
  styleUrls: ['./submit-notification.component.scss']
})
export class SubmitNotificationComponent implements OnInit {

  private readonly DRAG_ENTER_CLASS: string = 'drag-enter';
  private readonly DRAG_EXIT_CLASS: string = 'drag-exit';

  protected notificationSubmissionForm: FormGroup;

  public closeIcon: string = AppURLRepo.CLOSE_ICON;

  public previewMode: boolean;

  private readonly allowedFileExtension: Array<string> = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.notificationSubmissionForm = this.fb.group({
      drugName: [null, Validators.required],
      requestType: [null, Validators.required],
      messageTitle: [null, Validators.required],
      send: [null],
      comments: [null],
      uploadedFiles: this.fb.array([], Validators.required),
      repeatMessage: this.fb.group({
        repeat: [false],
        repeatTimes: [null],
        dates: this.fb.array([]),
      }),
      geoTargeting: this.fb.array([]),
    });

    this.initForm();

    this.subscribeOnRepeatMessageChangeEvent();

    // this.subscribeOnProvinceAllSelection();
  }

  private initForm() {
    this.notificationSubmissionForm.get('send').setValue('now');
    this.populateProvinces();
  }

  private populateProvinces() {
    const provincesFormGroup = Province.getProvinceList().map(
      val => {
        return this.fb.group({
              abbr: [val.abbr],
              name: [val.name],
              selected: [false],
        });
      }
    );

    const allFormGroup = this.fb.group({
      abbr: ['all'],
      name: ['All Provinces'],
      selected: [false],
    });

    const provinceFormArray = this.fb.array([allFormGroup, ...provincesFormGroup]);
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

  private subscribeOnProvinceAllSelection() {
    console.log(this.notificationSubmissionForm.get('geoTargeting'));
    this.notificationSubmissionForm.get('geoTargeting').valueChanges.subscribe(
      change => {
        console.log(change);
      }
    );
  }

  private updateFormOnRepeatTimesEvent() {
    const dates = this.notificationSubmissionForm.get('repeatMessage.dates') as FormArray;
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
  private resetFileUploadArray() {
    const files = this.notificationSubmissionForm.get('uploadedFiles') as FormArray;
    while (files.length) {
      files.removeAt(0);
    }
  }

  protected onDrop(event) {
    event.preventDefault();
    event.stopPropagation();

    // console.log(event.dataTransfer, event.dataTransfer.files);
    //
    // console.log(event.dataTransfer.items[0]);

    this.handleFileUploads(event);

    // const firstItem = event.dataTransfer.items[0];
    //
    // if (!this.isFileKind(firstItem)) {
    //   return;
    // }

    // console.log(this.getFileType(firstItem));
  }

  protected handleFileUploads (event) {
    const files = event.target.files || event.dataTransfer.files;
    const fileUploadFormArray = this.notificationSubmissionForm.get('uploadedFiles') as FormArray;

    // @TODO check for file upload size for 5MB restriction

    for (const file of files) {
      if (this.isFileTypeSupported(file)) {
       const fileSize = Math.ceil(file.size / 1000);
        fileUploadFormArray.push(this.fb.group({
          name: file.name,
          size: fileSize,
        }));
      }
    }
  }

  protected onDragOver(event) {
    event.preventDefault();
  }

  protected onDragEnter(element) {
    element.classList.add(this.DRAG_ENTER_CLASS);

  }

  protected onDragLeave(element) {
    element.classList.remove(this.DRAG_ENTER_CLASS);
  }

  protected isFileTypeSupported(file) {
    return this.allowedFileExtension.indexOf(file.type) !== -1 ? true : false;
  }

  protected getFileType(item) {
    return item.type;
  }

  protected cancel() {
   this.notificationSubmissionForm.reset();
   this.resetFileUploadArray();
   this.initForm();
  }

  protected preview() {
    this.previewMode = true;
  }

  get dates() {
    return this.notificationSubmissionForm.get('repeatMessage.dates') as FormArray;
  }

  onProvinceSelection(selectedProvince: string, selected: boolean) {
    if (selectedProvince === 'all') {
      const provinceFormArray: any = this.notificationSubmissionForm.get('geoTargeting') as FormArray;

      for (let i = 0; i < provinceFormArray.length; i++) {
        if (provinceFormArray.controls[i].controls.abbr !== 'all') {
          provinceFormArray.controls[i].controls.selected.setValue(selected);
        }
      }
    }
  }
}
