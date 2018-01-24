import { Component, OnInit } from '@angular/core';
import { AppURLRepo } from '../../utils/app-url-repo';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ContactFormComponent } from '../contact-form/contact-form.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent {

  protected readonly OK_ICON: string;
  protected readonly NO_BAR_ICON: string;

  private contactModalRef: BsModalRef;
  private modalOptions: any;

  constructor(private modalService: BsModalService) {
    this.OK_ICON = AppURLRepo.OK_ICON;
    this.NO_BAR_ICON = AppURLRepo.NO_BAR_ICON;

    this.modalOptions = {
      ignoreBackdropClick: true,
    };
  }

  protected editContactInformation() {
    this.contactModalRef = this.modalService.show(ContactFormComponent,
      Object.assign({}, this.modalOptions, { class: 'contact-form-modal' }));
  }

}
