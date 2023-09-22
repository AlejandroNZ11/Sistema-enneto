import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './calendar.component';

const routes: Routes = [
  {
    path: '', component: CalendarComponent,
    children: [
      {
        path: 'citas',
        loadChildren: () =>
          import('./citas/citas.module').then(
            (m) => m.CitasModule
          ),
      },
      {
        path: 'control',
        loadChildren: () =>
          import('./control/control.module').then(
            (m) => m.ControlModule
          ),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalendarRoutingModule { }
