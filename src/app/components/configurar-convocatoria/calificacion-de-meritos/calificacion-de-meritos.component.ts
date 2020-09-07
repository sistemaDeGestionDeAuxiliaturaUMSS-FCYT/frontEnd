import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';//formularios , formularios reactivos, validadores de formularios

import { SerConfConvocatoriaService } from './../servicios/ser-conf-convocatoria.service';


declare var $: any;

@Component({
  selector: 'app-calificacion-de-meritos',
  templateUrl: './calificacion-de-meritos.component.html',
  styleUrls: ['./calificacion-de-meritos.component.css']
})
export class CalificacionDeMeritosComponent implements OnInit {

  formularioMerito:FormGroup;
  porcentajeNetoMerito:number;
  porcentajeTotal:number;
  nivelMeritoEditar:number;
  idMeritoEditar:string;
  mensajePorcentaje:string;
  nivel:number;
  idPadre:string; // idPadre
  idUniversal:number;
  
  listaNivel1:any[][] = [];
  listaNivel2:any[][] = [];
  listaNivel3:any[][] = [];
  listaNivel4:any[][] = [];
  listaTodosLosNiveles:any[][] = [];
  
  constructor(private serConfConvocatoria:SerConfConvocatoriaService) { }

  ngOnInit(): void {
    this.formularioMerito = new FormGroup({});
    this.porcentajeNetoMerito = 0;
    this.porcentajeTotal = 100;
    this.mensajePorcentaje = "Escriba un porcentaje numerico entero positivo mayor a cero *";
    this.nivel = 1;
    this.idPadre = "1";
    this.idUniversal = 1;
    this.nivelMeritoEditar = -1;
    this.idMeritoEditar = "-1";
  }

  setPorcentajeNetoMerito(){
    let porcentajeElement = <HTMLFormElement>document.getElementById('idPorcentajeNetoMerito');
    let porcentajeValue = Number(porcentajeElement.value);
    if(this.esNumeroEnteroPositivo(porcentajeValue)){
      let sumaPorcentajes:number = Number(this.serConfConvocatoria.getPorcentajeNetoConocimiento()) + Number(porcentajeValue);
      //console.log("--> conocimiento: " + this.serConfConvocatoria.getPorcentajeNetoConocimiento());
      //console.log("--> suma: " + sumaPorcentajes);

      if(sumaPorcentajes <= 100){
        this.porcentajeNetoMerito = porcentajeValue;
        porcentajeElement.value = "";
        porcentajeElement.classList.remove("is-valid");
        porcentajeElement.classList.remove("is-invalid");
        this.serConfConvocatoria.setPorcentajeNetoMerito(this.porcentajeNetoMerito);
      }else{
        porcentajeElement.classList.remove("is-valid");
        porcentajeElement.classList.add("is-invalid");
      }
    }
  }

  setNivelyIdMerito(nivel:number, idPadre:string){
    this.nivel = nivel;
    this.idPadre = idPadre;   

    this.nivelMeritoEditar = -1;
    this.idMeritoEditar = "-1";

    //console.log("nivel:" + nivel + "   " + "idPadre: " + idPadre);
  }

  guardarMeritoEnNivel(){
    var botonGuardar = document.getElementById("guardarMerito");
    botonGuardar.removeAttribute("data-dismiss");

    let descripcion:HTMLFormElement = <HTMLFormElement>document.getElementById('descripcionMerito');
    let porcentaje:HTMLFormElement= <HTMLFormElement>document.getElementById('porcentajeEvaluacionMerito');
    
    if(this.meritoValido(descripcion,porcentaje)){
      let lista:any[] = [];

      if(this.nivel===1){
        if(this.nivelMeritoEditar == -1){ //añado
          let index = this.listaNivel1.length+1;
          //        nivel, id , idpadre
          lista.push(this.nivel,index+"","-1",(<string>descripcion.value).toUpperCase(),Number(porcentaje.value),this.idUniversal);
          this.listaNivel1.push(lista);
        }else{ // edito
          let index = this.getIndexMeritoNivelEspecifico(this.idMeritoEditar,this.listaNivel1);
          this.listaNivel1[index][3] = (<string>descripcion.value).toUpperCase();
          this.listaNivel1[index][4] = Number(porcentaje.value);
        }
      }else if(this.nivel===2){
        if(this.nivelMeritoEditar == -1){ //añado
          let cont = this.buscarUltimoIndicePadre()+1;
          let idMerito = this.idPadre+"."+cont;
          //        nivel, id , idpadre
          lista.push(this.nivel,idMerito,this.idPadre,(<string>descripcion.value).toLowerCase(),Number(porcentaje.value),this.idUniversal);
          this.listaNivel2.push(lista);
        }else{ // edito
          let index = this.getIndexMeritoNivelEspecifico(this.idMeritoEditar,this.listaNivel2);
          this.listaNivel2[index][3] = (<string>descripcion.value);
          this.listaNivel2[index][4] = Number(porcentaje.value);
        }
      }else if(this.nivel===3){
        if(this.nivelMeritoEditar == -1){ //añado
          let cont = this.buscarUltimoIndicePadre()+1;
          let idMerito = this.idPadre+"."+cont;
          lista.push(this.nivel,idMerito,this.idPadre,(<string>descripcion.value).toLowerCase(),Number(porcentaje.value),this.idUniversal);
          this.listaNivel3.push(lista);
        }else{ // edito
          let index = this.getIndexMeritoNivelEspecifico(this.idMeritoEditar,this.listaNivel3);
          this.listaNivel3[index][3] = (<string>descripcion.value);
          this.listaNivel3[index][4] = Number(porcentaje.value);
        }
      }else if(this.nivel===4){
        if(this.nivelMeritoEditar == -1){ //añado
          let cont = this.buscarUltimoIndicePadre()+1;
          let idMerito = this.idPadre+"."+cont;
          lista.push(this.nivel,idMerito,this.idPadre,(<string>descripcion.value).toLowerCase(),Number(porcentaje.value),this.idUniversal);
          this.listaNivel4.push(lista);
        }else{ // edito
          let index = this.getIndexMeritoNivelEspecifico(this.idMeritoEditar,this.listaNivel4);
          this.listaNivel4[index][3] = (<string>descripcion.value);
          this.listaNivel4[index][4] = Number(porcentaje.value);
        }
      };
      this.idUniversal+= 1;
      botonGuardar.setAttribute("data-dismiss","modal");
      $('#addNotaMerito').modal('hide');
      this.llenarListaTodosLosNiveles();
    }
  }
  
  buscarUltimoIndicePadre():number{
    let cont = 0;
    if(this.nivel === 2){
      for (let i = 0; i < this.listaNivel2.length; i++) {
        if(this.listaNivel2[i][2] === this.idPadre){
          cont += 1
        }
      }
    }else if(this.nivel === 3){
      for (let i = 0; i < this.listaNivel3.length; i++) {
        if(this.listaNivel3[i][2] === this.idPadre){
          cont += 1
        }
      }
    }else if(this.nivel === 4){
      for (let i = 0; i < this.listaNivel4.length; i++) {
        if(this.listaNivel4[i][2]===this.idPadre){
          cont += 1
        }
      }
    }
    return cont;
  }

  llenarListaTodosLosNiveles(){
    this.listaTodosLosNiveles.splice(0);

    for (let i = 0; i < this.listaNivel1.length; i++) {
      this.listaTodosLosNiveles.push(this.listaNivel1[i]);
      
      for (let j = 0; j < this.listaNivel2.length; j++) {
        if(this.listaNivel2[j][2] == this.listaNivel1[i][1]){
          this.listaTodosLosNiveles.push(this.listaNivel2[j]);
          
          for (let k = 0; k < this.listaNivel3.length; k++) {
            if(this.listaNivel3[k][2]== this.listaNivel2[j][1]){
              this.listaTodosLosNiveles.push(this.listaNivel3[k]);
              
              for (let l = 0; l < this.listaNivel4.length; l++) {
                if(this.listaNivel4[l][2] == this.listaNivel3[k][1]){
                  this.listaTodosLosNiveles.push(this.listaNivel4[l]);
                }
              }
            }            
          }
        }
      }  
    }
  }

  meritoValido(descripcion:HTMLFormElement,porcentaje:HTMLFormElement):boolean{
    return this.descripcionMeritoValido() && this.porcentajeMeritoValido();
  }

  descripcionMeritoValido():boolean{
    let bandera:boolean;
    let descripcion:HTMLFormElement = <HTMLFormElement>document.getElementById('descripcionMerito');
    if(!this.textoVacio(descripcion.value)){
      descripcion.classList.remove('is-invalid');
      descripcion.classList.add('is-valid');
      bandera = true;
    }else{
      descripcion.classList.remove('is-valid');
      descripcion.classList.add('is-invalid');
      bandera = false;
    }
    return bandera;
  }

  porcentajeMeritoValido():boolean{
    let bandera:boolean;
    let porcentaje:HTMLFormElement= <HTMLFormElement>document.getElementById('porcentajeEvaluacionMerito');
    if(this.esNumeroEnteroPositivo(porcentaje.value)){
      let porcentajeNuevo = Number(porcentaje.value);
      //let sumaHijos:number;

      let porcentajeMeritoEditarLocal:number = 0;
      if(this.nivelMeritoEditar!=-1){
        console.log("--> editar...")
        let indexMeritoEditarLocal:number;
        if(this.nivelMeritoEditar == 1){
          indexMeritoEditarLocal = this.getIndexMeritoNivelEspecifico(this.idMeritoEditar,this.listaNivel1);
          porcentajeMeritoEditarLocal = this.listaNivel1[indexMeritoEditarLocal][4];
        }else if(this.nivelMeritoEditar == 2){
          indexMeritoEditarLocal = this.getIndexMeritoNivelEspecifico(this.idMeritoEditar,this.listaNivel2);
          porcentajeMeritoEditarLocal = this.listaNivel2[indexMeritoEditarLocal][4];
        }else if(this.nivelMeritoEditar == 3){
          indexMeritoEditarLocal = this.getIndexMeritoNivelEspecifico(this.idMeritoEditar,this.listaNivel3);
          porcentajeMeritoEditarLocal = this.listaNivel3[indexMeritoEditarLocal][4];
        }else if(this.nivelMeritoEditar == 4){
          indexMeritoEditarLocal = this.getIndexMeritoNivelEspecifico(this.idMeritoEditar,this.listaNivel4);
          porcentajeMeritoEditarLocal = this.listaNivel4[indexMeritoEditarLocal][4];
        }        
      }



      if(this.nivel == 1){   
        let sumaNivel1 = this.sumaPorcentajesNivel(1,"-1");
        let sumaNivel2Hijos = this.sumaPorcentajesNivel(2,this.idMeritoEditar); 
        if(this.porcentajeTotal >= (sumaNivel1+porcentajeNuevo-porcentajeMeritoEditarLocal)){
          if(porcentajeNuevo >= sumaNivel2Hijos){ // debe ser mayor a la suma de los hijos
            porcentaje.classList.remove('is-invalid');
            porcentaje.classList.add('is-valid');
            bandera = true;
          }else{
            this.mensajePorcentaje = "El porcentaje introucido es menor que el porcentaje de los submeritos " + sumaNivel2Hijos + "%";
            porcentaje.classList.remove('is-valid');
            porcentaje.classList.add('is-invalid');
            bandera = false;
          }
        }else{
          this.mensajePorcentaje = "Con el porcentaje introucido se exede el " + this.porcentajeTotal + "%";
          porcentaje.classList.remove('is-valid');
          porcentaje.classList.add('is-invalid');
          bandera = false;
        }
      } else if(this.nivel == 2){
        let porcentajePadre:number = this.getPorcentajePadre(this.nivel-1,this.idPadre);        
        let sumaNivel2 = this.sumaPorcentajesNivel(2,this.idPadre);
        let sumaNivel3Hijos = this.sumaPorcentajesNivel(3,this.idMeritoEditar);

        if(porcentajePadre >= (sumaNivel2+porcentajeNuevo-porcentajeMeritoEditarLocal)){   
          if(porcentajeNuevo >= sumaNivel3Hijos){ // debe ser mayor a la suma de los hijos       
            porcentaje.classList.remove('is-invalid');
            porcentaje.classList.add('is-valid');
            bandera = true;
          }else{
            this.mensajePorcentaje = "El porcentaje introucido es menor que el porcentaje de los submeritos " + sumaNivel3Hijos + "%";
            porcentaje.classList.remove('is-valid');
            porcentaje.classList.add('is-invalid');
            bandera = false;
          }
        }else{
          this.mensajePorcentaje = "Con el porcentaje introucido se exede el " + porcentajePadre + "%";
          porcentaje.classList.remove('is-valid');
          porcentaje.classList.add('is-invalid');
          bandera = false;
        }
      } else if(this.nivel == 3){
        let porcentajePadre:number = this.getPorcentajePadre(this.nivel-1,this.idPadre);
        let sumaNivel3 = this.sumaPorcentajesNivel(3,this.idPadre);
        let sumaNivel4Hijos = this.sumaPorcentajesNivel(4,this.idMeritoEditar);

        if(porcentajePadre >= (sumaNivel3+porcentajeNuevo-porcentajeMeritoEditarLocal)){
          if(porcentajeNuevo >= sumaNivel4Hijos){ // debe ser mayor a la suma de los hijos 
            porcentaje.classList.remove('is-invalid');
            porcentaje.classList.add('is-valid');
            bandera = true;
          }else{
            this.mensajePorcentaje = "El porcentaje introucido es menor que el porcentaje de los submeritos " + sumaNivel4Hijos + "%";
            porcentaje.classList.remove('is-valid');
            porcentaje.classList.add('is-invalid');
            bandera = false;
          } 
        }else{
          this.mensajePorcentaje = "Con el porcentaje introucido se exede el " + porcentajePadre + "%";
          porcentaje.classList.remove('is-valid');
          porcentaje.classList.add('is-invalid');
          bandera = false;
        }
      } else if(this.nivel == 4){
        let porcentajePadre:number = this.getPorcentajePadre(this.nivel-1,this.idPadre);
        let sumaNivel4 = this.sumaPorcentajesNivel(4,this.idPadre);

        if(porcentajePadre >= (sumaNivel4+porcentajeNuevo-porcentajeMeritoEditarLocal)){
          porcentaje.classList.remove('is-invalid');
          porcentaje.classList.add('is-valid');
          bandera = true;
        }else{
          this.mensajePorcentaje = "Con el porcentaje introucido se exede el " + porcentajePadre + "%";
          porcentaje.classList.remove('is-valid');
          porcentaje.classList.add('is-invalid');
          bandera = false;
        }
      }
    }else{
      this.mensajePorcentaje = "Escriba un porcentaje numerico entero positivo mayor a cero *";
      porcentaje.classList.remove('is-valid');
      porcentaje.classList.add('is-invalid');
      bandera = false;
    }
    return bandera;
  }

  sumaPorcentajesNivel(nivel:number,idpadre:string):number{
    let suma:number = 0;
    if(nivel == 1){
      for (let i = 0; i < this.listaNivel1.length; i++) {
        suma += this.listaNivel1[i][4];      
      }
    }else if(nivel == 2){
      for (let i = 0; i < this.listaNivel2.length; i++) {
        if(this.listaNivel2[i][2] == idpadre){
          suma += this.listaNivel2[i][4];
        }        
      }
    }else if(nivel == 3){
      for (let i = 0; i < this.listaNivel3.length; i++) {
        if(this.listaNivel3[i][2] == idpadre){
          suma += this.listaNivel3[i][4];
        }        
      }
    }else if(nivel == 4){
      for (let i = 0; i < this.listaNivel4.length; i++) {
        if(this.listaNivel4[i][2] == idpadre){
          suma += this.listaNivel4[i][4];
        }        
      }
    }
    return suma;
  }

  getPorcentajePadre(nivel:number,idPadreConsultar:string):number{
    let porcentaje:number = 0;
    if(nivel == 1){
      for (let i = 0; i < this.listaNivel1.length; i++) {
        if(this.listaNivel1[i][1] == idPadreConsultar){
          porcentaje = this.listaNivel1[i][4];
          break;
        }        
      }       
    }else if(nivel == 2){
      for (let i = 0; i < this.listaNivel2.length; i++) {
        if(this.listaNivel2[i][1] == idPadreConsultar){
          porcentaje = this.listaNivel2[i][4];
          break;
        }        
      }              
    }else if(nivel == 3){
      for (let i = 0; i < this.listaNivel3.length; i++) {
        if(this.listaNivel3[i][1] == idPadreConsultar){
          porcentaje = this.listaNivel3[i][4];
          break;
        }        
      }    
    }else if(nivel == 4){
      for (let i = 0; i < this.listaNivel4.length; i++) {
        if(this.listaNivel4[i][1] == idPadreConsultar){
          porcentaje = this.listaNivel4[i][4];
          break;
        }        
      }    
    }
    return porcentaje;
  }

  editarMerito(nivelMerito:number,idMerito:string,idMeritoUniversal:number):void{
    let index:number = this.getIndexMerito(idMeritoUniversal,this.listaTodosLosNiveles);
    let nivel:number = this.listaTodosLosNiveles[index][0];
    let id:string = this.listaTodosLosNiveles[index][1];
    let idPadre:string = this.listaTodosLosNiveles[index][2];
    
    this.nivel = nivel;
    this.idPadre = idPadre;
    

    console.log("nivel: " + nivel + " idPadre:" + this.idPadre);

    this.limpiarCampos();
    let descripcionEditar:HTMLFormElement = <HTMLFormElement>document.getElementById('descripcionMerito');
    let porcentajeEditar:HTMLFormElement = <HTMLFormElement>document.getElementById('porcentajeEvaluacionMerito');
    let descripcion:string;
    let porcentaje:number;

    if(nivel == 1){
      let indexN1:number = this.getIndexMeritoNivelEspecifico(id,this.listaNivel1);
      descripcion = this.listaNivel1[indexN1][3];
      porcentaje = this.listaNivel1[indexN1][4];      
    }else if(nivel == 2){
      let indexN2:number = this.getIndexMeritoNivelEspecifico(id,this.listaNivel2);
      descripcion = this.listaNivel2[indexN2][3];
      porcentaje = this.listaNivel2[indexN2][4];
    }else if(nivel == 3){
      let indexN3:number = this.getIndexMeritoNivelEspecifico(id,this.listaNivel3);
      descripcion = this.listaNivel3[indexN3][3];
      porcentaje = this.listaNivel3[indexN3][4];
    }else if(nivel == 4){
      let indexN4:number = this.getIndexMeritoNivelEspecifico(id,this.listaNivel4);
      descripcion = this.listaNivel4[indexN4][3];
      porcentaje = this.listaNivel4[indexN4][4];
    }

    this.nivelMeritoEditar = nivelMerito;
    this.idMeritoEditar = idMerito;

    descripcionEditar.value = descripcion;
    porcentajeEditar.value = porcentaje;
    descripcionEditar.classList.add('is-valid');
    porcentajeEditar.classList.add('is-valid');
  }

  eliminarMerito(idMerito:number):void{
    let index:number = this.getIndexMerito(idMerito,this.listaTodosLosNiveles);
    let nivel:number = this.listaTodosLosNiveles[index][0];
    let id:string = this.listaTodosLosNiveles[index][1];

    this.eliminarMeritoEspecifico(nivel,id);

  }

  eliminarMeritoEspecifico(nivel:number,id:string){
    if(nivel == 1){
      
      let i:number = 0;
      while(i < this.listaNivel1.length) {
        if(this.listaNivel1[i][1] == id) {
          
          let j:number = 0;
          while(j<this.listaNivel2.length) {
            if(this.listaNivel2[j][2] == this.listaNivel1[i][1]) {
              
              let k:number = 0;
              while(k<this.listaNivel3.length) {
                if(this.listaNivel3[k][2] == this.listaNivel2[j][1]){
                  
                  let l:number = 0;
                  while(l<this.listaNivel4.length) {
                    if(this.listaNivel4[l][2] == this.listaNivel3[k][1]){
                      this.listaNivel4.splice(l,1)
                    }else{
                      l+=1;
                    }      
                  }                  
                  this.listaNivel3.splice(k,1);
                }else{
                  k+=1;
                }   
              }
              this.listaNivel2.splice(j,1);
            }else{
              j+=1;
            }       
          }
          this.listaNivel1.splice(i,1);
        }else{
          i+=1;
        }
      }
    }else if(nivel == 2){
          let j:number = 0;
          while(j<this.listaNivel2.length) {
            if(this.listaNivel2[j][1] == id) {
              
              let k:number = 0;
              while(k<this.listaNivel3.length) {
                if(this.listaNivel3[k][2] == this.listaNivel2[j][1]){
                  
                  let l:number = 0;
                  while(l<this.listaNivel4.length) {
                    if(this.listaNivel4[l][2] == this.listaNivel3[k][1]){
                      this.listaNivel4.splice(l,1)
                    }else{
                      l+=1;
                    }      
                  }                  
                  this.listaNivel3.splice(k,1);
                }else{
                  k+=1;
                }   
              }
              this.listaNivel2.splice(j,1);
            }else{
              j+=1;
            }       
          }
    }else if(nivel == 3){
              let k:number = 0;
              while(k<this.listaNivel3.length) {
                if(this.listaNivel3[k][1] == id){
                  
                  let l:number = 0;
                  while(l<this.listaNivel4.length) {
                    if(this.listaNivel4[l][2] == this.listaNivel3[k][1]){
                      this.listaNivel4.splice(l,1)
                    }else{
                      l+=1;
                    }      
                  }                  
                  this.listaNivel3.splice(k,1);
                }else{
                  k+=1;
                }   
              }
    }else if(nivel == 4){
                  let l:number = 0;
                  while(l<this.listaNivel4.length) {
                    if(this.listaNivel4[l][1] == id){
                      this.listaNivel4.splice(l,1)
                    }else{
                      l+=1;
                    }      
                  }  
    }

    console.log(this.listaNivel1);
    console.log(this.listaNivel2);
    console.log(this.listaNivel3);
    console.log(this.listaNivel4);
    console.log("--------------------------------------");
    
    this.reorganizarIdMeritos();
    this.llenarListaTodosLosNiveles();
  }

  getIndexMerito(idMeritoUniversal:number,lista:any[]):number{
    let index:number = -1;
    for (let i = 0; i < lista.length; i++) {
      if(lista[i][5] == idMeritoUniversal){
        index = i;
        break;
      }      
    }
    return index;
  }

  getIndexMeritoNivelEspecifico(idMerito:string,lista:any[]):number{
    let index:number = 0;
    for (let i = 0; i < lista.length; i++) {
      if(lista[i][1] == idMerito){
        index = i;
        break;
      }
    }
    return index;
  }

  reorganizarIdMeritos(){
    let indexN1:number = 1;    
    for (let i = 0; i < this.listaNivel1.length; i++) {
      let idAuxN1:number = this.listaNivel1[i][1];      
      this.listaNivel1[i][1] = indexN1;
      indexN1 +=1;

      let indexN2:number = 1;
      for (let j = 0; j < this.listaNivel2.length; j++) {
        let idAuxN2:number = this.listaNivel2[j][1];
        if(this.listaNivel2[j][2]==idAuxN1){
          this.listaNivel2[j][2] = this.listaNivel1[i][1]; 
          this.listaNivel2[j][1] = this.listaNivel1[i][1] + "." + indexN2;                 
          indexN2+=1;

          let indexN3:number = 1;
          for (let k = 0; k < this.listaNivel3.length; k++) {
            let idAuxN3:number = this.listaNivel3[k][1];
            if(this.listaNivel3[k][2] == idAuxN2){
              this.listaNivel3[k][2] = this.listaNivel2[j][1];
              this.listaNivel3[k][1] = this.listaNivel2[j][1] + "." + indexN3;
              indexN3+=1;

              let indexN4:number = 1;
              for (let l = 0; l < this.listaNivel4.length; l++) {
                if(this.listaNivel4[l][2] == idAuxN3){
                  this.listaNivel4[l][2] = this.listaNivel3[k][1];
                  this.listaNivel4[l][1] = this.listaNivel3[k][1] + "." + indexN4;
                  indexN4+= 1;
                }
              }
            }          
          }

        }
      }
    }
  }

  limpiarCampos(){
    let descripcion:HTMLFormElement = <HTMLFormElement>document.getElementById('descripcionMerito');
    let porcentaje:HTMLFormElement= <HTMLFormElement>document.getElementById('porcentajeEvaluacionMerito');

    descripcion.classList.remove('is-valid');
    descripcion.classList.remove('is-invalid');
    porcentaje.classList.remove('is-valid');
    porcentaje.classList.remove('is-invalid');

    descripcion.value = "";
    porcentaje.value = "";
  }

  esNumeroEnteroPositivo(num:any):boolean {
    var esNumero = false;
    if(!this.textoVacio(num)){
      var n = Number(num);    
      if(!isNaN(n)){ // es numero
        if(n%1===0){ //valido que se entero
            if(n>0)
              esNumero = true;
        }
      }
    }
    return esNumero;
  }

  textoVacio(valor:any):boolean{
    return valor == null || valor.length == 0 || /^\s+$/.test(valor); 
  }  
}
