import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { APP_ROUTES } from './app-routes';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule, BsDropdownModule, PaginationModule } from 'ngx-bootstrap';
import { ModalService } from './services/modal-service.service';
import { ReportsComponent } from './reports/reports.component';
import { ReportsService } from './services/reports.service';
import { Daterangepicker } from 'ng2-daterangepicker';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    RegisterComponent,
    ReportsComponent,
    LoginComponent,
  ],
  entryComponents: [
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    APP_ROUTES,
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    PaginationModule.forRoot(),
    Daterangepicker,
  ],
  providers: [
    ModalService,
    ReportsService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
