import { Province } from '../../utils/province';

export class Notification {
  drugName: string;
  requestType: string;
  messageTitle: string;
  uploadedFiles: Array<File>;
  comments: string;
  repeat: NotificationRepeat;
  provinces: Array<Province>;
}

export class File {
  name: string;
  size: string;
}

export class NotificationRepeat {
  times: number;
  dates: Array<NotificationDates>;
}

export class NotificationDates {
  date: string;
  description: string;
}
