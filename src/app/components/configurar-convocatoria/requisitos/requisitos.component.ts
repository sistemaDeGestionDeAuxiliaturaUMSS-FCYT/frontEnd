import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { AnyARecord } from 'dns';
import { FormGroup, FormControl, Validators } from '@angular/forms';//formularios , formularios reactivos, validadores de formularios


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
    this.formulario = new FormGroup({
      areaRequisito: new FormControl('', [Validators.required])
    });
    this.banderaAdd = true;
    this.idLista = 1;
  }


  addRequisito(){
    let botonAdd = document.getElementById("botonAdd");    
    botonAdd.removeAttribute("data-dismiss");

    this.banderaAdd = true;
    let requisito = document.getElementById('areaDeRequisito');
    let requisitoText = (<HTMLInputElement>requisito).value;
    if(this.esTextoValido(requisitoText)){
      requisito.classList.add('is-valid');
      let listaAux:string[] = [];
      listaAux.push(this.idLista+"");
      listaAux.push(requisitoText);
      this.listaRequisitosSeleccionados.push(listaAux); 
      this.idLista += 1;
      
      
      botonAdd.setAttribute("data-dismiss","modal");
    }
  }

  editarRequisito(){
    this.banderaAdd = false;
    let botoUpdate = document.getElementById("botonUpdate");    
    botoUpdate.removeAttribute("data-dismiss");

    if(this.validarAreaRequisito()){
      let index = this.getIndex(this.idrequisitoEditar,this.listaRequisitosSeleccionados);
      let requisitoText = (<HTMLInputElement>document.getElementById('areaDeRequisito')).value;
      this.listaRequisitosSeleccionados[index][1] = requisitoText;

      botoUpdate.setAttribute("data-dismiss","modal");
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
    this.formulario.reset();
    var requisito = document.getElementById('areaDeRequisito');

    requisito.classList.remove('is-invalid');
    requisito.classList.remove('is-valid');
  }

  setIdRequisitoEditar(idRequisito:string){
    this.idrequisitoEditar = idRequisito;
  }

  eliminarRequisito(idRequisito:string){
    let index = this.getIndex(idRequisito,this.listaRequisitosSeleccionados);
    this.listaRequisitosSeleccionados.splice(index,1);
  }

  desactivarbanderaAddRequerimiento(){
    this.banderaAdd = false;
  }

  activarbanderaAddRequerimiento(){
    this.banderaAdd = true;
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
