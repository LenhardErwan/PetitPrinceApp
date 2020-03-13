import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';

import { GaleriesPageRoutingModule } from './galeries-routing.module';

import { GaleriesPage } from './galeries.page';
import { GaleriePageModule } from './galerie/galerie.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    GaleriesPageRoutingModule,
    GaleriePageModule
  ],
  declarations: [GaleriesPage]
})
export class GaleriesPageModule {}
