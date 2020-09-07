import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modificar-dato-rotulo',
  templateUrl: './modificar-dato-rotulo.component.html',
  styleUrls: ['./modificar-dato-rotulo.component.css']
})
export class ModificarDatoRotuloComponent implements OnInit {
  mostrarOpciones:boolean;
  constructor() { }

  ngOnInit(): void {
    this.mostrarOpciones = false;
  }

  mouseOver(tituloModificarDato:HTMLElement){
    tituloModificarDato.classList.add('font-weight-bold');
  }

  mouseOut(tituloModificarDato:HTMLElement){
    tituloModificarDato.classList.remove('font-weight-bold');
  }

  setMostrarOpciones(){
    this.mostrarOpciones = (this.mostrarOpciones)?false:true;
  }
}
