import { NgModule } from '@angular/core';

import { HomeRoutingModule } from './home.routing';
import { HomePage }   from './home.page';

@NgModule({
  imports: [
    HomeRoutingModule
  ],
  exports: [],
  declarations: [ HomePage ],
  providers: [],
})
export class HomeModule { }
