import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from '../app/app.component';
import { JugarComponent } from './components/jugar/jugar.component';
import { HomeComponent } from './components/home/home.component';


const APP_ROUTES: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'home/:id', component: HomeComponent },
  { path: 'jugar/:id', component: JugarComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, { useHash:true } );
