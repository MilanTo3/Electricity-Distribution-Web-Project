import { NgModule } from '@angular/core';
import { RouteReuseStrategy, RouterModule, Routes } from '@angular/router';
import { LoginRegisterPageComponent } from './Components/login-register-page/login-register-page.component';
import { DashboardPageComponent } from './Components/dashboard-page/dashboard-page.component';
import { AdminProfileRequestsComponent } from './Components/admin-profile-requests/admin-profile-requests.component';

import { WorkRequestsPageComponent } from './Components/work-requests-page/work-requests-page.component';
import { WorkRequestFormComponent } from './Components/work-requests-page/work-request-form/work-request-form.component';
import { BasicInformationFPComponent } from './Components/work-requests-page/work-request-form/basic-information-fp/basic-information-fp.component';
import { HistoryStateChangesComponent } from './Components/work-requests-page/work-request-form/history-state-changes/history-state-changes.component';
import { MultimediaAttachmentsComponent } from './Components/work-requests-page/work-request-form/multimedia-attachments/multimedia-attachments.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { NewIncidentComponent } from './Components/dashboard-page/my-incidents/new-incident/new-incident.component';
import { BasicInformationIncidentComponent } from './Components/dashboard-page/my-incidents/new-incident/basic-information-incident/basic-information-incident.component';
import { DevicesComponentComponent } from './Components/dashboard-page/my-incidents/new-incident/devices-component/devices-component.component';
import { WorkPlansComponent } from './Components/work-plans/work-plans.component';
import { WorkPlanFormComponent } from './Components/work-plans/work-plan-form/work-plan-form.component';
import { WorkPlanBasicInformationComponent } from './Components/work-plans/work-plan-form/work-plan-basic-information/work-plan-basic-information.component';
import { SwitchingInstructionsComponent } from './Components/work-plans/work-plan-form/switching-instructions/switching-instructions.component';
import { ResolutionComponent } from './Components/dashboard-page/my-incidents/new-incident/resolution/resolution.component';
import { MapPageComponent } from './Components/map-page/map-page.component';
import { CallsComponent } from './Components/dashboard-page/my-incidents/new-incident/calls/calls.component';
import { TeamsPageComponent } from './Components/teams-page/teams-page.component';
import { CreateTeamComponent } from './Components/teams-page/create-team/create-team.component';
import { NewCallComponent } from './Components/new-call/new-call.component';
import { NotificationsComponent } from './Components/notifications/notifications.component';
import { CardDashboardComponent } from './Components/dashboard-page/card-dashboard/card-dashboard.component';
import { MyIncidentsComponent } from './Components/dashboard-page/my-incidents/my-incidents.component';
import { MySafetyDocsComponent } from './Components/dashboard-page/my-safety-docs/my-safety-docs.component';
import { NewSafetyDocComponent } from './Components/dashboard-page/my-safety-docs/new-safety-doc/new-safety-doc.component';
import { BasicInformationMysfdocComponent } from './Components/dashboard-page/my-safety-docs/new-safety-doc/basic-information-mysfdoc/basic-information-mysfdoc.component';
import { HistoryChangeMysfdcComponent } from './Components/dashboard-page/my-safety-docs/new-safety-doc/history-change-mysfdc/history-change-mysfdc.component';
import { ChecklistMysfdcComponent } from './Components/dashboard-page/my-safety-docs/new-safety-doc/checklist-mysfdc/checklist-mysfdc.component';
import { NewDeviceComponent } from './Components/dashboard-page/my-incidents/new-incident/devices-component/new-device/new-device.component';
import { SettingsComponent } from './Components/settings/settings.component';
import { EditTeamComponent } from './Components/teams-page/edit-team/edit-team.component';
import { ViewTeamComponent } from './Components/teams-page/view-team/view-team.component';

const routes: Routes = [
  { path: "", redirectTo: "login-register", pathMatch: "full" },
  { path: "login-register", component: LoginRegisterPageComponent },
  { path: "dashboard", component: DashboardPageComponent
   /* children: [
      { path: "myIncidents", component: MyIncidentsComponent},  
      { path: "mySafetyDocs", component: MySafetyDocsComponent}
    ]*/
  },
  { path: "adminProfileRequests", component: AdminProfileRequestsComponent},
  { path: "myIncidents", component: MyIncidentsComponent},
  { path: "mySafetyDocs", component: MySafetyDocsComponent},
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
      { path: "basicInformation", component: BasicInformationIncidentComponent},
      { path: "devices", component: DevicesComponentComponent },
      { path: "resolution", component: ResolutionComponent },  
      { path: "calls", component: CallsComponent },
      { path: "multimediaAttachments", component: MultimediaAttachmentsComponent },
      { path: "crew", component: TeamsPageComponent }
    ]
  },

  { path: "newDevice", component: NewDeviceComponent },
  { path:"newMySafetyDoc", component: NewSafetyDocComponent,
    children: [
      { path: "basicInformation", component: BasicInformationMysfdocComponent},
      { path: "historyOfMyDocChanges", component: HistoryChangeMysfdcComponent },
      { path: "multimediaAttachments", component: MultimediaAttachmentsComponent },
      { path: "checklist", component: ChecklistMysfdcComponent }
    ]

  },
  { path: "workPlans", component: WorkPlansComponent },
  { path: "newWorkPlan", component: WorkPlanFormComponent,
     children: [
      { path: "basic-information", component: WorkPlanBasicInformationComponent},
      { path: "history-of-state-changes", component: HistoryStateChangesComponent },
      { path: "multimedia-attachments", component: MultimediaAttachmentsComponent },
      { path: "switching-instructions", component: SwitchingInstructionsComponent }

      ]
  },
  { path: "map", component: MapPageComponent },
  { path: "teamsPage", component: TeamsPageComponent },
  { path: "createTeam", component: CreateTeamComponent },
  { path: "new-call", component: NewCallComponent},
  { path: "notifications", component: NotificationsComponent},
  { path: "settings", component: SettingsComponent},
  { path: "editTeam", component: EditTeamComponent },
  { path: "viewTeam", component: ViewTeamComponent },
    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
