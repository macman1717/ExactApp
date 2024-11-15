//app.module.ts

import { NgModule } from '@angular/core';
import {bootstrapApplication, BrowserModule}
  from '@angular/platform-browser';
// import { AppRoutingModule }
//   from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule, provideHttpClient, withInterceptorsFromDi}
  from '@angular/common/http';
import {SafePipe} from "./safe.pipe";

@NgModule({
  declarations: [
    SafePipe
  ],
  imports: [
    // BrowserModule,
    //AppRoutingModule,

    AppComponent
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi())
  ],
  exports: [
    SafePipe
  ],
  bootstrap: []
})
export class AppModule { }
