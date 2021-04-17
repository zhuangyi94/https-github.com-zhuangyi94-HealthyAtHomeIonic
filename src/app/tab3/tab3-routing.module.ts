import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab3Page } from './tab3.page';
import { NgCalendarModule } from 'ionic2-calendar';

const routes: Routes = [
  {
    path: '',
    component: Tab3Page,
  }
];

@NgModule({
  imports: [NgCalendarModule,
    RouterModule.forChild(routes)],

  exports: [RouterModule]
})
export class Tab3PageRoutingModule {}
