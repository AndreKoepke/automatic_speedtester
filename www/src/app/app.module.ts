import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ChartsModule} from 'ng2-charts';
import {AppComponent} from './app.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ChartsModule
  ],
  providers: [
    HttpClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
