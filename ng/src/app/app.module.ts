import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {allAppComponents, AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  //Declares what components can be used in this module/application
  declarations: [
    AppComponent,
    ...allAppComponents
  ],
  // declares what outside modules can be used by this module/application
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  // Specifies what services or other providers like interceptors can used for Dependency Injection in the Module/Application.
  providers: [],
  // specifies the root component that will be injected into the base index.html
  bootstrap: [AppComponent]
})
/**
 * Main entry point for the angular application. A module is a self contained chunk of code that can function by its
 * self or plugged into other angular modules.
 */
export class AppModule { }
