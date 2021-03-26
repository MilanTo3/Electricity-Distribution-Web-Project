import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponentComponent } from './Components/login-register-page/login-component/login-component.component';
import { RegisterComponentComponent } from './Components/login-register-page/register-component/register-component.component';
import { LoginRegisterPageComponent } from './Components/login-register-page/login-register-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginRegisterPageComponent,
    LoginComponentComponent,
    RegisterComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
