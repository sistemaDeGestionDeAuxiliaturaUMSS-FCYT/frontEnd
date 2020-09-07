import { Component, OnInit } from '@angular/core';

import { FormGroup } from '@angular/forms';//formularios , formularios reactivos, validadores de formularios


@Component({
  selector: 'app-postular-convocatoria',
  templateUrl: './postular-convocatoria.component.html',
  styleUrls: ['./postular-convocatoria.component.css']
})
export class PostularConvocatoriaComponent implements OnInit {
  formularioPostularConvocatoria: FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.formularioPostularConvocatoria = new FormGroup({}); 
  }

}
