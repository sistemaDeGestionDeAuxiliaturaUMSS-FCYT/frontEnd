import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';//formularios , formularios reactivos, validadores de formularios


@Component({
  selector: 'app-consultar-convocatoria',
  templateUrl: './consultar-convocatoria.component.html',
  styleUrls: ['./consultar-convocatoria.component.css']
})
export class ConsultarConvocatoriaComponent implements OnInit {
  formulario: FormGroup;//es el formulario de html

  constructor() { }

  ngOnInit(): void {
  }


}
