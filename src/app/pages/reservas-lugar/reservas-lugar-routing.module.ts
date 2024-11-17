import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReservasLugarPage } from './reservas-lugar.page';

const routes: Routes = [
  {
    path: '',
    component: ReservasLugarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReservasLugarPageRoutingModule {}
