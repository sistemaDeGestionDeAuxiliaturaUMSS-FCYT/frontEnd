import { Component, OnInit } from '@angular/core';

import { SerConfConvocatoriaService } from './../servicios/ser-conf-convocatoria.service';

@Component({
  selector: 'app-configurar-convocatoria',
  templateUrl: './configurar-convocatoria.component.html',
  styleUrls: ['./configurar-convocatoria.component.css']
})
export class ConfigurarConvocatoriaComponent implements OnInit {

  constructor(public serConfConvocatoria:SerConfConvocatoriaService) { }

  ngOnInit(): void {
  }

}
