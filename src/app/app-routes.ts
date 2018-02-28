import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ReportsComponent } from './reports/reports.component';
import { AccountComponent } from './account/account.component';
import { SubmitNotificationComponent } from './submit-notification/submit-notification.component';
import { EditNotificationComponent } from './notification/edit/edit-notification.component';

const ROUTES: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'reports',
    component: ReportsComponent,
  },
  {
    path: 'account',
    component: AccountComponent,
  },
  {
    path: 'notifications',
    children: [
      {
        path: '',
        component: SubmitNotificationComponent,
      },
      {
        path: 'edit',
        component: EditNotificationComponent,
      }
    ]
  }

];

export const APP_ROUTES = RouterModule.forRoot(ROUTES);