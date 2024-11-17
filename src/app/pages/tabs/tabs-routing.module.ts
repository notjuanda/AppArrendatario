import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { AuthGuard } from '../../guards/auth.guard'; // Ruta correcta del guard

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    canActivate: [AuthGuard],
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
        path: 'perfil',
        loadChildren: () => import('../perfil/perfil.module').then(m => m.PerfilPageModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'reservas',
        loadChildren: () => import('../reservas/reservas.module').then(m => m.ReservasPageModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'reservas/lugar/:id',
        loadChildren: () => import('../reservas-lugar/reservas-lugar.module').then(m => m.ReservasLugarPageModule),
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
