import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PeliculasService } from 'src/app/services/peliculas.service';
import { Alertas } from 'src/app/utils/alertas';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent implements OnInit {

  @Input() peliculaSeleccionada: any
  elenco: any = [];
  @Output() cerrarModal: EventEmitter<null> = new EventEmitter<null>()


  constructor(private peliculasServices: PeliculasService, private alertas: Alertas) {

  }

  ngOnInit() {
    this.peliculaSeleccionada.backdrop_path = 'https://image.tmdb.org/t/p/w1066_and_h600_bestv2' + this.peliculaSeleccionada.backdrop_path
    this.consultarElenco()
  }

  //Consulta el elenco de la pelicula seleccionada
  consultarElenco() {
    this.peliculasServices.obtenerElencoPelicula(this.peliculaSeleccionada.id).subscribe(response => {
      this.elenco = response.cast
      if (this.elenco.length > 0) {
        this.elenco.forEach((element: any) => {
          element.profile_path !== null ? element.profile_path = 'https://image.tmdb.org/t/p/w220_and_h330_face' + element.profile_path : element.profile_path = 'assets/img/default_img.jpg'
        });
      }
      this.alertas.closeLoading();
    }, error => {
      this.alertas.openError("Error consultando elenco")
    })
  }

  cerrarModalDetalle() {
    this.cerrarModal.emit();
  }


}
