import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { PeliculasService } from 'src/app/services/peliculas.service';
import { Alertas } from 'src/app/utils/alertas';

@Component({
  selector: 'app-detalle-busqueda',
  templateUrl: './detalle-busqueda.component.html',
  styleUrls: ['./detalle-busqueda.component.scss']
})
export class DetalleBusquedaComponent implements OnInit {

  nombrePelicula: any;
  peliculas: any = [];
  pagina: any = 1;
  paginasTotales: number = 0;
  paginaActual: number = 1;
  peliculaSeleccionada: any;
  modalOption: NgbModalOptions = { size: 'lg' }
  modalPeliculaDetalle: NgbModalRef;
  @ViewChild('contentModalPeliculaDetalle', { static: false }) contentModalPeliculaDetalle: any;

  constructor(private router: ActivatedRoute, private servicioPeliculas: PeliculasService, private alertas: Alertas, private servicioModal: NgbModal) {

  }

  ngOnInit(): void {
    this.nombrePelicula = this.router.snapshot.paramMap.get('inputBuscar')
    this.consultarPelicula(this.paginaActual)
  }

  //Consulta las películas por coincidencia en el nombre
  consultarPelicula(pagina: number) {
    this.alertas.openLoading();
    this.servicioPeliculas.obtenerPeliculasPorNombre(this.nombrePelicula, pagina).subscribe(response => {
      this.peliculas = response.results
      if (this.peliculas.length > 0) {
        this.paginasTotales = this.peliculas.length
        this.peliculas.forEach((element: any) => {
           element.poster_path !== null ? element.poster_path = 'https://media.themoviedb.org/t/p/w220_and_h330_face' + element.poster_path : element.poster_path = 'assets/img/default-movie.png'
        });
      }
      this.alertas.closeLoading()
    }, error => {
      this.alertas.openError("Error consultando peliculas")
    })
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

  // Función para manejar el cambio de página
  changePage(page: number): void {
    this.alertas.openLoading();
    if (page >= 1 && page <= this.paginasTotales) {
      this.paginaActual = page;
      this.consultarPelicula(this.paginaActual)
    }
  }

  //Abre el modal detalle de peliculas
  abrirModalDetalle(element: any) {
    this.alertas.openLoading();
    this.peliculaSeleccionada = element
    this.modalOption.keyboard = true;
    this.modalOption.size = 'lg'
    this.modalOption.windowClass = 'classModalDetalle'
    this.modalPeliculaDetalle = this.servicioModal.open(this.contentModalPeliculaDetalle, this.modalOption)
  }

  cerrarModal() {
    this.modalPeliculaDetalle.close();
  }

}
