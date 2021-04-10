import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponentComponent } from './Components/login-register-page/login-component/login-component.component';
import { RegisterComponentComponent } from './Components/login-register-page/register-component/register-component.component';
import { LoginRegisterPageComponent } from './Components/login-register-page/login-register-page.component';
import { DashboardPageComponent } from './Components/dashboard-page/dashboard-page.component';
import { MyIncidentsComponentComponent } from './Components/dashboard-page/my-incidents-component/my-incidents-component.component';
import { SocialNetworksLoginComponentComponent } from './Components/login-register-page/social-networks-login-component/social-networks-login-component.component';
import { AdminProfileRequestsComponent } from './Components/admin-profile-requests/admin-profile-requests.component';
import { TableComponentComponent } from './Components/admin-profile-requests/table-component/table-component.component';
import { TableDashboardComponent } from './Components/dashboard-page/table-dashboard/table-dashboard.component';
import { WorkRequestsPageComponent } from './Components/work-requests-page/work-requests-page.component';
import { WorkRequestFormComponent } from './Components/work-requests-page/work-request-form/work-request-form.component';
import { HistoryStateChangesComponent } from './Components/work-requests-page/work-request-form/history-state-changes/history-state-changes.component';
import { BasicInformationFPComponent } from './Components/work-requests-page/work-request-form/basic-information-fp/basic-information-fp.component';
import { MultimediaAttachmentsComponent } from './Components/work-requests-page/work-request-form/multimedia-attachments/multimedia-attachments.component';
import { SideNavbarComponent } from './Components/work-requests-page/side-navbar/side-navbar.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { ProfileDetailsComponent } from './Components/profile/profile-details/profile-details.component';
import { NewIncidentComponent } from './Components/dashboard-page/table-dashboard/new-incident/new-incident.component';
import { BasicInformationIncidentComponent } from './Components/dashboard-page/table-dashboard/new-incident/basic-information-incident/basic-information-incident.component';
import { DevicesComponentComponent } from './Components/dashboard-page/table-dashboard/new-incident/devices-component/devices-component.component';
import { ResolutionComponent } from './Components/dashboard-page/table-dashboard/new-incident/resolution/resolution.component';
import { MapPageComponent } from './Components/map-page/map-page.component';
import { MapComponentComponent } from './Components/map-page/map-component/map-component.component';
import { CallsComponent } from './Components/dashboard-page/table-dashboard/new-incident/calls/calls.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginRegisterPageComponent,
    LoginComponentComponent,
    RegisterComponentComponent,
    DashboardPageComponent,
    MyIncidentsComponentComponent,
    SocialNetworksLoginComponentComponent,
    AdminProfileRequestsComponent,
    TableComponentComponent,
    TableDashboardComponent,
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
    ResolutionComponent,
    MapPageComponent,
    MapComponentComponent,
    CallsComponent,

  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
