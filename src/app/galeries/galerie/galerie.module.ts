import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GaleriePageRoutingModule } from './galerie-routing.module';

import { GaleriePage } from './galerie.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GaleriePageRoutingModule
  ],
  declarations: [GaleriePage]
})
export class GaleriePageModule {}
