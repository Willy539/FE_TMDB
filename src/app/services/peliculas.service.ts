import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';
import { environments } from 'src/environment/environment';


@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  options = {
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MTkzNTMwNWQxNDQ1OGRkNGJiMzk4NjQ0MDZjM2RkOSIsIm5iZiI6MTczNjM4MTkwNC45MjEsInN1YiI6IjY3N2YxNWQwMjAzN2ZmMDRjOTRlN2E0NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5k9-YlXpp21GGwWQ1xvOb2pEYdMXYcCTjD0ULuxsLFA'
    }
  };

  constructor(private http: HttpClient) { }


  /* Servicio encargado de realizar la consulta de peliculas */
  public obtenerListadoPeliculas() {
    return this.http.get(environments.apiPeliculas, this.options).pipe(
      map((response: any) => {
        return response;
      }), catchError(error => {
        return throwError(error)
      })
    )
  }

  /* Servicio encargado de realizar la consulta el elenco de una pelicula */
  public obtenerElencoPelicula(idPelicula: number) {
    return this.http.get(environments.apiElencoPeliculas + idPelicula + '/credits?language=en-US', this.options).pipe(
      map((response: any) => {
        return response;
      }), catchError(error => {
        return throwError(error)
      })
    )
  }

  /* Servicio encargado de consultar peliculas por coincidencia en el nombre */
  public obtenerPeliculasPorNombre(nombrePelicula: string, pagina: any) {
    return this.http.get(environments.apiPeliculasPorNombre + nombrePelicula +'&language=es&page=' + pagina, this.options).pipe(
      map((response: any) => {
        return response;
      }), catchError(error => {
        return throwError(error)
      })
    )
  }
}
