import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

const ROUTES: Routes = [
  {
    path: '',
    component: HomeComponent
  },
];

export const APP_ROUTES = RouterModule.forRoot(ROUTES);