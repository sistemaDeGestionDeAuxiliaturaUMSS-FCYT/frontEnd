import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';//formularios , formularios reactivos, validadores de formularios

declare var $: any;

@Component({
  selector: 'app-calificacion-de-meritos',
  templateUrl: './calificacion-de-meritos.component.html',
  styleUrls: ['./calificacion-de-meritos.component.css']
})
export class CalificacionDeMeritosComponent implements OnInit {
  formularioMerito:FormGroup;
  porcentajeTotal:number;
  mensajePorcentaje:string;
  nivel:number;
  idPadre:string; // idPadre
  idUniversal:number;
  
  listaNivel1:any[][] = [];
  listaNivel2:any[][] = [];
  listaNivel3:any[][] = [];
  listaNivel4:any[][] = [];
  listaTodosLosNiveles:any[][] = [];
  
  constructor() { }

  ngOnInit(): void {
    this.formularioMerito = new FormGroup({});
    this.porcentajeTotal = 100;
    this.mensajePorcentaje = "Escriba un porcentaje numerico entero positivo mayor a cero *";
    this.nivel = 1;
    this.idPadre = "1";
    this.idUniversal = 1;
  }

  setPorcenatjeTotal(){
    let porcentajeTotalInput = <HTMLFormElement>document.getElementById('porcentajeTotalMeritos');
    let porcentajeTotalInputValue = Number(porcentajeTotalInput.value);
    if(this.esNumeroEnteroPositivo(porcentajeTotalInputValue)){
      let sumaN1 = this.sumaPorcentajesNivel(1,"-1");
      if(sumaN1 <= porcentajeTotalInputValue){
        this.porcentajeTotal = porcentajeTotalInputValue;   
      }
    }
    porcentajeTotalInput.value = "";
  }

  setNivelyIdMerito(nivel:number, idPadre:string){
    this.nivel = nivel;
    this.idPadre = idPadre;
    
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
        let index = this.listaNivel1.length+1;
        //        nivel, id , idpadre
        lista.push(this.nivel,index+"","-1",descripcion.value,Number(porcentaje.value),this.idUniversal);
        this.listaNivel1.push(lista);
        //this.llenarListaTodosLosNiveles();
      }else if(this.nivel===2){
        let cont = this.buscarUltimoIndicePadre()+1;
        let idMerito = this.idPadre+"."+cont;
        //        nivel, id , idpadre
        lista.push(this.nivel,idMerito,this.idPadre,descripcion.value,Number(porcentaje.value),this.idUniversal);
        this.listaNivel2.push(lista);
      }else if(this.nivel===3){
        let cont = this.buscarUltimoIndicePadre()+1;
        let idMerito = this.idPadre+"."+cont;
        lista.push(this.nivel,idMerito,this.idPadre,descripcion.value,Number(porcentaje.value),this.idUniversal);
        this.listaNivel3.push(lista);
      }else if(this.nivel===4){
        let cont = this.buscarUltimoIndicePadre()+1;
        let idMerito = this.idPadre+"."+cont;
        lista.push(this.nivel,idMerito,this.idPadre,descripcion.value,Number(porcentaje.value),this.idUniversal);
        this.listaNivel4.push(lista);
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
      let sumaHijos:number;

      if(this.nivel == 1){     
        sumaHijos = this.sumaPorcentajesNivel(1,"-1");   
        if(this.porcentajeTotal >= (sumaHijos+porcentajeNuevo)){
          porcentaje.classList.remove('is-invalid');
          porcentaje.classList.add('is-valid');
          bandera = true;
        }else{
          this.mensajePorcentaje = "Con el porcentaje introucido se exede el " + this.porcentajeTotal + "%";
          porcentaje.classList.remove('is-valid');
          porcentaje.classList.add('is-invalid');
          bandera = false;
        }
      } else if(this.nivel == 2){
        let porcentajePadre:number = this.getPorcentajePadre(this.nivel-1,this.idPadre);
        sumaHijos = this.sumaPorcentajesNivel(2,this.idPadre);

        if(porcentajePadre >= (sumaHijos+porcentajeNuevo)){
          porcentaje.classList.remove('is-invalid');
          porcentaje.classList.add('is-valid');
          bandera = true;
        }else{
          this.mensajePorcentaje = "Con el porcentaje introucido se exede el " + porcentajePadre + "%";
          porcentaje.classList.remove('is-valid');
          porcentaje.classList.add('is-invalid');
          bandera = false;
        }
      } else if(this.nivel == 3){
        let porcentajePadre:number = this.getPorcentajePadre(this.nivel-1,this.idPadre);
        sumaHijos = this.sumaPorcentajesNivel(3,this.idPadre);

        if(porcentajePadre >= (sumaHijos+porcentajeNuevo)){
          porcentaje.classList.remove('is-invalid');
          porcentaje.classList.add('is-valid');
          bandera = true;
        }else{
          this.mensajePorcentaje = "Con el porcentaje introucido se exede el " + porcentajePadre + "%";
          porcentaje.classList.remove('is-valid');
          porcentaje.classList.add('is-invalid');
          bandera = false;
        }
      } else if(this.nivel == 4){
        let porcentajePadre:number = this.getPorcentajePadre(this.nivel-1,this.idPadre);
        sumaHijos = this.sumaPorcentajesNivel(4,this.idPadre);

        if(porcentajePadre >= (sumaHijos+porcentajeNuevo)){
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

  editarMerito(idMerito:number):void{
    
  }

  eliminarMerito(idMerito:number):void{
    let index:number = this.getIndexMerito(idMerito,this.listaTodosLosNiveles);
    let nivel:number = this.listaTodosLosNiveles[index][0];
    let id:string = this.listaTodosLosNiveles[index][1];

    this.eliminarMeritoEspecifico(nivel,id);
  }

  eliminarMeritoEspecifico(nivel:number,id:string){
    if(nivel == 1){
      for (let i = 0; i < this.listaNivel1.length; i++) {
        if(this.listaNivel1[i][1] == id) {
          for (let j = 0; j < this.listaNivel2.length; j++) {
            if(this.listaNivel2[j][2]==this.listaNivel1[i][1]) {
              for (let k = 0; k < this.listaNivel3.length; k++) {
                if(this.listaNivel3[k][2] == this.listaNivel2[j][1]){
                  for (let l = 0; l < this.listaNivel4.length; l++) {
                    if(this.listaNivel4[l][2] == this.listaNivel3[k][1]){
                      this.listaNivel4.splice(l,1)
                    }      
                  }
                  
                  this.listaNivel3.splice(k,1);
                }   
              }

              this.listaNivel2.splice(j,1);
            }       
          }
          
          this.listaNivel1.splice(i,1);
        }
      }
    }else if(nivel == 2){

    }else if(nivel == 3){

    }else if(nivel == 4){

    }

    this.llenarListaTodosLosNiveles();
  }

  getIndexMerito(idMeritoUniversal:number,lista:any[]):number{
    let index:number = -1;
    for (let i = 0; i < this.listaTodosLosNiveles.length; i++) {
      if(this.listaTodosLosNiveles[i][5]==idMeritoUniversal){
        index = i;
        break;
      }      
    }
    return index;
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
