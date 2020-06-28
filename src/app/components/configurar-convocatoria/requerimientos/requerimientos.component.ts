import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';//formularios , formularios reactivos, validadores de formularios

@Component({
  selector: 'app-requerimientos',
  templateUrl: './requerimientos.component.html',
  styleUrls: ['./requerimientos.component.css']
})
export class RequerimientosComponent implements OnInit {
  formulario: FormGroup;

  constructor() { }

  ngOnInit(): void {  
    this.formulario = new FormGroup({
      tipoDeConvocatoria: new FormControl('', [Validators.required]), //[Validators.required, Validators.minLength(2)]
      numeroDeItems: new FormControl('', [Validators.required]),
      horasAcademicas: new FormControl('',[Validators.required])
    });
  }

  enviarFormulario(){
    var botonEnviar = document.getElementById("botonEnviar");
    botonEnviar.removeAttribute("data-dismiss");

    if(this.validarFormulario()){
      console.log("puedo enviar");
      this.limpiarFormulario();
            
      botonEnviar.setAttribute("data-dismiss","modal");
    }else{
      console.log("no puedo enviar");
    }
  }

  limpiarFormulario():void{
    this.formulario.reset();
    var inputItem = document.getElementById('tipoDeConvocatoria');
    var inputNumItems = document.getElementById('numeroDeItems');
    var inputHrsAcademicas = document.getElementById('horasAcademicas');

    inputItem.classList.remove('is-invalid');
    inputNumItems.classList.remove('is-invalid');
    inputHrsAcademicas.classList.remove('is-invalid');

    inputItem.classList.remove('is-valid');
    inputNumItems.classList.remove('is-valid');
    inputHrsAcademicas.classList.remove('is-valid');
  }

  validarFormulario():boolean{    
    var valido:boolean = false;

    var form = document.getElementById("formulario");
    var inputItem = document.getElementById('tipoDeConvocatoria');
    var inputNumItems = document.getElementById('numeroDeItems');
    var inputHrsAcademicas = document.getElementById('horasAcademicas');
    var item = (<HTMLInputElement>inputItem).value;
    var numItems = (<HTMLInputElement>inputNumItems).value;
    var hrsAcademicas = (<HTMLInputElement>inputHrsAcademicas).value;
    
    
    
    if(this.esNumeroEntero(numItems) && this.esNumeroEnteroOrDecimal(hrsAcademicas) && item !== "" ){   
      inputItem.classList.remove('is-invalid');
      inputNumItems.classList.remove('is-invalid');
      inputHrsAcademicas.classList.remove('is-invalid');

      inputItem.classList.add('is-valid');
      inputNumItems.classList.add('is-valid');
      inputHrsAcademicas.classList.add('is-valid');

      valido = true;
    }else{
      if(!this.esNumeroEntero(numItems)){
        inputNumItems.classList.remove('is-valid');
        inputNumItems.classList.add('is-invalid');
      }else{
        inputNumItems.classList.remove('is-invalid');
        inputNumItems.classList.add('is-valid')
      }

      if(!this.esNumeroEnteroOrDecimal(hrsAcademicas)){
        inputHrsAcademicas.classList.remove('is-valid');
        inputHrsAcademicas.classList.add('is-invalid');
      }else{
        inputHrsAcademicas.classList.remove('is-invalid');
        inputHrsAcademicas.classList.add('is-valid');
      }

      if(item===""){
        inputItem.classList.remove('is-valid');
        inputItem.classList.add('is-invalid');
      }else{
        inputItem.classList.remove('is-invalid');
        inputItem.classList.add('is-valid');
      }
    }  
    return valido;
  }

  textoVacio(valor:any):boolean{
    return valor == null || valor.length == 0 || /^\s+$/.test(valor); 
  }   

  esNumeroEntero(num:any):boolean {
    var esNumero = false;
    if(!this.textoVacio(num)){
      var n = Number(num);    
      if(!isNaN(n)){ // es numero
        if(n%1===0){ //valido que se entero
          esNumero = true;
        }
      }
    }
    return esNumero;
  }
  
  esNumeroEnteroOrDecimal(num:string):boolean{
    var esNumero = false;
    if(!this.textoVacio(num)){
      var n = Number(num);    
      if(!isNaN(n)){ // es numero
        esNumero = true;
      }
    }
    return esNumero;
  }
}
