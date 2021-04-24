import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ToastrModule} from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponentComponent } from './Components/login-register-page/login-component/login-component.component';
import { RegisterComponentComponent } from './Components/login-register-page/register-component/register-component.component';
import { LoginRegisterPageComponent } from './Components/login-register-page/login-register-page.component';
import { DashboardPageComponent } from './Components/dashboard-page/dashboard-page.component';

import { SocialNetworksLoginComponentComponent } from './Components/login-register-page/social-networks-login-component/social-networks-login-component.component';
import { AdminProfileRequestsComponent } from './Components/admin-profile-requests/admin-profile-requests.component';
import { TableComponentComponent } from './Components/admin-profile-requests/table-component/table-component.component';

import { WorkRequestsPageComponent } from './Components/work-requests-page/work-requests-page.component';
import { WorkRequestFormComponent } from './Components/work-requests-page/work-request-form/work-request-form.component';
import { HistoryStateChangesComponent } from './Components/work-requests-page/work-request-form/history-state-changes/history-state-changes.component';
import { BasicInformationFPComponent } from './Components/work-requests-page/work-request-form/basic-information-fp/basic-information-fp.component';
import { MultimediaAttachmentsComponent } from './Components/work-requests-page/work-request-form/multimedia-attachments/multimedia-attachments.component';
import { SideNavbarComponent } from './Components/work-requests-page/side-navbar/side-navbar.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { ProfileDetailsComponent } from './Components/profile/profile-details/profile-details.component';
import { NewIncidentComponent } from './Components/dashboard-page/my-incidents/new-incident/new-incident.component';
import { BasicInformationIncidentComponent } from './Components/dashboard-page/my-incidents/new-incident/basic-information-incident/basic-information-incident.component';
import { DevicesComponentComponent } from './Components/dashboard-page/my-incidents/new-incident/devices-component/devices-component.component';
import { WorkPlansComponent } from './Components/work-plans/work-plans.component';
import { WorkPlanFormComponent } from './Components/work-plans/work-plan-form/work-plan-form.component';
import { WorkPlanBasicInformationComponent } from './Components/work-plans/work-plan-form/work-plan-basic-information/work-plan-basic-information.component';
import { SwitchingInstructionsComponent } from './Components/work-plans/work-plan-form/switching-instructions/switching-instructions.component';
import { ResolutionComponent } from './Components/dashboard-page/my-incidents/new-incident/resolution/resolution.component';
import { MapPageComponent } from './Components/map-page/map-page.component';
import { MapComponentComponent } from './Components/map-page/map-component/map-component.component';
import { CallsComponent } from './Components/dashboard-page/my-incidents/new-incident/calls/calls.component';
import { TeamsPageComponent } from './Components/teams-page/teams-page.component';
import { CreateTeamComponent } from './Components/teams-page/create-team/create-team.component';
import { NewCallComponent } from './Components/new-call/new-call.component';
import { NotificationsComponent } from './Components/notifications/notifications.component';
import { MySafetyDocsComponent } from './Components/dashboard-page/my-safety-docs/my-safety-docs.component';
import { CardDashboardComponent } from './Components/dashboard-page/card-dashboard/card-dashboard.component';
import { MyIncidentsComponent } from './Components/dashboard-page/my-incidents/my-incidents.component';
import { NewSafetyDocComponent } from './Components/dashboard-page/my-safety-docs/new-safety-doc/new-safety-doc.component';
import { BasicInformationMysfdocComponent } from './Components/dashboard-page/my-safety-docs/new-safety-doc/basic-information-mysfdoc/basic-information-mysfdoc.component';
import { HistoryChangeMysfdcComponent } from './Components/dashboard-page/my-safety-docs/new-safety-doc/history-change-mysfdc/history-change-mysfdc.component';
import { ChecklistMysfdcComponent } from './Components/dashboard-page/my-safety-docs/new-safety-doc/checklist-mysfdc/checklist-mysfdc.component';
import { NewDeviceComponent } from './Components/dashboard-page/my-incidents/new-incident/devices-component/new-device/new-device.component';
import { NavigationBarComponent } from './Components/dashboard-page/navigation-bar/navigation-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModuleModule } from './material-module/material-module.module';
import { NotificationComponent } from './Components/notifications/notification/notification.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { LineChartComponent } from './Components/dashboard-page/line-chart-kartica/line-chart/line-chart.component';
import { LineChartKarticaComponent } from './Components/dashboard-page/line-chart-kartica/line-chart-kartica.component';
import { EditTeamComponent } from './Components/teams-page/edit-team/edit-team.component';
import { ViewTeamComponent } from './Components/teams-page/view-team/view-team.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginRegisterPageComponent,
    LoginComponentComponent,
    RegisterComponentComponent,
    DashboardPageComponent,
    SocialNetworksLoginComponentComponent,
    AdminProfileRequestsComponent,
    TableComponentComponent,
    WorkRequestsPageComponent,
    WorkRequestFormComponent,
    HistoryStateChangesComponent,
    BasicInformationFPComponent,
    MultimediaAttachmentsComponent,
    SideNavbarComponent,
    ProfileComponent,
    ProfileDetailsComponent,    
    NewIncidentComponent,
    BasicInformationIncidentComponent,
    DevicesComponentComponent,
    WorkPlansComponent,
    WorkPlanFormComponent,
    WorkPlanBasicInformationComponent,
    SwitchingInstructionsComponent,
    ResolutionComponent,
    MapPageComponent,
    MapComponentComponent,
    CallsComponent,
    TeamsPageComponent,
    CreateTeamComponent,
    NewCallComponent,
    NotificationsComponent,
    MySafetyDocsComponent,
    CardDashboardComponent,
    MyIncidentsComponent,
    NewSafetyDocComponent,
    BasicInformationMysfdocComponent,
    HistoryChangeMysfdcComponent,
    ChecklistMysfdcComponent,
    NewDeviceComponent,
    NavigationBarComponent,
    NotificationComponent,
    LineChartComponent,
    LineChartKarticaComponent,
    EditTeamComponent,
    ViewTeamComponent
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModuleModule,
    ToastrModule.forRoot(
      {
        timeOut: 1500
      }
    ),
    NgxChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
