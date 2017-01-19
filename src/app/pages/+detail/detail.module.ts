import { NgModule } from '@angular/core';

import { DetailRoutingModule } from './detail.routing';

import { DetailPage }   from './detail.page';

@NgModule({
  imports: [
    DetailRoutingModule
  ],
  exports: [],
  declarations: [ DetailPage ],
  providers: [],
})
export class DetailModule { }
