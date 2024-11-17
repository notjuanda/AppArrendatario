import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LugarFormPage } from './lugar-form.page';

const routes: Routes = [
  {
    path: '',
    component: LugarFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LugarFormPageRoutingModule {}
