import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';//formularios , formularios reactivos, validadores de formularios

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
  idItemEditar:number;
  
  idItem:HTMLFormElement; 
  itemsTitular:HTMLFormElement;
  itemsAdHonorem:HTMLFormElement;
  hrsAcademicas:HTMLFormElement;

  opcion:string;

  constructor() { }

  ngOnInit(): void {  
    this.formulario = new FormGroup({});        
    this.listaItemsBD = [[1,"7473802","Introduccion a la programacion"],
                         [2,"7897155","Elementos de programacion y estructura de datos"],
                         [3,"2685656","Teoria de grafos"],
                         [4,"7882145","Computacion"]];
    
    this.listaItemsDisponible = this.listaItemsBD.slice();//copy    
    this.banderaAdd = true;
    this.idItemEditar = -1;


    this.idItem = <HTMLFormElement>document.getElementById('idItem');
    this.itemsTitular = <HTMLFormElement>document.getElementById('numeroDeItemsTitular');
    this.itemsAdHonorem = <HTMLFormElement>document.getElementById('numeroDeItemsAdHonorem');
    this.hrsAcademicas = <HTMLFormElement>document.getElementById('horasAcademicas');
    this.opcion = "Elige un item...";
  }

  setAddItem():void{
    this.banderaAdd = true;
    this.limpiarFormulario();
    document.getElementById("idItem").removeAttribute("disabled");
  }

  setEditarItem(idItem:number):void{
    this.idItem.options.selectedIndex = 0;

    this.banderaAdd = false;
    this.idItemEditar = idItem;
    
    let index = this.getIndexDelItem(this.idItemEditar,this.listaItemsSeleccionados);
    this.opcion = this.listaItemsSeleccionados[index][2];
    document.getElementById("idItem").setAttribute("disabled","");
    this.itemsTitular.value = this.listaItemsSeleccionados[index][3];
    this.itemsAdHonorem.value = this.listaItemsSeleccionados[index][4];
    this.hrsAcademicas.value = this.listaItemsSeleccionados[index][5];

    this.idItem.classList.add('is-valid');
    this.itemsTitular.classList.add('is-valid');
    this.itemsAdHonorem.classList.add('is-valid');
    this.hrsAcademicas.classList.add('is-valid');
  }

  guardarItem(){
    let botonGuardar;
    if(this.banderaAdd){
      botonGuardar = document.getElementById("botonAdd");
    }else{
      botonGuardar = document.getElementById("botonUpdate");
    }
    botonGuardar.removeAttribute("data-dismiss");

    if(this.validarFormulario()){
      if(this.banderaAdd){
        let indexItem = this.getIndexDelItem(this.idItem.value,this.listaItemsDisponible);
        var lista:any[] = [];
        
        lista.push(this.listaItemsDisponible[indexItem][0]);//idItem de la base de datos
        lista.push(this.listaItemsDisponible[indexItem][1]);//idItem del item como materia
        lista.push(this.listaItemsDisponible[indexItem][2]);//nombre
        lista.push(this.itemsTitular.value);
        lista.push(this.itemsAdHonorem.value);
        lista.push(this.hrsAcademicas.value); 

        this.listaItemsSeleccionados.push(lista);
        this.listaItemsDisponible.splice(indexItem,1);
      }else{
        let indexItem = this.getIndexDelItem(this.idItemEditar,this.listaItemsSeleccionados);
        this.listaItemsSeleccionados[indexItem][2] = this.itemsTitular.value;
        this.listaItemsSeleccionados[indexItem][3] = this.itemsAdHonorem.value;
        this.listaItemsSeleccionados[indexItem][4] = this.hrsAcademicas.value;
      }
      botonGuardar.setAttribute("data-dismiss","modal");
    }
  }

  validarFormulario(){
    return this.itemValido() && this.numItemsTitularValido() && this.numItemsAdHonoremValido() && this.hrsAcademicasValido();
  }

  itemValido():boolean{
    let valido:boolean = false;
    if(this.idItem.value != "itemDefault" || !this.banderaAdd){
      this.idItem.classList.remove('is-invalid');
      this.idItem.classList.add('is-valid');
      valido = true;
    }else{
      this.idItem.classList.remove('is-valid');
      this.idItem.classList.add('is-invalid');
    }
    return valido;
  }

  numItemsTitularValido():boolean{
    let valido:boolean = false;
    if(this.esNumeroEntero(this.itemsTitular.value)){      
      this.itemsTitular.classList.remove('is-invalid');
      this.itemsTitular.classList.add('is-valid');
      valido = true;
    }else{
      this.itemsTitular.classList.remove('is-valid');
      this.itemsTitular.classList.add('is-invalid');
    }
    return valido;
  }

  numItemsAdHonoremValido():boolean{
    let valido:boolean = false;
    if(this.esNumeroEntero(this.itemsAdHonorem.value)){      
      this.itemsAdHonorem.classList.remove('is-invalid');
      this.itemsAdHonorem.classList.add('is-valid');
      valido = true;
    }else{
      this.itemsAdHonorem.classList.remove('is-valid');
      this.itemsAdHonorem.classList.add('is-invalid');
    }
    return valido;
  }

  hrsAcademicasValido():boolean{
    let valido:boolean = false;
    if(this.esNumeroEnteroOrDecimal(this.hrsAcademicas.value)){
      this.hrsAcademicas.classList.remove('is-invalid');
      this.hrsAcademicas.classList.add('is-valid');
      valido = true;
    }else{
      this.hrsAcademicas.classList.remove('is-valid');
      this.hrsAcademicas.classList.add('is-invalid');
    }
    return valido;
  }

  getIndexDelItem(idItem:number,lista:any[][]):number{
    let index = -1;
    for (let i = 0; i < lista.length; i++) {
      if(lista[i][0] == idItem){
        index = i;
        break;
      }
    }
    return index;
  }

  limpiarFormulario():void{ 
    this.idItem.classList.remove('is-invalid');
    this.itemsTitular.classList.remove('is-invalid');
    this.itemsAdHonorem.classList.remove('is-invalid');
    this.hrsAcademicas.classList.remove('is-invalid');

    this.idItem.classList.remove('is-valid');
    this.itemsTitular.classList.remove('is-valid');
    this.itemsAdHonorem.classList.remove('is-valid');
    this.hrsAcademicas.classList.remove('is-valid');

    this.opcion = "Elige un item...";
    this.itemsTitular.value = "";
    this.itemsAdHonorem.value = "";
    this.hrsAcademicas.value = "";

    this.idItem.options.selectedIndex = 0;

  }

  eliminarItem(idItem:number):void{
    let index = this.getIndexDelItem(idItem,this.listaItemsSeleccionados);
    this.listaItemsSeleccionados.splice(index,1);
    
    index = this.getIndexDelItem(idItem,this.listaItemsBD);

    let lista:string[] = [];
    lista.push(this.listaItemsBD[index][0]);
    lista.push(this.listaItemsBD[index][1]);
    lista.push(this.listaItemsBD[index][2]);
    
    this.listaItemsDisponible.push(lista);
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
}
