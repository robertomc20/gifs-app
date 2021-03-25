import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent {

  // El viewchild permite acceder a elementos DOM nativo que tienen
  // una variable de referencia de plantilla.
  // El signo de !, es para asegurar a TS de que no será nulo
  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;

  constructor( private gifsService: GifsService ) {}

  buscar() {
    const valor = this.txtBuscar.nativeElement.value;

    if ( valor.trim().length === 0) {
      return;
    }

    this.gifsService.buscarGifs( valor );

    this.txtBuscar.nativeElement.value = '';
  }


}
