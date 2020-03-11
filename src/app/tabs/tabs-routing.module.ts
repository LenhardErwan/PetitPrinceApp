import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { AuthGuardService } from '../services/auth-guard.service';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'dates',
        canActivate: [AuthGuardService],
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../dates/dates.module').then(m => m.DatesPageModule)
          }
        ]
      },
      {
        path: 'articles',
        canActivate: [AuthGuardService],
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../articles/articles.module').then(m => m.ArticlesPageModule)
          }
        ]
      },
      {
        path: 'galeries',
        canActivate: [AuthGuardService],
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../galeries/galeries.module').then(m => m.GaleriesPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/articles',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/articles',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
