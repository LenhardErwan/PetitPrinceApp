import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GaleriePage } from './galerie.page';

const routes: Routes = [
  {
    path: '',
    component: GaleriePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GaleriePageRoutingModule {}
