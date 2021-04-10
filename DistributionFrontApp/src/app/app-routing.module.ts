import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginRegisterPageComponent } from './Components/login-register-page/login-register-page.component';
import { DashboardPageComponent } from './Components/dashboard-page/dashboard-page.component';
import { AdminProfileRequestsComponent } from './Components/admin-profile-requests/admin-profile-requests.component';
import { TableDashboardComponent } from './Components/dashboard-page/table-dashboard/table-dashboard.component';
import { WorkRequestsPageComponent } from './Components/work-requests-page/work-requests-page.component';
import { WorkRequestFormComponent } from './Components/work-requests-page/work-request-form/work-request-form.component';
import { BasicInformationFPComponent } from './Components/work-requests-page/work-request-form/basic-information-fp/basic-information-fp.component';
import { HistoryStateChangesComponent } from './Components/work-requests-page/work-request-form/history-state-changes/history-state-changes.component';
import { MultimediaAttachmentsComponent } from './Components/work-requests-page/work-request-form/multimedia-attachments/multimedia-attachments.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { NewIncidentComponent } from './Components/dashboard-page/table-dashboard/new-incident/new-incident.component';
import { BasicInformationIncidentComponent } from './Components/dashboard-page/table-dashboard/new-incident/basic-information-incident/basic-information-incident.component';
import { DevicesComponentComponent } from './Components/dashboard-page/table-dashboard/new-incident/devices-component/devices-component.component';
import { ResolutionComponent } from './Components/dashboard-page/table-dashboard/new-incident/resolution/resolution.component';

const routes: Routes = [
  { path: "", redirectTo: "login-register", pathMatch: "full" },
  { path: "login-register", component: LoginRegisterPageComponent },
  { path: "dashboard", component: DashboardPageComponent },
  { path: "adminProfileRequests", component: AdminProfileRequestsComponent},
  { path: "myIncidents", component:TableDashboardComponent},
  { path: "workRequests", component: WorkRequestsPageComponent },
  { path: "workRequestForm", component: WorkRequestFormComponent,
     children: [
    { path: "basicInformation", component: BasicInformationFPComponent },
    { path: "historyStateChanges", component: HistoryStateChangesComponent },
    { path: "multimediaAttachments", component: MultimediaAttachmentsComponent }
  ] },
  { path: "profile", component: ProfileComponent },

  { path: "newIncident", component: NewIncidentComponent,
    children: [
      { path: "basicInformation", component: BasicInformationIncidentComponent },
      { path: "devices", component: DevicesComponentComponent },
      { path: "resolution", component: ResolutionComponent }
      
    ]
  }

    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
