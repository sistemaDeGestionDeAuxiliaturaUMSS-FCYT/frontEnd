import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';//formularios , formularios reactivos, validadores de formularios

@Component({
  selector: 'app-crear-convocatoria',
  templateUrl: './crear-convocatoria.component.html',
  styleUrls: ['./crear-convocatoria.component.css']
})
export class CrearConvocatoriaComponent implements OnInit {
  createForm: FormGroup;//es el formulario de login html
  tiposDeConvocatoria:any[];
  
  constructor() { }

  ngOnInit(): void {
    this.createForm = new FormGroup({
      
    });

    this.tiposDeConvocatoria = [["1","laboratorio"],["2","docencia"]];
  }

}
