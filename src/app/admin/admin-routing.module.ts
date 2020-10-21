import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminComponent} from './admin.component';
import {LoginComponent} from './register/components/login/login.component';
import {DashboardComponent} from './dashboard/components/dashboard/dashboard.component';
import { BeforeLoginService } from './admin-service/guard/before-login.service';
import { AfterLoginService } from './admin-service/guard/after-login.service';


const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AfterLoginService] },
  { path: 'login', component: LoginComponent, canActivate: [BeforeLoginService] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
