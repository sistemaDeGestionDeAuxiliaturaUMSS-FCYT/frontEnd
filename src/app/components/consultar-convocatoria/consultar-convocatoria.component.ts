import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';//formularios , formularios reactivos, validadores de formularios


@Component({
  selector: 'app-consultar-convocatoria',
  templateUrl: './consultar-convocatoria.component.html',
  styleUrls: ['./consultar-convocatoria.component.css']
})
export class ConsultarConvocatoriaComponent implements OnInit {
  formulario: FormGroup;//es el formulario de html
  
  tiposDeConvocatoria:any[];
  estadosDeConvocatoria:any[];
  convocatorias:any[];
  accionesParaConvocatoria:any[];

  constructor() { }

  ngOnInit(): void {
    this.tiposDeConvocatoria = [["1","laboratorio"],["2","docencia"]];   
    this.estadosDeConvocatoria = [["1","En configuracion"],["2","Configurando"],["3","En Curso"]]; 
    this.convocatorias = [["675","con1","fe1","fe2"],
                  ["234","con2","fe3","fe4"]];
    this.accionesParaConvocatoria = [["1","Configuarar"],["2","habilitar"],["3","Dar de baja"],["4","Inpugnar"]];              
  }

  
  seleccionarConvocatoria(idConvocatoria:any){
    var elemento: HTMLElement = document.getElementById(idConvocatoria);
    elemento.setAttribute("class","bg-primary");
    /*
    var ss = elemento.getAttribute("id");
    alert(ss);
    console.log(elemento);
    */
  }
}
