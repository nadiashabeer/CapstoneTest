import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScheduleVisitsPageRoutingModule } from './schedule-visits-routing.module';

import { ScheduleVisitsPage } from './schedule-visits.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScheduleVisitsPageRoutingModule
  ],
  declarations: [ScheduleVisitsPage]
})
export class ScheduleVisitsPageModule {}
