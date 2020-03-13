import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GaleriesPage } from './galeries.page';

const routes: Routes = [
  {
    path: '',
    component: GaleriesPage
  },
  {
    path: 'galerie',
    loadChildren: () => import('./galerie/galerie.module').then( m => m.GaleriePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GaleriesPageRoutingModule {}
