import { element } from 'protractor';
import { AnyARecord } from 'dns';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aniadir-dato-rotulo',
  templateUrl: './aniadir-dato-rotulo.component.html',
  styleUrls: ['./aniadir-dato-rotulo.component.css']
})
export class AniadirDatoRotuloComponent implements OnInit {
  mostrarOpciones:boolean;
  constructor() { }

  ngOnInit(): void {
    this.mostrarOpciones = false;
  }

  mouseOver(tituloAddNuevoDato:HTMLElement){
    tituloAddNuevoDato.classList.add('font-weight-bold');
  }

  mouseOut(tituloAddNuevoDato:HTMLElement){
    tituloAddNuevoDato.classList.remove('font-weight-bold');
  }

  setMostrarOpciones(){
    this.mostrarOpciones = (this.mostrarOpciones)?false:true;
  }
}
