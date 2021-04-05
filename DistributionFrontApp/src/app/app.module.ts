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

@NgModule({
  declarations: [
    AppComponent,
    LoginRegisterPageComponent,
    LoginComponentComponent,
    RegisterComponentComponent,
    DashboardPageComponent,
    MyIncidentsComponentComponent,
    SocialNetworksLoginComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
