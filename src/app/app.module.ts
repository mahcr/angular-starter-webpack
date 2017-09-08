import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';

import { StoreModule } from '@ngrx/store';
import { counterReducer } from './global/reducers/counter';

import { HomeModule } from './pages/home/home.module';

import '../theme/styles.scss';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,

    AppRoutingModule,

    HomeModule,

    StoreModule.provideStore({ counter: counterReducer })
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
