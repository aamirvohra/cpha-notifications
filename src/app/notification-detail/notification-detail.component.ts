import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { AppURLRepo } from '../../utils/app-url-repo';
import { Notification } from '../models/notification';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-notification-detail',
  templateUrl: './notification-detail.component.html',
  styleUrls: ['./notification-detail.component.scss']
})
export class NotificationDetailComponent implements OnInit {

  public closeIcon: string = AppURLRepo.CLOSE_ICON;

  @ViewChild('template')
  protected template: TemplateRef<any>;

  private notificationModalRef: BsModalRef;

  private modalOptions: any;

  @Output('modalClosed')
  protected modalClosed = new EventEmitter();

  @Output('notificationArchived')
  protected notificationArchived = new EventEmitter();

  @Output('editNotification')
  protected editNotification = new EventEmitter();

  @Input('notification')
  protected notification: Notification;

  constructor(private modalService: BsModalService) {
    this.modalOptions = {
      ignoreBackdropClick: true,
    };
  }

  ngOnInit() {
    setTimeout(
      () => {
        this.notificationModalRef = this.modalService.show(this.template,
          Object.assign({}, this.modalOptions,
            {class: 'notification-detail-modal'}
          ));
      }, 10
    );
  }

  close() {
    this.modalClosed.emit(null);
    this.closeModal();
  }

  archive() {
    this.notificationArchived.emit(null);
    this.close();
  }

  edit() {
    this.editNotification.emit(null);
    this.close();
  }

  private closeModal() {
    this.notificationModalRef.hide();
  }

}
