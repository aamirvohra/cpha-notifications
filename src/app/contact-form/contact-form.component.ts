import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppURLRepo } from '../../utils/app-url-repo';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {

  protected contactInfoForm: FormGroup;
  public closeIcon: string = AppURLRepo.CLOSE_ICON;

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
        streetAddress: [null, Validators.required],
        streetAddress2: [null],
        city: [null, Validators.required],
        province: [null, Validators.required],
        postalCode: [null, Validators.required],
      }),
      telephone: [null , Validators.required],
      mobile: [null, Validators.required],
      emailAddress: [null, Validators.required],
    });
  }

  ngOnInit() {
  }

  close() {

  }

}
