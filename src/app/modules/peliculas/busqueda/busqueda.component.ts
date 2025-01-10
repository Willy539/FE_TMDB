import { Component, OnInit, ViewChild } from '@angular/core';
import { PeliculasService } from 'src/app/services/peliculas.service';
import { MatTableDataSource } from '@angular/material/table'
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Alertas } from 'src/app/utils/alertas';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.scss']
})
export class BusquedaComponent {

  modalOption: NgbModalOptions = { size: 'lg' }
  modalPeliculaDetalle: NgbModalRef;
  @ViewChild('contentModalPeliculaDetalle', { static: false }) contentModalPeliculaDetalle: any;
  peliculas: any;
  txtNombrePelicula: any;
  peliculaSeleccionada: any;
  offset: number = 0;
  circumference: number = 0;

  constructor(private servicioPeliculas: PeliculasService, private servicioModal: NgbModal, private router: Router, private alertas: Alertas) {

  }

  ngOnInit() {
    this.alertas.openLoading()
    this.consultarPeliculas()
  }

  //Metodo encargado de consultar peliculas
  consultarPeliculas() {
    this.servicioPeliculas.obtenerListadoPeliculas().subscribe(response => {
      this.peliculas = response.results
      this.peliculas.forEach((element: any) => {
        element.poster_path = 'https://media.themoviedb.org/t/p/w220_and_h330_face' + element.poster_path
        element.vote_count = this.calcularPorcentaje(element.vote_count)
      });
      this.alertas.closeLoading()
    }, error => {
      this.alertas.openError("Error consultando peliculas")
    })
  }

  //Envia a la pagina donde se muestran los registros econtrados por coincidencia
  filtrarPeliculas() {
    (this.txtNombrePelicula) ? this.router.navigate(['/detalleBusqueda', this.txtNombrePelicula]) : this.alertas.warning("Por favor diligenciar el campo de busqueda")
  }

  //Abre el modal detalle de peliculas
  abrirModalDetalle(element: any) {
    this.alertas.openLoading()
    this.peliculaSeleccionada = element
    this.modalOption.keyboard = true;
    this.modalOption.size = 'lg'
    this.modalOption.windowClass = 'classModalDetalle'
    this.modalPeliculaDetalle = this.servicioModal.open(this.contentModalPeliculaDetalle, this.modalOption)
  }

  // Divide los elementos en 5 filas de 4 tarjetas cada una
  get rows() {
    if (this.peliculas) {
      return this.dividir(this.peliculas, 5);
    }
  }

  dividir(array: any[], size: number) {
    return array.reduce((acc, _, index) => {
      if (index % size === 0) {
        acc.push(array.slice(index, index + size));
      }
      return acc;
    }, []);
  }

  // Calcula el porcentaje de valoración de las peliculas
  calcularPorcentaje(percentage: any) {
    const radius = 55;
    this.circumference = 2 * Math.PI * radius;
    return this.offset = this.circumference - (percentage / 100) * this.circumference;
  }

}
