import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './modules/peliculas/principal/principal.component';
import { DetalleBusquedaComponent } from './modules/peliculas/detalle-busqueda/detalle-busqueda.component';

const routes: Routes = [
  {
    path: '', component: PrincipalComponent
  },
  { path: 'detalleBusqueda/:inputBuscar', component: DetalleBusquedaComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
