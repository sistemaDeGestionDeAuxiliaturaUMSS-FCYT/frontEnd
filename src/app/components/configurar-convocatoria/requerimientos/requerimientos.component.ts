import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';//formularios , formularios reactivos, validadores de formularios

@Component({
  selector: 'app-requerimientos',
  templateUrl: './requerimientos.component.html',
  styleUrls: ['./requerimientos.component.css']
})
export class RequerimientosComponent implements OnInit {
  formulario: FormGroup;
  listaItemsBD: any[][] = [];
  listaItemsDisponible:any[][] = [];
  listaItemsSeleccionados:any[][] = [];
  banderaAdd:boolean;
  idItemEditar:string;
  
  constructor() { }

  ngOnInit(): void {  
    this.formulario = new FormGroup({
      tipoDeConvocatoria: new FormControl('', [Validators.required]), //[Validators.required, Validators.minLength(2)]
      numeroDeItems: new FormControl('', [Validators.required]),
      horasAcademicas: new FormControl('',[Validators.required])
    });        
    this.listaItemsBD = [["1","7473802","Introduccion a la programacion"],
                         ["2","7897155","Elementos de programacion y estructura de datos"],
                         ["3","2685656","Teoria de grafos"],
                         ["4","7882145","Computacion"]];
    
    this.listaItemsDisponible = this.listaItemsBD.slice();//copy    
    this.banderaAdd = true;
    this.idItemEditar = "-1";
  }

  activarbanderaAddItem(){
    this.banderaAdd = true;
  }

  desactivarbanderaAddItem(){
    this.banderaAdd = false;
  }

  addItem(){
    var botonEnviar = document.getElementById("botonEnviar");
    botonEnviar.removeAttribute("data-dismiss");

    if(this.validarFormulario(true)){
      console.log("puedo añadir a la tabla");

      var idItem = (<HTMLInputElement>document.getElementById('tipoDeConvocatoria')).value;
      var numItems = (<HTMLInputElement>document.getElementById('numeroDeItems')).value;
      var numItemsAdHonorem = (<HTMLInputElement>document.getElementById('numeroDeItemsAdHonorem')).value;
      var hrsAcademicas = (<HTMLInputElement>document.getElementById('horasAcademicas')).value;
      
      let indexItem = this.getIndexDelItem(idItem,this.listaItemsDisponible);
      var lista:any[] = [];
      
      lista.push(this.listaItemsDisponible[indexItem][0]);//idItem
      lista.push(this.listaItemsDisponible[indexItem][2]);//nombre
      lista.push(numItems);
      lista.push(numItemsAdHonorem);
      lista.push(hrsAcademicas);
      
      console.log("indice: " + indexItem);

      this.listaItemsSeleccionados.push(lista);      
      this.listaItemsDisponible.splice(indexItem,1);//delete
      
      botonEnviar.setAttribute("data-dismiss","modal");
    }else{
      console.log("no puedo enviar");
    }
  }

  editarItem():void{
    console.log("editar item: " + this.idItemEditar );
    var botonActualizar = document.getElementById("botonActualizar");    
    botonActualizar.removeAttribute("data-dismiss");

    if(this.validarFormulario(false)){
      let index = this.getIndexDelItem(this.idItemEditar,this.listaItemsSeleccionados);
      let numItems = (<HTMLInputElement>document.getElementById('numeroDeItems')).value;
      let numItemsAdHonorem = (<HTMLInputElement>document.getElementById('numeroDeItemsAdHonorem')).value;
      let hrsAcademicas = (<HTMLInputElement>document.getElementById('horasAcademicas')).value;

      this.listaItemsSeleccionados[index][2] = numItems;
      this.listaItemsSeleccionados[index][3] = numItemsAdHonorem;
      this.listaItemsSeleccionados[index][4] = hrsAcademicas;

      botonActualizar.setAttribute("data-dismiss","modal");
    }
  }

  setIdItemEditar(idItem:string){
    this.idItemEditar = idItem;
    this.limpiarFormulario();
    this.desactivarListaItemsDisponibles()
  } 

  eliminarItem(idItem:string):void{
    let index = this.getIndexDelItem(idItem,this.listaItemsSeleccionados);
    this.listaItemsSeleccionados.splice(index,1);
    
    index = this.getIndexDelItem(idItem,this.listaItemsBD);
    let lista:string[] = [];

    lista.push(this.listaItemsBD[index][0]);
    lista.push(this.listaItemsBD[index][1]);
    lista.push(this.listaItemsBD[index][2]);
    
    this.listaItemsDisponible.push(lista);
  }

  getIndexDelItem(idItem:string,lista:string[][]):number{
    let index = -1;
    for (let i = 0; i < lista.length; i++) {
      if(lista[i][0] === idItem){
        index = i;
        break;
      }
    }
    return index;
  }

  limpiarFormulario():void{
    this.formulario.reset();    
    
    var inputItem = document.getElementById('tipoDeConvocatoria');
    var inputNumItems = document.getElementById('numeroDeItems');
    var inputNumItemsAdHonorem = document.getElementById('numeroDeItemsAdHonorem');
    var inputHrsAcademicas = document.getElementById('horasAcademicas');

    inputItem.classList.remove('is-invalid');
    inputNumItems.classList.remove('is-invalid');
    inputNumItemsAdHonorem.classList.remove('is-invalid');
    inputHrsAcademicas.classList.remove('is-invalid');

    inputItem.classList.remove('is-valid');
    inputNumItems.classList.remove('is-valid');
    inputNumItemsAdHonorem.classList.remove('is-valid');
    inputHrsAcademicas.classList.remove('is-valid');
  }

  validarSeleccionItem():void{
    var inputItem = document.getElementById('tipoDeConvocatoria');
    var item = (<HTMLInputElement>inputItem).value;
    if(item !== ""){
      inputItem.classList.remove('is-invalid');
      inputItem.classList.add('is-valid');
    }else{
      inputItem.classList.remove('is-valid');
      inputItem.classList.add('is-invalid');
    }
  }

  validarNumeroDeItemsTitular():void{    
    var inputNumItems = document.getElementById('numeroDeItems');    
    var numItems = (<HTMLInputElement>inputNumItems).value;

    if(this.esNumeroEntero(numItems)){      
      inputNumItems.classList.remove('is-invalid');
      inputNumItems.classList.add('is-valid');
    }else{
      inputNumItems.classList.remove('is-valid');
      inputNumItems.classList.add('is-invalid');
    }
  }

  validarNumeroDeItemsAdHonorem():void{    
    var inputNumItems = document.getElementById('numeroDeItemsAdHonorem');    
    var numItems = (<HTMLInputElement>inputNumItems).value;

    if(this.esNumeroEntero(numItems)){      
      inputNumItems.classList.remove('is-invalid');
      inputNumItems.classList.add('is-valid');
    }else{
      inputNumItems.classList.remove('is-valid');
      inputNumItems.classList.add('is-invalid');
    }
  }

  validarHorasAcademicas():void{
    var inputHrsAcademicas = document.getElementById('horasAcademicas');
    var hrsAcademicas = (<HTMLInputElement>inputHrsAcademicas).value;
    if(this.esNumeroEnteroOrDecimal(hrsAcademicas)){
      inputHrsAcademicas.classList.remove('is-invalid');
      inputHrsAcademicas.classList.add('is-valid');
    }else{
      inputHrsAcademicas.classList.remove('is-valid');
      inputHrsAcademicas.classList.add('is-invalid');
    }
  }

  validarFormulario(todosLosCampos:boolean):boolean{    
    var valido:boolean = false;

    var inputItem = document.getElementById('tipoDeConvocatoria');
    var inputNumItems = document.getElementById('numeroDeItems');
    var inputNumItemsAdHonorem = document.getElementById('numeroDeItemsAdHonorem');
    var inputHrsAcademicas = document.getElementById('horasAcademicas');
    var item = (<HTMLInputElement>inputItem).value;
    var numItems = (<HTMLInputElement>inputNumItems).value;
    var numItemsAdHonorem = (<HTMLInputElement>inputNumItemsAdHonorem).value;
    var hrsAcademicas = (<HTMLInputElement>inputHrsAcademicas).value;
    
    
    
    if(this.esNumeroEntero(numItems) && this.esNumeroEntero(numItemsAdHonorem) && this.esNumeroEnteroOrDecimal(hrsAcademicas)){      
        //inputItem.classList.remove('is-invalid');
        inputNumItems.classList.remove('is-invalid');
        inputNumItemsAdHonorem.classList.remove('is-invalid');
        inputHrsAcademicas.classList.remove('is-invalid');

        //inputItem.classList.add('is-valid');
        inputNumItems.classList.add('is-valid');
        inputNumItemsAdHonorem.classList.remove('is-valid');
        inputHrsAcademicas.classList.add('is-valid');

        valido = true;
        if(todosLosCampos){
          if(item !== ""){
            inputItem.classList.remove('is-invalid');
            inputItem.classList.add('is-valid');
          }else{
            valido = false;
          }
        }        
    }else{
      if(!this.esNumeroEntero(numItems)){
        inputNumItems.classList.remove('is-valid');
        inputNumItems.classList.add('is-invalid');
      }else{
        inputNumItems.classList.remove('is-invalid');
        inputNumItems.classList.add('is-valid')
      }

      if(!this.esNumeroEntero(numItemsAdHonorem)){
        inputNumItemsAdHonorem.classList.remove('is-valid');
        inputNumItemsAdHonorem.classList.add('is-invalid');
      }else{
        inputNumItemsAdHonorem.classList.remove('is-invalid');
        inputNumItemsAdHonorem.classList.add('is-valid')
      }

      if(!this.esNumeroEnteroOrDecimal(hrsAcademicas)){
        inputHrsAcademicas.classList.remove('is-valid');
        inputHrsAcademicas.classList.add('is-invalid');
      }else{
        inputHrsAcademicas.classList.remove('is-invalid');
        inputHrsAcademicas.classList.add('is-valid');
      }

      if(todosLosCampos){
        if(item===""){
          inputItem.classList.remove('is-valid');
          inputItem.classList.add('is-invalid');
        }else{
          inputItem.classList.remove('is-invalid');
          inputItem.classList.add('is-valid');
        }
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
      if(!isNaN(n)){ //es numero
        esNumero = true;
      }
    }
    return esNumero;
  }

  activarListaItemsDisponibles(){
    const nombreItem = document.getElementById("nombreItem");
    nombreItem.removeAttribute("disabled");
  }

  desactivarListaItemsDisponibles(){
    const nombreItem = document.getElementById("nombreItem");
    nombreItem.setAttribute("disabled","");
  }
}
