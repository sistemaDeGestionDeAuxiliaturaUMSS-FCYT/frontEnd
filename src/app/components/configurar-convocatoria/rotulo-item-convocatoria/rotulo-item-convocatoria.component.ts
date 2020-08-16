import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rotulo-item-convocatoria',
  templateUrl: './rotulo-item-convocatoria.component.html',
  styleUrls: ['./rotulo-item-convocatoria.component.css']
})
export class RotuloItemConvocatoriaComponent implements OnInit {
  banderaRotuloPorConvocatoria:boolean;
  rotuloPorConvocatoria:HTMLFormElement;
  rotuloPorItem:HTMLFormElement;

  constructor() { }

  ngOnInit(): void {
    
    this.rotuloPorConvocatoria = <HTMLFormElement>document.getElementById('rotuloConvocatoria');
    this.rotuloPorItem = <HTMLFormElement>document.getElementById('rotuloItem');
    
    this.rotuloPorConvocatoria.setAttribute("checked","");
    this.banderaRotuloPorConvocatoria = true;
  }

  cambioBanderaRotuloPorConvocatoria(){
    if(this.rotuloPorConvocatoria.checked){
      console.log("por convocatoria");
      this.banderaRotuloPorConvocatoria = true;
    }else if(this.rotuloPorItem.checked){
      console.log("por item");
      this.banderaRotuloPorConvocatoria = false;
    }
  }
}
