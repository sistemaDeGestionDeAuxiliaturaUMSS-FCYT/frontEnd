import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';//formularios , formularios reactivos, validadores de formularios

declare var $: any;

@Component({
  selector: 'app-requisitos',
  templateUrl: './requisitos.component.html',
  styleUrls: ['./requisitos.component.css']
})
export class RequisitosComponent implements OnInit {
  formulario: FormGroup;
  listaRequisitosSeleccionados:string[][] = [];
  banderaAdd:boolean;
  idLista:number;
  idrequisitoEditar:string;

  constructor() { }

  ngOnInit(): void {
    this.formulario = new FormGroup({});
    this.banderaAdd = true;
    this.idLista = 1;
  }

  setAniadirRequisito():void{
    this.limpiarFormulario();
    this.banderaAdd = true;
  }

  setEditarRequisito(idRequisito:string):void{
    this.limpiarFormulario();
    this.idrequisitoEditar = idRequisito;
    let indexRequisito = this.getIndex(this.idrequisitoEditar,this.listaRequisitosSeleccionados); 
    (<HTMLFormElement>document.getElementById("areaDeRequisito")).value = this.listaRequisitosSeleccionados[indexRequisito][1];

    this.banderaAdd = false;
  }

  guardarRequisito():void{
    if(this.banderaAdd){//guardar
      document.getElementById("botonAdd").removeAttribute("data-dismiss");
      if(this.validarAreaRequisito()){
        let requisitoText = (<HTMLInputElement>document.getElementById('areaDeRequisito')).value;
        let listaAux:string[] = [];
        listaAux.push(this.idLista+"");
        listaAux.push(requisitoText);
        this.listaRequisitosSeleccionados.push(listaAux); 
        this.idLista += 1;     
        
        $('#addRequisitosModal').modal('hide');
        document.getElementById("botonAdd").setAttribute("data-dismiss","modal");
      }
    }else{ // editar 
      document.getElementById("botonUpdate").removeAttribute("data-dismiss");
      if(this.validarAreaRequisito()){
        let index = this.getIndex(this.idrequisitoEditar,this.listaRequisitosSeleccionados);
        let requisitoText = (<HTMLInputElement>document.getElementById('areaDeRequisito')).value;
        this.listaRequisitosSeleccionados[index][1] = requisitoText;
        $('#addRequisitosModal').modal('hide');
        document.getElementById("botonUpdate").setAttribute("data-dismiss","modal");
      }    
    }
  }

  validarAreaRequisito():boolean{
    let bandera:boolean;
    let requisito = document.getElementById('areaDeRequisito');
    let requisitoText = (<HTMLInputElement>requisito).value;

    requisito.classList.remove('is-valid');
    requisito.classList.remove('is-invalid');
    
    if(this.esTextoValido(requisitoText)){
      requisito.classList.add('is-valid');
      bandera = true;
    }else{
      requisito.classList.add('is-invalid');
      bandera = false;
    }
    return bandera;
  } 

  esTextoValido(valor:any):boolean{
    return !(valor == null || valor.length == 0 || /^\s+$/.test(valor));
  }

  limpiarFormulario(){
    (<HTMLFormElement>document.getElementById("areaDeRequisito")).value = "";
    var requisito = document.getElementById('areaDeRequisito');

    requisito.classList.remove('is-invalid');
    requisito.classList.remove('is-valid');
  }

  eliminarRequisito(idRequisito:string){
    let index = this.getIndex(idRequisito,this.listaRequisitosSeleccionados);
    this.listaRequisitosSeleccionados.splice(index,1);
  }

  getIndex(idRequisito:string,lista:string[][]):number{
    let index = -1;
    for (let i = 0; i < lista.length; i++) {
      if(lista[i][0]===idRequisito){
        index = i;
        break;
      }      
    }
    return index;
  }
}
