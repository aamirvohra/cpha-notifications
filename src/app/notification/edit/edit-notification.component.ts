import { Component, Input, OnInit } from '@angular/core';
import { AppURLRepo } from '../../../utils/app-url-repo';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Province } from '../../../utils/province';
import { File, Notification, NotificationDates, NotificationRepeat } from '../../models/notification';

@Component({
  selector: 'app-edit-notification',
  templateUrl: './edit-notification.component.html',
  styleUrls: ['./edit-notification.component.scss']
})
export class EditNotificationComponent implements OnInit {

  @Input('notification')
  protected notification: Notification;

  private readonly DRAG_ENTER_CLASS: string = 'drag-enter';
  private readonly DRAG_EXIT_CLASS: string = 'drag-exit';

  protected editNotificationForm: FormGroup;

  public closeIcon: string = AppURLRepo.CLOSE_ICON;

  private readonly allowedFileExtension: Array<string> = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];

  constructor(private fb: FormBuilder) {
    this.notification = new Notification();
    this.notification.requestType = 'test';
    this.notification.drugName = 'test';
    this.notification.messageTitle = 'Message Title';

    const files = [];
    const file = new File();
    file.size = '345';
    file.name = 'Tylenol.pdf';

    const file2 = new File();
    file2.size = '390';
    file2.name = 'Tylenol_2018.pdf';

    files.push(file, file2);

    this.notification.uploadedFiles = files;
    this.notification.comments = 'Tylenol has been updated to 2018 version';

    const notificationDates = new NotificationDates();
    notificationDates.date = '27/02/2018';
    notificationDates.description = 'Test';


    const repeatNotification = new NotificationRepeat();
    repeatNotification.times = 1;
    repeatNotification.dates =  [notificationDates];

    this.notification.repeat = repeatNotification;

    const provinces = [];
    const province = new Province();
    province.name = 'Alberta';
    province.abbr = 'AB';
    provinces.push(province);

    this.notification.provinces = provinces;
  }

  ngOnInit() {
    this.editNotificationForm = this.fb.group({
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

    this.populateForm();

    this.initForm();

    this.subscribeOnRepeatMessageChangeEvent();
  }

  private populateForm() {
    this.editNotificationForm.patchValue(
      {
        drugName: this.notification.drugName,
        requestType: this.notification.requestType,
        messageTitle: this.notification.messageTitle,
        comments: this.notification.comments,
        repeatMessage: {
          repeat: true,
          repeatTimes: this.notification.repeat.times,
          dates: this.notification.repeat.dates,
        },
      }
    );

    const fileArray = this.editNotificationForm.get('uploadedFiles') as FormArray;
    const provinceArray = this.editNotificationForm.get('geoTargeting') as FormArray;
    for (const file of this.notification.uploadedFiles) {
      fileArray.push(new FormControl(file.name + file.size));
    }

    for (const province of this.notification.provinces) {
      provinceArray.push(new FormControl(province.abbr));
    }

    console.log(fileArray.value);
  }

  private initForm() {
    this.editNotificationForm.get('send').setValue('now');
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
    this.editNotificationForm.setControl('geoTargeting', provinceFormArray);
    this.editNotificationForm.get('geoTargeting').setValidators(
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

    this.editNotificationForm.get('repeatMessage.repeat').valueChanges.subscribe(
      change => {
        const times = this.editNotificationForm.get('repeatMessage.repeatTimes');

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
    const dates = this.editNotificationForm.get('repeatMessage.dates') as FormArray;
    const times = this.editNotificationForm.get('repeatMessage.repeatTimes');

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
    const dates = this.editNotificationForm.get('repeatMessage.dates') as FormArray;
    while (dates.length) {
      dates.removeAt(0);
    }
  }
  private resetFileUploadArray() {
    const files = this.editNotificationForm.get('uploadedFiles') as FormArray;
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
    const fileUploadFormArray = this.editNotificationForm.get('uploadedFiles') as FormArray;

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
    // this.editNotificationForm.reset();
    // this.resetFileUploadArray();
    // this.initForm();
  }

  protected preview() {

  }

  get dates() {
    return this.editNotificationForm.get('repeatMessage.dates') as FormArray;
  }

  onProvinceSelection(selectedProvince: string, selected: boolean) {
    if (selectedProvince === 'all') {
      const provinceFormArray: any = this.editNotificationForm.get('geoTargeting') as FormArray;

      for (let i = 0; i < provinceFormArray.length; i++) {
        if (provinceFormArray.controls[i].controls.abbr !== 'all') {
          provinceFormArray.controls[i].controls.selected.setValue(selected);
        }
      }
    }
  }

}
