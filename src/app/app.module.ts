import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { PrincipalComponent } from './modules/peliculas/principal/principal.component';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { BusquedaComponent } from './modules/peliculas/busqueda/busqueda.component';
import { FormsModule } from '@angular/forms';
import { DetalleComponent } from './modules/peliculas/detalle/detalle.component';
import { MenuComponent } from './modules/peliculas/menu/menu.component';
import { DetalleBusquedaComponent } from './modules/peliculas/detalle-busqueda/detalle-busqueda.component';

@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    DetalleComponent,
    BusquedaComponent,
    DetalleBusquedaComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSortModule,
    MatTableModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
