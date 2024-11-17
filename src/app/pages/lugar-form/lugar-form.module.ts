import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LugarFormPageRoutingModule } from './lugar-form-routing.module';

import { ReactiveFormsModule } from '@angular/forms';

import { LugarFormPage } from './lugar-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LugarFormPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [LugarFormPage]
})
export class LugarFormPageModule {}
