import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginRegisterPageComponent } from './Components/login-register-page/login-register-page.component';
import { DashboardPageComponent } from './Components/dashboard-page/dashboard-page.component';
import { AdminProfileRequestsComponent } from './Components/admin-profile-requests/admin-profile-requests.component';
import { TableDashboardComponent } from './Components/dashboard-page/table-dashboard/table-dashboard.component';
import { WorkRequestsPageComponent } from './Components/work-requests-page/work-requests-page.component';

const routes: Routes = [
  { path: "", redirectTo: "login-register", pathMatch: "full" },
  { path: "login-register", component: LoginRegisterPageComponent },
  { path: "dashboard", component: DashboardPageComponent },
  { path: "adminProfileRequests", component: AdminProfileRequestsComponent},
  { path: "myIncidents", component:TableDashboardComponent},
  { path: "workRequests", component: WorkRequestsPageComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
