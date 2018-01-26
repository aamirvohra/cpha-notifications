import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppURLRepo } from '../../utils/app-url-repo';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {

  protected contactInfoForm: FormGroup;
  public closeIcon: string = AppURLRepo.CLOSE_ICON;
  public provinces: Array<any>;

  constructor(private fb: FormBuilder) {
    this.contactInfoForm = this.fb.group({
      businessAddress: this.fb.group({
        streetAddress: [null, Validators.required],
        streetAddress2: [null],
        city: [null, Validators.required],
        province: [null, Validators.required],
        postalCode: [null, Validators.required],
      }),
      mailingAddress: this.fb.group({
        sameAsBusiness: [true],
        streetAddress: [null],
        streetAddress2: [null],
        city: [null],
        province: [null],
        postalCode: [null],
      }),
      telephone: [null , Validators.required],
      mobile: [null, Validators.required],
      emailAddress: [null, Validators.required],
    });

    this.provinces = [
      {
        name: 'Alberta',
        abbr: 'AB'
      },
      {
        name: 'British Columbia',
        abbr: 'BC'
      },
      {
        name: 'Manitoba',
        abbr: 'MB'
      },
      {
        name: 'New Brunswick',
        abbr: 'NB'
      },
      {
        name: 'Newfoundland and Labrador',
        abbr: 'NL'
      },
      {
        name: 'Nova Scotia',
        abbr: 'NS',
      },
      {
        name: 'Ontario',
        abbr: 'ON'
      },
      {
        name: 'Prince Edward Island',
        abbr: 'PE'
      },
      {
        name: 'Quebec',
        abbr: 'QC',
      },
      {
        name: 'Saskatchewan',
        abbr: 'SK'
      },
    ];
  }

  ngOnInit() {
    this.contactInfoForm.controls['mailingAddress']['controls']['sameAsBusiness'].valueChanges.subscribe(
      change => {
        const mailingGroup: any = this.contactInfoForm.controls['mailingAddress']['controls'];
        if (!change) {
          this.setRequiredValidators([
            mailingGroup['streetAddress'],
            mailingGroup['city'],
            mailingGroup['province'],
            mailingGroup['postalCode']
          ]);
        }
        else {
          this.clearValidators([
            mailingGroup['streetAddress'],
            mailingGroup['city'],
            mailingGroup['province'],
            mailingGroup['postalCode']
          ]);
        }
      }
    );
  }

  private setRequiredValidators(controls: Array<FormControl>) {
    for (const control of controls) {
      control.setValidators(Validators.required);
    }
  }

  private clearValidators(controls: Array<FormControl>) {
    for (const control of controls) {
      control.clearValidators();
      control.updateValueAndValidity();
    }
  }

  close() {
    // invoked by the initiator component
  }

  saveAndClose() {
    // invoked by the initiator component
  }

}
