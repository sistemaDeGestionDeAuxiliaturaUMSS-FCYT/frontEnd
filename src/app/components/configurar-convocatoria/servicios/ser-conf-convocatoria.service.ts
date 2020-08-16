import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SerConfConvocatoriaService {
  porcentajeNetoConvocatoria:number = 0;
  porcentajeNetoConocimiento:number = 0;
  porcentajeNetoMerito:number = 0;
  constructor() { }

  setPorcentajeNetoConocimiento(porcentaje:number){
    this.porcentajeNetoConocimiento = porcentaje;
    this.porcentajeNetoConvocatoria = Number(this.porcentajeNetoConocimiento) + Number(this.porcentajeNetoMerito);
  }

  setPorcentajeNetoMerito(porcentaje:number){
    this.porcentajeNetoMerito = porcentaje;
    this.porcentajeNetoConvocatoria = Number(this.porcentajeNetoMerito) + Number(this.porcentajeNetoConocimiento);
  }

  getPorcentajeNetoConocimiento():number{
    return this.porcentajeNetoConocimiento;
  }

  getPorcentajeNetoMerito():number{
    return this.porcentajeNetoMerito;
  }

  /**
   * lista de items seleccionados
   */
}
