import { Component, OnInit } from '@angular/core';
import { AppURLRepo } from '../../utils/app-url-repo';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public uploadImage: string = AppURLRepo.UPLOAD_IMAGE;
  public downloadImage: string = AppURLRepo.DOWNLOAD_IMAGE;

  constructor() { }

  ngOnInit() {
  }

}
