import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';//formularioDocumentos , formularioDocumentos reactivos, validadores de formularioDocumentos

declare var $: any;

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

  setAniadirDocumento():void{
    this.limpiarFormularioDocumento();
    this.banderaAddDocumento = true;
  }

  setEditarDocumento(idDocumento:string):void{
    this.limpiarFormularioDocumento();
    this.idDocumentoEditar = idDocumento;
    let indexDocumento = this.getIndex(this.idDocumentoEditar,this.listaDocumentosSeleccionados); 
    (<HTMLFormElement>document.getElementById("areaDeDocumento")).value = this.listaDocumentosSeleccionados[indexDocumento][1];

    this.banderaAddDocumento = false;
  }

  guardarDocumento():void{
    if(this.banderaAddDocumento){//guardar
      document.getElementById("botonAddDocumento").removeAttribute("data-dismiss");
      if(this.validarAreaDocumento()){
        let documentoText = (<HTMLInputElement>document.getElementById('areaDeDocumento')).value;
        let listaAux:string[] = [];
        listaAux.push(this.idDocumento+"");
        listaAux.push(documentoText);
        this.listaDocumentosSeleccionados.push(listaAux); 
        this.idDocumento += 1;     
        
        $('#addDocumentosModal').modal('hide');
        document.getElementById("botonAddDocumento").setAttribute("data-dismiss","modal");
      }
    }else{ // editar 
      document.getElementById("botonUpdateDocumento").removeAttribute("data-dismiss");
      if(this.validarAreaDocumento()){
        let index = this.getIndex(this.idDocumentoEditar,this.listaDocumentosSeleccionados);
        let documentoText = (<HTMLInputElement>document.getElementById('areaDeDocumento')).value;
        this.listaDocumentosSeleccionados[index][1] = documentoText;
        $('#addDocumentosModal').modal('hide');
        document.getElementById("botonUpdateDocumento").setAttribute("data-dismiss","modal");
      }    
    }
  }

  limpiarFormularioDocumento(){
    (<HTMLFormElement>document.getElementById("areaDeDocumento")).value = "";
    var documento = document.getElementById('areaDeDocumento');

    documento.classList.remove('is-invalid');
    documento.classList.remove('is-valid');
  }

  eliminarDocumento(idDocumento:string){
    let index = this.getIndex(idDocumento,this.listaDocumentosSeleccionados);
    this.listaDocumentosSeleccionados.splice(index,1);
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
