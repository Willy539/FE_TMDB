import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetalleBusquedaComponent } from './detalle-busqueda/detalle-busqueda.component';

const routes: Routes = [
  {
    path: '', component: DetalleBusquedaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeliculasRoutingModule { }
