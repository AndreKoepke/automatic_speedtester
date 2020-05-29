import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ChartsModule} from 'ng2-charts';
import {AppComponent} from './app.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { PrintBaseValuesComponent } from './components/print-base-values/print-base-values.component';
import { MbitPipe } from './pipes/mbit-pipe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    PrintBaseValuesComponent,
    MbitPipe
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
