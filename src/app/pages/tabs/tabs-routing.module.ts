import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { AuthGuard } from '../../guards/auth.guard'; // Ruta correcta del guard

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    canActivate: [AuthGuard], // Protege la entrada principal de las tabs
    children: [
      {
        path: 'main',
        loadChildren: () => import('../main/main.module').then(m => m.MainPageModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'main/create',
        loadChildren: () => import('../lugar-form/lugar-form.module').then(m => m.LugarFormPageModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'main/edit/:id',
        loadChildren: () => import('../lugar-form/lugar-form.module').then(m => m.LugarFormPageModule),
        canActivate: [AuthGuard],
      },
      {
        path: '',
        redirectTo: '/tabs/main',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
