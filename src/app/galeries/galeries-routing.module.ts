import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GaleriesPage } from './galeries.page';

const routes: Routes = [
  {
    path: '',
    component: GaleriesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GaleriesPageRoutingModule {}
