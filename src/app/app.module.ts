import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';

import { HomeModule } from './pages/home/home.module';

import '../theme/styles.scss';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,

    AppRoutingModule,

    HomeModule
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
