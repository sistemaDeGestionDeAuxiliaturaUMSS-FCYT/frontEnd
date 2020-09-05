import { Injectable } from '@angular/core';

import { CalificacionDeConocimientosComponent } from '../calificacion-de-conocimientos/calificacion-de-conocimientos.component';


@Injectable({
  providedIn: 'root'
})
export class SerConfConvocatoriaService {
  porcentajeNetoConvocatoria:number = 0;
  porcentajeNetoConocimiento:number = 0;
  porcentajeNetoMerito:number = 0;

  listaItemsBD:any[][] = [];
  listaItemsDisponibles:any[][] = [];
  listaItemTematica:any[][] = []; //de la tabla de conocimiento
  indexItemTabla:number = 1;

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
  addItemToItemsDisponibles(item:any[]):void{
    this.listaItemsDisponibles.push(item);
  }

  removeItemFromListaItemsDisponibles(index:number):void{
    this.listaItemsDisponibles.splice(index,1);
  }

  getItemsBD():any[][]{
    return this.listaItemsBD;
  }

  getListaItemsDisponibles():any[][]{
    return this.listaItemsDisponibles;
  }

  getListaItemsTematicaTablaConocimiento():any[][]{
    return this.listaItemTematica;
  }

  getIndexItemTabla():number{
    return this.indexItemTabla;
  }

  setIndexItemTabla(index:number):void{
    this.indexItemTabla = index;
  }


  removeItemFromListaItemTematica(idItem:number):void{  
    let indexAux:number = 1;
    let listaItemTematicaAux:any[][] = [];
    
    for (let i = 0; i < this.listaItemTematica.length; i++) {
      if(this.listaItemTematica[i][0] == true){ // es un nombre de item
        if(this.listaItemTematica[i][2] != idItem ){
          this.listaItemTematica[i][1] = indexAux;
          listaItemTematicaAux.push(this.listaItemTematica[i].slice());
          indexAux = indexAux +1;
        }
      }else{ // es un nombre de tematica
        if(this.listaItemTematica[i][1] != idItem){
          listaItemTematicaAux.push(this.listaItemTematica[i]);
        }
      }
    }

    this.indexItemTabla = indexAux;
    this.listaItemTematica.splice(0);
    for(let i=0;i<listaItemTematicaAux.length;i++){
      this.listaItemTematica.push(listaItemTematicaAux[i].slice());
    }
  }

  getIndex(id:number,lista:any[]):number{
    let index:number = -1;
    for (let i = 0; i < lista.length; i++) {
      if(lista[i][0] == id){
        index = i;
        break;
      }      
    }
    return index;
  }
}
