import { Component, OnInit } from '@angular/core';

import { FormGroup } from '@angular/forms';//formularios , formularios reactivos, validadores de formularios


@Component({
  selector: 'app-curriculo-vitae',
  templateUrl: './curriculo-vitae.component.html',
  styleUrls: ['./curriculo-vitae.component.css']
})
export class CurriculoVitaeComponent implements OnInit {
  forCodigoPostulante: FormGroup;
  forDatosPersonales:FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.forCodigoPostulante = new FormGroup({}); 
    this.forDatosPersonales = new FormGroup({});
  }

}
