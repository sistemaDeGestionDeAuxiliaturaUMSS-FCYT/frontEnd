import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';//formularioDocumentos , formularioDocumentos reactivos, validadores de formularioDocumentos


@Component({
  selector: 'app-documentos-a-presentar',
  templateUrl: './documentos-a-presentar.component.html',
  styleUrls: ['./documentos-a-presentar.component.css']
})
export class DocumentosAPresentarComponent implements OnInit {
  formularioDocumento: FormGroup;
  listaDocumentosSeleccionados:string[][] = [];
  banderaAddDocumento:boolean;
  idDocumento:number;
  idDocumentoEditar:string;

  constructor() { }

  ngOnInit(): void {
    this.formularioDocumento = new FormGroup({
      areaDocumento: new FormControl('', [Validators.required])
    });
    this.banderaAddDocumento = true;
    this.idDocumento = 1;
  }


  addDocumento(){
    let botonAdd = document.getElementById("botonAddDocumento");    
    botonAdd.removeAttribute("data-dismiss");

    this.banderaAddDocumento = true;
    let documento = document.getElementById('areaDeDocumento');
    let documentoText = (<HTMLInputElement>documento).value;

    console.log("aaaa");
    if(this.validarAreaDocumento()){
      documento.classList.add('is-valid');
      let listaAux:string[] = [];
      listaAux.push(this.idDocumento+"");
      listaAux.push(documentoText);
      this.listaDocumentosSeleccionados.push(listaAux); 
      this.idDocumento += 1;
      
      console.log("bbb");
      
      botonAdd.setAttribute("data-dismiss","modal");
    }
  }

  editarDocumento(){
    this.banderaAddDocumento = false;
    let botoUpdate = document.getElementById("botonUpdateDocumento");    
    botoUpdate.removeAttribute("data-dismiss");

    if(this.validarAreaDocumento()){
      let index = this.getIndex(this.idDocumentoEditar,this.listaDocumentosSeleccionados);
      let documentoText = (<HTMLInputElement>document.getElementById('areaDeDocumento')).value;
      this.listaDocumentosSeleccionados[index][1] = documentoText;

      botoUpdate.setAttribute("data-dismiss","modal");
    }
  }

  validarAreaDocumento():boolean{
    let bandera:boolean;
    let documento = document.getElementById('areaDeDocumento');
    let documentoText = (<HTMLInputElement>documento).value;

    documento.classList.remove('is-valid');
    documento.classList.remove('is-invalid');
    
    if(this.esTextoValido(documentoText)){
      documento.classList.add('is-valid');
      bandera = true;
    }else{
      documento.classList.add('is-invalid');
      bandera = false;
    }
    return bandera;
  } 

  esTextoValido(valor:any):boolean{
    return !(valor == null || valor.length == 0 || /^\s+$/.test(valor));
  }

  limpiarFormularioDocumento(){
    this.formularioDocumento.reset();
    var documento = document.getElementById('areaDeDocumento');

    documento.classList.remove('is-invalid');
    documento.classList.remove('is-valid');
  }

  setIdDocumentoEditar(idDocumento:string){
    this.idDocumentoEditar = idDocumento;
  }

  eliminarDocumento(idDocumento:string){
    let index = this.getIndex(idDocumento,this.listaDocumentosSeleccionados);
    this.listaDocumentosSeleccionados.splice(index,1);
  }

  desactivarBanderaAddDocumento(){
    this.banderaAddDocumento = false;
  }

  activarBanderaAddDocumento(){
    this.banderaAddDocumento = true;
  }

  getIndex(idDocumento:string,lista:string[][]):number{
    let index = -1;
    for (let i = 0; i < lista.length; i++) {
      if(lista[i][0]===idDocumento){
        index = i;
        break;
      }      
    }
    return index;
  }
}
