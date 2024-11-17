import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReservasLugarPageRoutingModule } from './reservas-lugar-routing.module';

import { ReservasLugarPage } from './reservas-lugar.page';

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReservasLugarPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [ReservasLugarPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ReservasLugarPageModule {}
