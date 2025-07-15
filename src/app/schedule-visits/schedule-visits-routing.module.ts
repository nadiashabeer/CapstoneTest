import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScheduleVisitsPage } from './schedule-visits.page';

const routes: Routes = [
  {
    path: '',
    component: ScheduleVisitsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScheduleVisitsPageRoutingModule {}
