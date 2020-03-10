import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GaleriesPageRoutingModule } from './galeries-routing.module';

import { GaleriesPage } from './galeries.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GaleriesPageRoutingModule
  ],
  declarations: [GaleriesPage]
})
export class GaleriesPageModule {}
