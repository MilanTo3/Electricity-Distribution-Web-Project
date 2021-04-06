import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
