import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';

// el providedIn, permite usar el servicio de manera global directamente
@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'QK4kxHYgcmXK4Nm2sROXrXO1jqsMZeqJ';
  private servicioUrl: string = 'https:///api.giphy.com/v1/gifs';
  private _historial: string[] = [];

  // El tipado permite controlar y trabajar mucho más facil
  public resultados: Gif[] = [];

  //getter
  get historial(){
    //de esta forma, se rompe la referencia (operador spread)
    //y se regresa un nuevo arreglo 
    return [...this._historial];
  }

  constructor( private http: HttpClient ) {

    this._historial = JSON.parse( localStorage.getItem('historial')! ) || [];
    // Otra forma de hacer lo de arriba
    //if( localStorage. getItem('historial') ){
    //  this._historial = JSON.parse( localStorage.getItem('historial') );
    //}

    // resultados
    this.resultados = JSON.parse( localStorage.getItem('resultados')! ) || [];

  }

  buscarGifs( query: string = '' ) {
    
    query = query.trim().toLocaleLowerCase();

    // si no existe el valor, insertamos en el arreglo
    if( !this._historial.includes( query ) ){
      this._historial.unshift( query );
      this._historial = this._historial.splice(0,10);

      // JSON.stringify convierte cualquier objeto en un string
      localStorage.setItem('historial', JSON.stringify(this._historial) );
    }

    const params = new HttpParams()
          .set('api_key', this.apiKey)
          .set('limit', '10')
          .set('q', query);

    // Trabajar con http tiene mas funcionalidades que el fetch, que es propio de js
    // y es mucho más manejable que el fetch.
    this.http.get<SearchGifsResponse>(`${ this.servicioUrl }/search`, { params })
      .subscribe( ( resp ) => {
          this.resultados = resp.data;
          localStorage.setItem('resultados', JSON.stringify(this.resultados) );
        });

  }

}
