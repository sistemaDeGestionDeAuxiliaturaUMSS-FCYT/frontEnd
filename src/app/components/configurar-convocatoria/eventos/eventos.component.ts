import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';//formularios , formularios reactivos, validadores de formularios

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {
  listaEventos:any[] = [];
  formularioEvento: FormGroup;
  banderaAdd:boolean;
  fechaActual:string;

  nombreEvento:HTMLFormElement;
  fechaInicio:HTMLFormElement;
  fechaFin:HTMLFormElement;
  horaInicio:HTMLFormElement;
  horaFin:HTMLFormElement;

  mensajeFechaInicio:string;
  mensajeFechaFin:string;
  mensajeHoraInicio:string;
  mensajeHoraFin:string;

  constructor() { }

  ngOnInit(): void {
    this.formularioEvento = new FormGroup({});
    this.banderaAdd = true;
    this.fechaActual =this.getFechaActual(new Date());

    this.nombreEvento = <HTMLFormElement>document.getElementById("idNombreEvento");
    this.fechaInicio = <HTMLFormElement>document.getElementById("idFechaInicio");
    this.fechaFin = <HTMLFormElement>document.getElementById("idFechaFin");
    this.horaInicio = <HTMLFormElement>document.getElementById("idHoraInicio");
    this.horaFin = <HTMLFormElement>document.getElementById("idHoraFin");

    this.fechaInicio.setAttribute("min",this.fechaActual+"");
    this.fechaFin.setAttribute("min",this.fechaActual+"");
    this.fechaFin.setAttribute("disabled","");
    this.horaFin.setAttribute("disabled","");
    this.horaInicio.setAttribute("disabled","");

    this.mensajeFechaInicio = "Elija una fecha *";
    this.mensajeFechaFin = "Elija una fecha *";
    this.mensajeHoraInicio = "Seleccione un hora *";
    this.mensajeHoraFin = "Seleccione un hora *";
  }

  nombreEventoValido():boolean{
    let valido:boolean = false;
    if(!this.textoVacio(this.nombreEvento.value)){
      this.nombreEvento.classList.remove("is-invalid");
      this.nombreEvento.classList.add("is-valid");
    }else{
      this.nombreEvento.classList.remove("is-valid");
      this.nombreEvento.classList.add("is-invalid");
    }

    return valido;
  }

  fechaInicioValido(verificar:boolean):boolean{
    let bandera:boolean = false;
    if(this.fechaInicio.value != ""){
      //console.log("si");
      if(this.fechaFin.value != ""){
        if(this.fechaInicio.value <= this.fechaFin.value){
          //console.log("si si");
          bandera = true;
          this.marcarElementoComoValido(this.fechaInicio);
          this.horaInicio.removeAttribute("disabled");
          if(verificar){
            this.fechaFinValido(!verificar);
          }

          if(this.fechaInicio.value == this.fechaFin.value){
            this.horaFinValido();
          }
        }else{
          //console.log("si no");
          this.marcarFechaComoInvalido(this.fechaInicio,1,"Fecha inicio mayor a fecha fin *");  
          //console.log("--> " + this.mensajeFechaInicio);
        }
      }else{
        bandera = true;        
        this.marcarElementoComoValido(this.fechaInicio);
        this.horaInicio.removeAttribute("disabled");
      }
    }else{
      //console.log("no");
      this.marcarFechaComoInvalido(this.fechaInicio,1,"Elija una fecha *");
    }
    return bandera;
  }

  fechaFinValido(verificar:boolean):boolean{
    let bandera:boolean = false;
    if(this.fechaFin.value != ""){
      if(this.fechaInicio.value != ""){
        if(this.fechaInicio.value <= this.fechaFin.value ){
          bandera = true;
          this.marcarElementoComoValido(this.fechaFin);
          this.horaFin.removeAttribute("disabled");
          if(verificar){
            this.fechaInicioValido(!verificar);
          }

          if(this.fechaInicio.value == this.fechaFin.value){
            this.horaFinValido();
          }
        }else{
          this.marcarFechaComoInvalido(this.fechaFin,2,"Fecha inicio mayor a fecha fin *");
        }
      }else{
        bandera = true;
        this.marcarElementoComoValido(this.fechaFin);
        this.horaFin.removeAttribute("disabled");
      }      
    }else{
      this.marcarFechaComoInvalido(this.fechaFin,2,"Elija una fecha *");
    }
    return bandera;
  }

  horaInicioValido():boolean{
    console.log("hora inicio");
    console.log(this.horaInicio.value);
    let bandera:boolean = false;

    
    if(this.horaValida(this.horaInicio.value)){
      console.log("si");
      if(this.fechaInicio.value == this.fechaFin.value){
        console.log("*");
        if(this.horaInicio.value < this.horaFin.value){
          bandera = true;
          this.marcarElementoComoValido(this.horaInicio);
          this.fechaFin.removeAttribute("disabled");
        }else{
          this.marcarHoraComoInvalido(this.horaInicio,1,"Hora inicio = Hora fin *"); 
        }          
      }else{
        bandera = true;
        this.marcarElementoComoValido(this.horaInicio);
        this.fechaFin.removeAttribute("disabled");
        console.log("**");
      }
    }else{
      this.marcarHoraComoInvalido(this.horaInicio,1,"Hora fuera de rango");
    }
    return bandera;
  }

  horaFinValido():boolean{
    console.log("hora fin");
    let bandera:boolean = false;
    if(this.horaValida(this.horaFin.value)){
      if(this.fechaInicio.value == this.fechaFin.value){
        console.log("-")
        if(this.horaInicio.value < this.horaFin.value){
          console.log("-*");
          bandera = true;
          this.marcarElementoComoValido(this.horaFin);
        }else{
          console.log("-**");
          this.marcarHoraComoInvalido(this.horaFin,2,"Hora inicio = Hora fin *");
        }
      }else{
        this.marcarElementoComoValido(this.horaFin);
      }   
    }else{
      this.marcarHoraComoInvalido(this.horaFin,2,"Hora fuera de rango *");
    }
    return bandera;
  }

  horaValida(hora:string){
    return hora >= "08:00" && hora <= "18:00";
  }

  textoVacio(valor:any):boolean{
    return valor == null || valor.length == 0 || /^\s+$/.test(valor); 
  }
  
  /**
   * Marca como valido un elemento
   * Funciona para cualquier elemnto: fecha y hora en este caso  
   */
  marcarElementoComoValido(element:HTMLFormElement){
    element.classList.remove("is-invalid");
    element.classList.add("is-valid");
  }

  /**
   * Marca como invalido la fecha 
   */
  marcarFechaComoInvalido(element:HTMLFormElement,elementoMesaje:number,mensaje:string):void{
    if(elementoMesaje==1){
      this.mensajeFechaInicio = mensaje;
    }else{
      this.mensajeFechaFin = mensaje;
    }

    element.classList.remove("is-valid");
    element.classList.add("is-invalid");
  }  

  /**
   * marca como invalido la hora
   */
  marcarHoraComoInvalido(element:HTMLFormElement,elementoMesaje:number,mensaje:string):void{
    if(elementoMesaje==1){
      this.mensajeHoraInicio = mensaje;
    }else{
      this.mensajeHoraFin = mensaje;
    }

    element.classList.remove("is-valid");
    element.classList.add("is-invalid");
  }  

  guardarEvento():void{

  }

  getFechaActual(date:Date):string{
    let yyyy:any = date.getFullYear();
    let mm:any = date.getMonth()+1;
    let dd:any = date.getDate();

    if(mm<10){
      mm = "0"+mm;
    }

    if(dd<10){
      dd = "0"+dd;
    }

    return yyyy + "-" + mm + "-" + dd;
  }
}
