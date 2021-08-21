import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConcluidosPage } from './concluidos.page';

const routes: Routes = [
  {
    path: '',
    component: ConcluidosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConcluidosPageRoutingModule {}
